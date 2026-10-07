---
name: sales-methodology-design
description: Select the minimum Sales capabilities and proportional WOIA OPEA-H profile from lead/customer objective, current state, communication effects, pipeline effects, uncertainty and handoff needs.
license: MIT
---

# WOIA Sales Methodology Design

1. Determine the requested business outcome and whether a persistent Task is needed.
2. Select the minimum OPEA-H profile justified by ambiguity, outbound communication, source-of-truth mutation and audit needs.
3. Select only required Sales capabilities from registry/capabilities.json.
4. Resolve current scoped identity and typed domain refs; never create a Sales-only identity or domain master. Customer Data is an optional CRM adapter.
5. Resolve cross-department origin/correlation when the Task arrived through WOIA Project Bridge.
6. Record effect classes, authority and Human Review boundaries before execution.

Typical routing:
- qualification only -> task-execution or planned-execution;
- qualification plus follow-up -> planned-execution / audited-execution;
- cross-department lead handoff with communication + pipeline mutation -> opea-h-full when risk/complexity justify it.

## Real Estate assembly compatibility (W3)

Use [the routing contract](../../contracts/real-estate-routing.json) and the deterministic guard in `skills/sales-orchestration/scripts/route-sales.mjs`. The host resolves the active assembly and current organization/Project authorization from trusted configuration, separately from requests. Caller flags and sender approval cannot grant authority. Unavailable or stale bindings block execution. Core 0.5.3 owns Tasks, Due Work, Effects, receipts, idempotency and reconciliation.

In Real Estate, Sales Follow-up only plans/drafts; request Customer Service-owned communication/scheduling work and wait for its sourced receipt. Person dispatch never occurs in Sales. Pipeline is typed Opportunity projection; won/stage/score does not prove accepted Offer, Reservation, Lease, Sale close, Payment or possession. Negotiation remains human-led. Financial effects require the Finance owner. UNKNOWN remains UNKNOWN and requires reconciliation before retry. Generic v1 capability contracts remain available outside this assembly. The method guard plans contributions; physical host/store/adapter qualification remains a later gate.
