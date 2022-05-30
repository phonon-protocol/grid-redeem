import { ethers } from 'ethers';
import { Redeemer__factory, ERC20__factory } from '../contracts';
import config from '../config';
import { GRID_TOKEN_DECIMALS } from '../config/constants';

export type SystemData = {
  gridTotalSupply: ethers.BigNumber;
  redeemerGridBalance: ethers.BigNumber;
  percentageUpgraded: ethers.BigNumber;
};

export type UserData = {
  gridBalance: ethers.BigNumber;
  phononBalance: ethers.BigNumber;
  redeemerGridAllowance: ethers.BigNumber;
};

const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);

const redeemer = Redeemer__factory.connect(
  config.redeemerContractAddress,
  provider
);

const gridToken = ERC20__factory.connect(config.gridContractAddress, provider);

const phononToken = ERC20__factory.connect(
  config.phononContractAddress,
  provider
);

export const getSystemData = async (): Promise<SystemData> => {
  const [gridTotalSupply, redeemerGridBalance, burnAddressGridBalance] =
    await Promise.all([
      gridToken.totalSupply(),
      gridToken.balanceOf(redeemer.address),
      gridToken.balanceOf(ethers.constants.AddressZero),
    ]);

  return {
    gridTotalSupply,
    redeemerGridBalance,
    percentageUpgraded: redeemerGridBalance
      .mul(ethers.BigNumber.from(10).pow(GRID_TOKEN_DECIMALS))
      .div(gridTotalSupply.sub(burnAddressGridBalance))
      .mul(100),
  };
};

export const getUserData = async (account: string): Promise<UserData> => {
  const [gridBalance, phononBalance, redeemerGridAllowance] = await Promise.all(
    [
      gridToken.balanceOf(account),
      phononToken.balanceOf(account),
      gridToken.allowance(account, config.gridContractAddress),
    ]
  );

  return {
    gridBalance,
    phononBalance,
    redeemerGridAllowance,
  };
};
