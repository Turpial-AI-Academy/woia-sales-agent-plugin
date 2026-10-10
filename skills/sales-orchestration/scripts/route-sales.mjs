/** Pure method guard. The qualified host supplies authenticated current context
 * separately from the work request. No adapter or durable store executes here. */
const text = value => typeof value === 'string' && value.trim().length > 0;
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
export const EXPORTED_SLOTS = Object.freeze([
  'subject-resolution', 'qualification-policy', 'follow-up-policy',
  'pipeline-transition-policy', 'business-outcome-evidence',
]);
const routes = Object.freeze({
  qualification: { provider: 'woia-sales-lead-qualification', contract: 'lead-qualification/v1', actions: ['qualification.evaluate'] },
  'follow-up': { provider: 'woia-sales-follow-up', contract: 'follow-up/v1', actions: ['follow-up.plan', 'follow-up.draft', 'follow-up.send'] },
  'pipeline-change': { provider: 'woia-sales-pipeline', contract: 'pipeline/v1', actions: ['pipeline.propose'] },
});

export function routeSales(request, host) {
  requireThat(host?.authenticated === true && host.department === 'sales' && host.current === true && host.authorized === true, 'AUTHORITY_UNRESOLVED');
  requireThat(text(host.org_id) && text(host.project_id), 'SCOPE_UNRESOLVED');
  requireThat(request?.org_id === host.org_id && request.project_id === host.project_id, 'SCOPE_MISMATCH');
  requireThat(Object.hasOwn(routes, request.route), 'UNKNOWN_ROUTE');
  const version = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(host.core_version ?? '');
  requireThat(version && (Number(version[1]) > 0 || Number(version[2]) > 5 || (Number(version[2]) === 5 && Number(version[3]) >= 8)), 'CORE_0_5_8_REQUIRED');
  const route = routes[request.route];
  requireThat(host.provider_ready?.[route.provider] === true, 'PROVIDER_UNQUALIFIED');
  requireThat(host.source_map_current === true && text(host.source_map_ref), 'SOURCE_AUTHORITY_UNRESOLVED');
  requireThat(text(host.policy_ref) && Array.isArray(host.permitted_actions) && host.permitted_actions.length > 0, 'METHOD_POLICY_UNRESOLVED');
  requireThat(route.actions.includes(request.action) && host.permitted_actions.includes(request.action), 'ACTION_NOT_PERMITTED');
  requireThat(request.effect_state !== 'UNKNOWN' && host.effect_state !== 'UNKNOWN', 'RECONCILE_BEFORE_RETRY');
  if (request.route === 'pipeline-change') {
    requireThat(request.subject_kind === 'Opportunity' && text(request.subject_ref), 'TYPED_OPPORTUNITY_REQUIRED');
    requireThat(host.accepted_transition === true, 'COMPETENT_ACCEPTANCE_REQUIRED');
    requireThat(request.domain_fact_acceptance !== true, 'PIPELINE_IS_NOT_DOMAIN_ACCEPTANCE');
  } else requireThat(text(request.subject_ref), 'SUBJECT_REQUIRED');
  return {
    provider: route.provider, action: request.action, contract: route.contract,
    source_map_ref: host.source_map_ref, policy_ref: host.policy_ref,
    ...(text(host.handoff_to) ? { handoff_to: host.handoff_to } : {}),
    effect_execution: false, competent_acceptance_granted: false,
  };
}
