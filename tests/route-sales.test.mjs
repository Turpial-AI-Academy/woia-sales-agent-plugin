import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routeSales, EXPORTED_SLOTS } from '../skills/sales-orchestration/scripts/route-sales.mjs';

const host = () => ({ authenticated: true, authorized: true, current: true, department: 'sales', org_id: 'org:test', project_id: 'project:test', core_version: '0.5.8', source_map_current: true, source_map_ref: 'source-map:1', policy_ref: 'policy:1', permitted_actions: ['qualification.evaluate', 'follow-up.plan', 'follow-up.draft', 'follow-up.send', 'pipeline.propose'], provider_ready: { 'woia-sales-lead-qualification': true, 'woia-sales-follow-up': true, 'woia-sales-pipeline': true }, accepted_transition: true, effect_state: 'NONE' });
const request = (route = 'follow-up', action = 'follow-up.plan') => ({ org_id: 'org:test', project_id: 'project:test', route, action, subject_kind: 'Subject', subject_ref: 'subject:1', effect_state: 'NONE' });

test('exports exactly the declared generic methodology slots', async () => {
  const contract = JSON.parse(await readFile(new URL('../contracts/methodology-extension.json', import.meta.url), 'utf8'));
  const manifest = JSON.parse(await readFile(new URL('../dev.woia/manifest.json', import.meta.url), 'utf8'));
  assert.deepEqual(contract.exported_slots, EXPORTED_SLOTS);
  assert.deepEqual(manifest.exported_slots, EXPORTED_SLOTS);
});
test('routes all scoped generic capabilities without executing effects', () => {
  for (const [route, action, provider, contract] of [['qualification', 'qualification.evaluate', 'woia-sales-lead-qualification', 'lead-qualification/v1'], ['follow-up', 'follow-up.send', 'woia-sales-follow-up', 'follow-up/v1'], ['pipeline-change', 'pipeline.propose', 'woia-sales-pipeline', 'pipeline/v1']]) {
    const result = routeSales({ ...request(route, action), subject_kind: route === 'pipeline-change' ? 'Opportunity' : 'Subject' }, host());
    assert.equal(result.provider, provider); assert.equal(result.contract, contract); assert.equal(result.effect_execution, false); assert.equal(result.competent_acceptance_granted, false);
  }
});
test('host policy narrows generic follow-up and request flags cannot widen it', () => {
  assert.throws(() => routeSales({ ...request('follow-up', 'follow-up.send'), permitted_actions: ['follow-up.send'], module_path: 'untrusted.mjs' }, { ...host(), permitted_actions: ['follow-up.plan'] }), /ACTION_NOT_PERMITTED/);
});
test('missing authentication, source, readiness, Core or mismatched scope blocks', () => {
  for (const patch of [{ authenticated: false }, { current: false }, { authorized: false }, { source_map_current: false }, { source_map_ref: '' }, { core_version: '0.5.7' }, { provider_ready: {} }, { org_id: 'org:other' }, { permitted_actions: [] }]) assert.throws(() => routeSales(request(), { ...host(), ...patch }));
});
test('unknown effects and independently owned fact acceptance require their owner', () => {
  assert.throws(() => routeSales({ ...request(), effect_state: 'UNKNOWN' }, host()), /RECONCILE/);
  assert.throws(() => routeSales(request(), { ...host(), effect_state: 'UNKNOWN' }), /RECONCILE/);
  assert.throws(() => routeSales({ ...request('pipeline-change', 'pipeline.propose'), subject_kind: 'Opportunity', domain_fact_acceptance: true }, host()), /DOMAIN_ACCEPTANCE/);
  assert.throws(() => routeSales({ ...request('pipeline-change', 'pipeline.propose'), subject_kind: 'Opportunity' }, { ...host(), accepted_transition: false }), /COMPETENT_ACCEPTANCE/);
});
