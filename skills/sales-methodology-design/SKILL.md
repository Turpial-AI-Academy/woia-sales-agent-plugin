---
name: sales-methodology-design
description: Select the minimum Sales capabilities and proportional WOIA OPEA-H profile from lead/customer objective, current state, communication effects, pipeline effects, uncertainty and handoff needs.
license: MIT
---

# WOIA Sales Methodology Design

1. Determine the requested business outcome and whether a persistent Task is needed.
2. Select the minimum OPEA-H profile justified by ambiguity, outbound communication, source-of-truth mutation and audit needs.
3. Select only required Sales capabilities from registry/capabilities.json.
4. Resolve customer records through woia-customer-data; never create a Sales-only customer copy.
5. Resolve cross-department origin/correlation when the Task arrived through WOIA Project Bridge.
6. Record effect classes, authority and Human Review boundaries before execution.

Typical routing:
- qualification only -> task-execution or planned-execution;
- qualification plus follow-up -> planned-execution / audited-execution;
- cross-department lead handoff with communication + pipeline mutation -> opea-h-full when risk/complexity justify it.
