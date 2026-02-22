### Repo snapshot

- Tech: Vite + React 19 (ESM), Tailwind + Flowbite UI
- Entry: `src/main.jsx` -> `src/App.jsx` sets routes and layout boundaries
- API client: `src/api/client.js` (single exported `apiRequest` using a hardcoded `BASE_URL`)
- Auth: `src/context/AuthContext.jsx` (localStorage-backed `login`/`logout`)
- Patterns: layout-based routing (`PublicLayout` / `AdminLayout`), page files in `src/pages/*`, UI components under `src/components/*`

### What to do first (quick wins for agents)

- Read `src/App.jsx` to understand public vs admin routes and canonical page locations.
- Inspect `src/api/client.js` before changing network code — endpoints expect JSON and may return either `{ success, data }` or raw data.
- Use `AuthContext` for user state; writes to `localStorage` are the canonical persistence mechanism.
- Follow the optimistic-delete pattern in `src/hooks/useCrud.js` when adding list/delete UI: remove locally then rollback on error.

### Architecturally important notes (why things are laid out this way)

- Layout-based routing: `PublicLayout` and `AdminLayout` split shared chrome (header/sidebar/footer) from page content. Place new pages under `src/pages/public` or `src/pages/admin` as appropriate.
- Single API shim: `src/api/client.js` centralizes error handling and JSON parsing; many APIs return `json.success` and `json.data`. Prefer using `apiRequest(endpoint, opts)` rather than raw `fetch` so error behavior stays consistent.
- Lightweight auth: `AuthContext` is intentionally minimal (no token refresh). If adding auth flows, keep the same `login(userData)` / `logout()` shape so consumers (`useAuth`) remain compatible.

### Conventions and patterns to preserve

- File placement: admin-specific pages go in `src/pages/admin/*`; shared/atomic UI stays in `src/components/*` (see `components/admin/*`, `components/public/*`).
- Hooks: reuse `useCrud` for list screens—its API is `{ data, setData, loading, load, remove }`.
- Styling: Tailwind classes + tokens from `src/index.css`. Prefer utility-first Tailwind classes and the existing CSS variables for brand colors.
- Routing: `react-router-dom` v7 routes are declared in `src/App.jsx`; use nested routes for admin subpaths (e.g., `/admin/course-category`).

### Build / dev / deploy commands (project-specific)

- Start dev server: `npm run dev` (runs `vite`).
- Production build: `npm run build`.
- Preview build: `npm run preview`.
- Deployment: repo uses `gh-pages` via `npm run deploy` (publishes `dist` to GitHub Pages).

### Integration pitfalls to watch for

- `src/api/client.js` uses a hardcoded `BASE_URL`. Before altering or deploying, confirm whether this should be replaced by `import.meta.env` variables in `.env` files.
- Some pages/components assume backend payloads include `id` fields and `json.success` semantics; changing those shapes may require updates to multiple `fetchFn`/`deleteFn` usages (search for `apiRequest` usages).
- `AuthContext` does not fetch current user on mount — tests or components that expect a persisted user should call `login(JSON.parse(localStorage.getItem('user')))` or be adapted accordingly.

### Helpful file examples

- Route definitions: `src/App.jsx` (where to add pages)
- API gateway: `src/api/client.js` (how requests/errors are normalized)
- Auth storage: `src/context/AuthContext.jsx` (login/logout API)
- Reusable list logic: `src/hooks/useCrud.js` (load/remove pattern)

If anything here is unclear or you'd like me to expand specific examples (e.g., show how to add a new admin page with API wiring), tell me which part to expand.
