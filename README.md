# WOIA Sales

WOIA Sales is the Sales department orchestrator for WOIA v0.5.8.

It uses WOIA Core OPEA-H rather than a fixed phase chain. Initial capabilities are lead qualification, follow-up and pipeline management.

Identity is resolved through the organization-selected stable source; woia-customer-data remains an optional bounded CRM adapter. Cross-department work is exchanged through typed WOIA Project Bridge messages; the receiving Sales Project owns its own Task and authority.

## Methodology extensions

The [methodology contract](contracts/methodology-extension.json) exports five bounded slots: subject resolution, qualification policy, follow-up policy, pipeline transition policy and business outcome evidence. An independently released specialization may ADD, SPECIALIZE or NARROW these slots through one exact qualified Core snapshot. The base remains a dependency of the selected root.

The host supplies authenticated current organization/Project scope, source authority, exact provider readiness and permitted actions to `routeSales(request, host)`. Requests cannot select a module or broaden that policy. Routing prepares contributions; providers own their capability boundaries and Core owns Task/Effect lifecycle. Reconcile `UNKNOWN` before retry. Pipeline state never grants acceptance of separately owned business facts.

Run `node --test tests/*.test.mjs` for the pure routing boundary, then use Ecosystem thin-plugin certification against the committed candidate.

## Maintenance

Edit only this canonical repository. Keep `plugin.json`, `package.json` and `dev.woia/manifest.json` versions aligned. From the canonical WOIA Ecosystem repository, run `mise run plugin:certify-thin --repo <absolute-plugin-repository>`, then use its release preparation/publication tasks. Install and update consumers from immutable published artifacts; keep Project personalization in overlays.
