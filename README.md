# Technical Specification Comparison Dashboard

A React 18 + TypeScript dashboard with an Express REST API, searchable sample specifications, and side-by-side review. Includes MySQL 8 schema for persistence/version history, Cypress starter test, Docker files, and CI pipeline.

## Run locally

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm run dev` (Vite UI on `http://localhost:5173`, API on `http://localhost:4000`).
4. Search for Electrical or Network, then select two specifications for comparison.

The UI demo currently uses seeded in-memory data. The MySQL schema is included, but the API is not yet wired to MySQL; data resets when the server restarts. The test script is a minimal smoke-test starter and does not represent 180 Jest tests or 35 Cypress tests. Azure deployment, authentication, production configuration, and measured performance claims are not implemented/verified.

## Docker database

Before starting Docker Compose, copy `.env.example` to `.env` and set unique local values for `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`. The `.env` file is ignored by Git and must not be committed.

## API examples

- `GET /api/health`
- `GET /api/specs?q=electrical`
- `GET /api/specs/:id`
- `POST /api/specs` with `{ "code":"OPS-004", "title":"Example", "version":"1.0", "category":"Operations", "content":"Example requirement" }`
- `PUT /api/specs/:id`
- `DELETE /api/specs/:id`
