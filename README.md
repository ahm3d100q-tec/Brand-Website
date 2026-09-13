# ACE Fashion Store

The original static luxury-fashion landing page is now served by an Express application with a persistent embedded NeDB database for accounts and orders. The original visual system, product cards, local cart flow, and responsive styling are retained.

## Requirements and install

Install Node.js 18+ and npm, then run:

```powershell
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The API runs at `http://localhost:3000`; it can also serve the site at that address. To use VS Code Live Server, open the project through `http://127.0.0.1:5500` (or `http://localhost:5500`) while the API command remains running in a separate terminal. The browser sends every account/order request to port 3000, never to Live Server: `127.0.0.1:5500` uses `http://127.0.0.1:3000/api/...`, while `localhost:5500` uses `http://localhost:3000/api/...`. This preserves the local cookie session correctly.

## Environment

Set `JWT_SECRET` in `.env` to a long, random private value before production. `PORT` defaults to 3000; set `NODE_ENV=production` behind HTTPS so session cookies are marked `Secure`. `FRONTEND_ORIGINS` is the comma-separated list of allowed UI origins; its development default includes both Live Server origins on port 5500.

The embedded database files are created automatically under `data/` and are excluded from Git. No external database service or keys are required.

## Test the store flow

1. Start the API, then open either `http://localhost:3000` or Live Server at `http://127.0.0.1:5500`.
2. Create an account from **My Account**, log out, then sign in with the same account. Browser Network should show successful requests to `http://localhost:3000/api/auth/register` and `http://localhost:3000/api/auth/login`.
3. Continue to checkout, enter every shipping field, and confirm the order.
4. The confirmation page displays the unique order number and tracking progress. **My Account** lists only the signed-in user's orders and opens each tracking page.
5. Use **Sign out** from the account page. Protected account, checkout, and order routes redirect or reject unauthenticated access.

Passwords are bcrypt-hashed; API validation, ownership checks, HTTP-only signed session cookies, and server-side order persistence are used throughout.
