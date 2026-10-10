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

## Bounded specialization

Use [the methodology contract](../../contracts/methodology-extension.json) when a selected root specializes Sales. Only the five exported slots may change through ADD, SPECIALIZE or NARROW. Resolve accepted descriptors and permitted actions from the qualified Core snapshot and current organization policy. A request never supplies module paths, grants or source bindings. Missing or stale context blocks the affected contribution.
