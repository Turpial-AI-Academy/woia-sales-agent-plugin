---
name: sales-orchestration
description: Orchestrate WOIA Sales Tasks through OPEA-H, shared customer data, exact Sales providers, communication/pipeline effects, receipts and correlated cross-department responses.
license: MIT
---

# WOIA Sales Orchestration

Use WOIA Core for Task/runtime mechanics and this skill for Sales routing.

1. Read current Task/TaskCell and any cross-department request correlation.
2. Resolve scoped stable identity, typed Opportunity and current domain refs using the Source Authority Map; select Customer Data only for applicable CRM fields.
3. For the active OPEA-H role, select required Sales provider responsibilities.
4. Delegate through woia-core to exact runtime-ready providers; no root fallback.
5. Record communication/pipeline effects explicitly and reconcile unknown outcomes before retry.
6. Audit actual customer/system/channel evidence, not child summaries.
7. If origin is cross-department, return a typed correlated response through woia-chatgpt-project-bridge after the Sales-owned Task reaches an appropriate status.

Never let a sender department edit this Sales Task directly, and never inherit sender authority.

## Current method and authority

Read [the methodology contract](../../contracts/methodology-extension.json) before routing or applying a specialization. Use `routeSales(request, host)` from `scripts/route-sales.mjs` with host-resolved current scope, source map, policy and exact provider readiness. The host intersects allowed method actions with organization grants; request flags cannot select policy, modules or bindings.

For a specialized root, Core supplies the exact qualified base/delta/provider snapshot and its admitted descriptors. Preserve the five exported slots and inherited gates. The guard returns a contribution proposal; it performs no write or communication. A pipeline stage or score never accepts separately owned business facts. Preserve unknown effects and obtain their owner reconciliation before retry.
