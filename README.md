# Grid Redeem

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
