# Holo DevDAO

An alternative viewer for DevDAO NFT with a ✨holographic✨ twist.

## Pre-requisites
* `node` version >= 15.0.1 & `npm` >= 7.20.6. If you have `nvm` installed, run `nvm use` to use the same `node` and `npm` version used when this project was crafter ;
* An [Alchemy](https://www.alchemy.com/) account & project
* An [Infura](https://infura.io) account & project
## Setup
1. Install the dependencies and setup Git hooks (via Husky) by running `npm run setup` in your terminal
2. Copy the content of `.env.dist` and paste it in `.env.local`. Here are some values :
```
VITE_DEVELOPER_DAO_CONTRACT=0x25ed58c027921E14D86380eA2646E3a1B5C55A8b
VITE_DEVELOPER_DAO_CONTRACT_NETWORK=mainnet
VITE_DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER=mainnet
VITE_NETWORK_ID=1
VITE_OPENSEA_DIRECT_LINK_PREFIX=https://opensea.io/assets/0x25ed58c027921E14D86380eA2646E3a1B5C55A8b
VITE_OPENSEA_COLLECTION_LINK=https://opensea.io/collection/devs-for-revolution
VITE_ETHER_SCAN_LINK_PREFIX=https://etherscan.io/address
VITE_ETHERSCAN_TX_URL=https://etherscan.io/tx/
VITE_ALCHEMY_URL=
VITE_INFURA_PROJECT_ID=
VITE_INFURA_PROJECT_SECRET=
```

You will need to provide values for `VITE_ALCHEMY_URL`, `VITE_INFURA_PROJECT_ID` and `VITE_INFURA_PROJECT_SECRET`

3. Run `npm start`
4. Hit `localhost:3000`

## Built with

* [SolidJS](https://solidjs.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
* [ethers.js](https://docs.ethers.io/v5/)
* [Infura](https://infura.io)
* [Alchemy](https://alchemy.com/)
