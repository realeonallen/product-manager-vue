# Product Manager – Vue 3 + Tailwind + Pinia

A mini product management app built with Vue 3, Vite, Tailwind CSS, and Pinia, integrating with the [DummyJSON](https://dummyjson.com) public API.

## Features

- **User Authentication** – Login with DummyJSON API, token-based auth stored in localStorage
- **Product Listing** – Display products in a responsive table with search functionality
- **Product Details** – View full product information with delete capability
- **Add Products** – Create new products via form
- **State Management** – Pinia stores for auth and product state
- **Route Protection** – Vue Router guards prevent unauthorized access
- **Responsive Design** – Tailwind CSS with primary color `#000080`

## Prerequisites

- **Node.js** 18+ (with npm) – [Download here](https://nodejs.org/) or run the setup script below

## Setup Instructions

### Option 1: Automatic Setup (Windows)

Double-click `setup-windows.bat` to automatically download Node.js and install dependencies.

### Option 2: Manual Setup

1. **Install Node.js** – Download from [nodejs.org](https://nodejs.org/) if not already installed
2. **Navigate to project directory**
   ```powershell
   cd C:\Users\Leon\Downloads\Django\product-app
   ```
3. **Install dependencies**
   ```powershell
   npm install
   ```
4. **Run dev server**
   ```powershell
   npm run dev
   ```
5. **Open browser** – Visit `http://localhost:5173` (Vite will open it automatically)

## Test Credentials

Use these credentials from DummyJSON docs to test login:
- **Username:** `kminchelle`
- **Password:** `0lelplR`

## Build for Production

```powershell
npm run build
```

Output will be in the `dist/` folder.

## API Integration

All API calls use endpoints from [dummyjson.com](https://dummyjson.com):
- **Auth:** `POST /auth/login`
- **Products:** `GET /products`, `GET /products/:id`, `POST /products/add`, `DELETE /products/:id`

Authentication tokens are automatically attached to product requests.

## Project Structure

```
src/
├── pages/
│   ├── Login.vue              # Login form with auth
│   ├── Products.vue           # Product list with search
│   ├── ProductView.vue        # Product details & delete
│   └── AddProduct.vue         # Add product form
├── stores/
│   ├── auth.js                # Auth store (token, user, login/logout)
│   └── products.js            # Product store (fetch, add, delete)
├── router/
│   └── index.js               # Vue Router config & guards
├── App.vue                    # Root component
├── main.js                    # Entry point
└── styles.css                 # Tailwind CSS imports
```

## Key Implementation Details

- **Auth Store** – Persists token in `localStorage` under key `auth` for session restoration
- **Route Guards** – Protects `/products` and `/products/:id` routes; redirects to login if not authenticated
- **Tailwind Config** – Primary color `#000080` defined as `primary` class
- **API Headers** – Authorization header automatically added when token is available
- **Error Handling** – Catches and displays errors from API failures

## Notes & Assumptions

- The DummyJSON mock API may have limitations (e.g., delete operations are mocked but data may not persist)
- Search filters products by title; additional filters (category, price range) can be added
- Loading states are shown during API calls
- Responsive design works on desktop, tablet, and mobile screens

## Deployment to GitHub Pages

1. Build the project:
   ```powershell
   npm run build
   ```
2. Push the `dist/` folder to your GitHub Pages branch (or configure in GitHub Actions)
3. Update `vite.config.js` with your repository name if needed:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     ...
   })
   ```

## Troubleshooting

- **npm: command not found** – Node.js is not installed or not in PATH. Run `setup-windows.bat` or install manually
- **Port 5173 already in use** – Kill the process or change the port in `vite.config.js`
- **API errors** – Check internet connection and verify DummyJSON endpoints are accessible
- **Token errors** – Clear localStorage (`F12` → Application → Storage → localStorage → delete `auth`) and log in again

## End-to-end tests (E2E)

- **Running the E2E test**

   1. Ensure the dev server is running on `http://localhost:5173`:
       ```powershell
       npm run dev -- --host
       ```
   2. Install dev dependencies and Playwright browsers (if not already):
       ```powershell
       npm install
       npx playwright install chromium
       ```
   3. Run the headless E2E login test:
       ```powershell
       npm run test:e2e
       ```

- **Artifacts on failure**

   If the E2E script encounters a failure, it will capture a full-page PNG screenshot and the current page HTML and save them to `scripts/e2e-screenshots/` with a timestamped filename (e.g. `failure-2025-11-25T07-00-00-000Z.png`). Use these artifacts to debug UI state, network errors, or routing issues.

- **Dev-only auth fallback**

   The auth store (`src/stores/auth.js`) includes a development-only fallback: when the app is served from `localhost` and the DummyJSON auth endpoint returns HTTP 400/401, the store will create a local fake session (token `local-dev-token`, user `Local Demo`) and persist it to `localStorage`. This allows testing the UI and navigation locally even when the remote auth service rejects the demo credentials.

   Note: this fallback is intentionally only for local development and should be removed or disabled before publishing a production build.

## CI status

- **E2E workflow status:**

   ![E2E Tests](https://github.com/realeonallen/product-manager-vue/actions/workflows/e2e.yml/badge.svg)

## Controlling the local auth fallback

If you want to explicitly enable or disable the development auth fallback (instead of relying on `localhost`), use a Vite environment variable.

1. Create a `.env` (or `.env.local`) file in the project root with:

```bash
VITE_DEV_AUTH_FALLBACK=true
```

2. Restart the dev server. When `VITE_DEV_AUTH_FALLBACK` is `true` the app will allow the local fake session even if you're not on `localhost`.

Reminder: Do not enable this in production builds — it's intended only for local development and demos.

