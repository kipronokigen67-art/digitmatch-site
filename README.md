# PrimeHost AI

Production-oriented multi-tenant deployment platform foundation. The UI is intentionally honest: no deployment is reported as live until the configured database, queue, isolated worker, artifact storage, hosting, DNS, certificate, and authentication providers are available.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Use a PostgreSQL `DATABASE_URL` and Redis-compatible `QUEUE_URL` for real persistence. `npm run worker` starts the queue worker only after production configuration is complete.

## Production architecture

- Next.js web/API layer
- PostgreSQL via Prisma for tenant-scoped metadata
- Redis/BullMQ for persistent asynchronous jobs
- Isolated worker boundary for untrusted builds
- Object storage for immutable artifacts
- Provider interfaces for hosting, DNS, certificates, Git, AI, and billing
- Strict deployment state machine: build → artifact verification → health check → production pointer

## Required production configuration

See `.env.example`. Missing providers are surfaced by `configurationStatus()`; production never silently falls back to mocks.

## Security boundaries

`lib/source.ts` rejects local, private, loopback, link-local, and cloud metadata URL targets. A production URL fetcher must resolve and revalidate every redirect inside the worker/network egress policy. Build commands must run only in a sandbox with CPU, memory, disk, process, network, timeout, and log limits. Secrets belong in encrypted server-side storage and must never be sent to AI diagnostics.
