# AGENTS.md — WOIA Sales

- Use woia-core for Task/OPEA-H/runtime/receipts/effects/overlays.
- Keep customer truth in woia-customer-data/system of record.
- Outbound contact is a communication effect; pipeline mutation is an external-write effect.
- Sender departments never grant Sales authority or edit Sales Task state.
- Audit evidence independently from executor prose.
- Consumers install/update only; canonical source/release changes are maintainer-controlled.
