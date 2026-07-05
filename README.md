# BFM Booking Travel Integration Starter

This repository now includes a minimal, production-minded Node.js service foundation focused on external integration readiness.

## What was added

- Modular Node.js service (`src/`) with clear integration boundaries
- Operational recovery hooks with restart orchestration entrypoint (`POST /operations/recover`)
- External REST API callout client structure (`src/clients/rest-client.js`, `POST /callouts/ping`)
- Webhook handler entrypoint (`POST /webhooks/:provider`)
- Provider abstractions for:
  - Payments: Stripe / PayPal / Paystack / Flutterwave
  - Notifications: Twilio / SendGrid / SMTP / Mailgun
  - Storage: Firebase / Supabase / MongoDB / PostgreSQL / MySQL / Redis
  - Cloud/media: AWS S3 / Cloudinary
  - Maps/location: Google Maps / Mapbox
  - Auth: OAuth / Auth0 / Firebase Auth
- Environment-driven configuration (`src/config/index.js`, `.env.example`)
- Basic tests for module/config loading (`tests/`)

## Run locally

```bash
npm install
npm test
npm start
```

## API endpoints

- `GET /health` — service status + selected provider configuration state
- `POST /operations/recover` — triggers operational recovery hooks
- `POST /callouts/ping` — performs external API health callout (`EXTERNAL_API_BASE_URL` required)
- `POST /webhooks/:provider` — generic webhook ingress endpoint

## Configuration

Copy `.env.example` into your runtime environment and set provider credentials via environment variables.
Set `WEBHOOK_MAX_BYTES` to control maximum accepted webhook payload size.

No live credentials are committed. Provider modules are intentionally safe placeholders that expose stable interfaces and configuration points.

## What remains to wire with real providers

- Replace placeholder provider action implementations with SDK/API calls.
- Add provider-specific webhook signature verification (Stripe, PayPal, etc.).
- Add persistent storage repositories and migrations for your selected backend(s).
- Add auth middleware/token verification flow for protected endpoints.
- Add retry/circuit-breaker/observability around external callouts.
