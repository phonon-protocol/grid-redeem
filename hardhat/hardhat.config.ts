import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import './scripts/steal-grid';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.ETHEREUM_RPC_URL!,
      },
      mining: {
        auto: false,
        interval: 2000,
      },
    },
  },
};

export default config;
