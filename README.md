# Grid Redeem

A simple UI for converting GRID to PHONON.

The large majority of functionality can be found in `./web-app/src/hooks/useData.ts` and `./web-app/src/navigation/Home.tsx`.

Currently hosted on ahinchliff's personal Vercel account. Any commits to master will trigger a new deployment.

## Running Locally

If you dont want to run the front end against a local fork of mainnet you can skip the "Chain" steps.

### Chain

In `./hardhat`

- `yarn`
- `cp .env.sample .env` and add your ethereum RPC url.
- In terminal one `npx hardht node`
- In terminal two `npx hardhat steal-grid-tokens --network localhost --amount 100 -account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

### Web App

In `./web-app`

- `yarn`
- `cp .env.sample .env` (make any required changes)
- `yarn start`
