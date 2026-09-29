# Automatic review recovery

Enabled 29 September 2026 at the user's request.

The local supervisor runs scripts/supervise_gq_review.py independently of the chat. It manages one review child at a time, with separate supervisor and runner locks. It uses 16 concurrent API requests, a 120-request/minute cap, and a 180-second transport timeout. The previous configuration used 8 workers and 60 requests/minute. Saved API headers showed substantial rate-limit headroom; rate limits are shared with any other account activity.

On a connection reset, timeout, DNS failure, or recognized network failure:

1. The child stops submitting new requests and waits for in-flight calls to settle.
2. Successful responses remain saved. The supervisor reads only attempt metadata, archives interruption mappings under grading/recovery-events/, and adds ambiguous requests to deferred-review-ids.json. Original attempt artifacts are preserved.
3. It checks API connectivity without a credential or billable generation call, using the same certificate-verified transport. Failed checks back off from 10 seconds to 5 minutes, with jitter. Two consecutive successful checks are required before resuming.
4. It resumes only unsubmitted requests from the same frozen selection. It never replays a request with an uncertain outcome, or a safety-flagged request.

Authentication, quota, cost-cap, parse/integrity, unrecognized failures, and process crashes without settled attempt metadata still require inspection. No model, rubric, prompt, sampling, or review-selection changes were made. The existing $100 saved-response cost guard remains in force; estimates exclude unknown charges from ambiguous attempts. Outages can increase deferred-review counts; they must remain explicit in final analyses.

This does not run API calls while the network is unavailable. It waits and resumes automatically. The local Mac must remain powered on; caffeinate prevents idle system sleep while the supervisor is alive, but shutdown or closing a laptop can still interrupt it. The heartbeat monitor remains active during transient outages and handles final audit/report work when the supervisor reaches awaiting_final_audit.

Synthetic tests cover idempotent deferral and original-attempt preservation, skipping quarantined records without accessing their error/payload content, skipping saved responses, failure on unrecognized or unsettled errors, two consecutive health checks after simulated outages, and distinguishing network from local filesystem failures. Six recovery tests and the existing quarantine regression passed without API calls or research-output text.

State files: review-supervisor.pid, review-supervisor.log, review-supervisor.json, census-review.pid, grading/summary.json, and study-notice.json. Each child writes a new census-review-supervised-*.log. Never start another reviewer while either the supervisor or its child is active.
