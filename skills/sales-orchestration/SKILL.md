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

## Real Estate assembly compatibility

Use [the routing contract](../../contracts/real-estate-routing.json) and the deterministic guard in `skills/sales-orchestration/scripts/route-sales.mjs`. The host resolves the active assembly and current organization/Project authorization from trusted configuration, separately from requests. Caller flags and sender approval cannot grant authority. Unavailable or stale bindings block execution. Core 0.5.6 owns Tasks, Due Work, Effects, receipts, idempotency and reconciliation.

In Real Estate, Sales Follow-up only plans/drafts; request Customer Service-owned communication/scheduling work and wait for its sourced receipt. Person dispatch never occurs in Sales. Pipeline is typed Opportunity projection; won/stage/score does not prove accepted Offer, Reservation, Lease, Sale close, Payment or possession. Negotiation remains human-led. Financial effects require the Finance owner. UNKNOWN remains UNKNOWN and requires reconciliation before retry. Generic v1 capability contracts remain available outside this assembly. The method guard plans contributions; physical host/store/adapter qualification remains a later gate.
