---
name: sales-status
description: Summarize WOIA Sales Task, OPEA-H phase, customer ref, selected Sales capabilities, communication/pipeline effects, evidence, blockers and pending decisions without rerunning setup.
license: MIT
---

# WOIA Sales Status

Report objective, current phase, selected capabilities, shared resource refs, established evidence/effects, blockers, pending Human Review and next action. Do not rerun provider setup solely for status.

## Real Estate assembly compatibility

Use [the routing contract](../../contracts/real-estate-routing.json) and the deterministic guard in `skills/sales-orchestration/scripts/route-sales.mjs`. The host resolves the active assembly and current organization/Project authorization from trusted configuration, separately from requests. Caller flags and sender approval cannot grant authority. Unavailable or stale bindings block execution. Core 0.5.7 owns Tasks, Due Work, Effects, receipts, idempotency and reconciliation.

In Real Estate, Sales Follow-up only plans/drafts; request Customer Service-owned communication/scheduling work and wait for its sourced receipt. Person dispatch never occurs in Sales. Pipeline is typed Opportunity projection; won/stage/score does not prove accepted Offer, Reservation, Lease, Sale close, Payment or possession. Negotiation remains human-led. Financial effects require the Finance owner. UNKNOWN remains UNKNOWN and requires reconciliation before retry. Generic v1 capability contracts remain available outside this assembly. The method guard plans contributions; physical host/store/adapter qualification remains a later gate.
