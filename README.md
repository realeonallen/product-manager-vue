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

