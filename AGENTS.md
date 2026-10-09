# AGENTS.md — WOIA Sales

- Use woia-core for Task/OPEA-H/runtime/receipts/effects/overlays.
- Keep stable identity and domain truth in their source-authorized providers; Customer Data is an optional CRM adapter.
- Outbound contact is a communication effect; pipeline mutation is an external-write effect.
- Sender departments never grant Sales authority or edit Sales Task state.
- Audit evidence independently from executor prose.
- Consumers install/update only; canonical source/release changes are maintainer-controlled.

## Real Estate assembly compatibility

Use [the routing contract](contracts/real-estate-routing.json) and the deterministic guard in `skills/sales-orchestration/scripts/route-sales.mjs`. The host resolves the active assembly and current organization/Project authorization from trusted configuration, separately from requests. Caller flags and sender approval cannot grant authority. Unavailable or stale bindings block execution. Core 0.5.6 owns Tasks, Due Work, Effects, receipts, idempotency and reconciliation.

In Real Estate, Sales Follow-up only plans/drafts; request Customer Service-owned communication/scheduling work and wait for its sourced receipt. Person dispatch never occurs in Sales. Pipeline is typed Opportunity projection; won/stage/score does not prove accepted Offer, Reservation, Lease, Sale close, Payment or possession. Negotiation remains human-led. Financial effects require the Finance owner. UNKNOWN remains UNKNOWN and requires reconciliation before retry. Generic v1 capability contracts remain available outside this assembly. The method guard plans contributions; physical host/store/adapter qualification remains a later gate.
