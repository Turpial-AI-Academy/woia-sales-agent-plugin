---
name: sales-orchestration
description: Orchestrate WOIA Sales Tasks through OPEA-H, shared customer data, exact Sales providers, communication/pipeline effects, receipts and correlated cross-department responses.
license: MIT
---

# WOIA Sales Orchestration

Use WOIA Core for Task/runtime mechanics and this skill for Sales routing.

1. Read current Task/TaskCell and any cross-department request correlation.
2. Resolve the exact shared customer/lead ref through woia-customer-data when needed.
3. For the active OPEA-H role, select required Sales provider responsibilities.
4. Delegate through woia-core to exact runtime-ready providers; no root fallback.
5. Record communication/pipeline effects explicitly and reconcile unknown outcomes before retry.
6. Audit actual customer/system/channel evidence, not child summaries.
7. If origin is cross-department, return a typed correlated response through woia-chatgpt-project-bridge after the Sales-owned Task reaches an appropriate status.

Never let a sender department edit this Sales Task directly, and never inherit sender authority.
