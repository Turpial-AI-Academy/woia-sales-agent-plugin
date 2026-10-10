# AGENTS.md — WOIA Sales

- Use woia-core for Task/OPEA-H/runtime/receipts/effects/overlays.
- Keep stable identity and domain truth in their source-authorized providers; Customer Data is an optional CRM adapter.
- Outbound contact is a communication effect; pipeline mutation is an external-write effect.
- Sender departments never grant Sales authority or edit Sales Task state.
- Resolve current organization/Project authority and provider bindings from trusted host configuration. Caller flags and sender approval cannot grant authority. Missing or stale bindings block execution.
- Financial effects require the Finance owner. Reconcile UNKNOWN outcomes before retrying.
- Observe host, store and adapter qualification before executing their effects.
- Audit evidence independently from executor prose.
- Consumers install/update only; canonical source/release changes are maintainer-controlled.
