/** Pure method guard. `host` is separately supplied by the qualified Core host,
 * never deserialized from an inbound work request. No adapter executes here. */
export function routeSales(request, host) {
  const assert = (value, reason) => { if (!value) throw new Error(reason); };
  assert(host && ['generic', 'real-estate'].includes(host.assembly), 'ASSEMBLY_UNRESOLVED');
  assert(host.department === 'sales' && host.current === true && host.authorized === true, 'AUTHORITY_UNRESOLVED');
  assert(typeof host.org_id === 'string' && host.org_id && typeof host.project_id === 'string' && host.project_id, 'SCOPE_UNRESOLVED');
  assert(request?.org_id === host.org_id && request.project_id === host.project_id, 'SCOPE_MISMATCH');
  const routes = { qualification: 'woia-sales-lead-qualification', 'follow-up': 'woia-sales-follow-up', 'pipeline-change': 'woia-sales-pipeline' };
  assert(Object.hasOwn(routes, request.route), 'UNKNOWN_ROUTE');
  const version = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(host.core_version ?? '');
  assert(version && (Number(version[1]) > 0 || Number(version[2]) > 5 || (Number(version[2]) === 5 && Number(version[3]) >= 3)), 'CORE_0_5_3_REQUIRED');
  assert(host.provider_ready?.[routes[request.route]] === true, 'PROVIDER_UNQUALIFIED');
  if (host.assembly === 'generic') return { provider: routes[request.route], contract: 'existing-v1', effect_execution: false };
  assert(host.source_map_current === true && typeof host.source_map_ref === 'string' && host.source_map_ref, 'SOURCE_AUTHORITY_UNRESOLVED');
  assert(request.effect_state !== 'UNKNOWN', 'RECONCILE_BEFORE_RETRY');
  assert(!['send', 'schedule', 'negotiate', 'payment.execute'].includes(request.action), 'OWNER_CONTRIBUTION_REQUIRED');
  if (request.route === 'follow-up') {
    assert(['plan', 'draft'].includes(request.action), 'RE_FOLLOW_UP_PLAN_DRAFT_ONLY');
    return { provider: routes[request.route], action: request.action, communication_owner: 'customer-service', effect_execution: false };
  }
  if (request.route === 'pipeline-change') {
    assert(request.subject_kind === 'Opportunity' && typeof request.subject_ref === 'string' && request.subject_ref, 'TYPED_OPPORTUNITY_REQUIRED');
    assert(host.accepted_transition === true, 'COMPETENT_ACCEPTANCE_REQUIRED');
    assert(request.domain_fact_acceptance !== true, 'PIPELINE_IS_NOT_DOMAIN_ACCEPTANCE');
  }
  return { provider: routes[request.route], source_map_ref: host.source_map_ref, effect_execution: false, competent_acceptance_granted: false };
}
