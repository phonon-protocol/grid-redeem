import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ERC20__factory } from '../typechain';

const GRID_MAINNET_TOKEN_ADDRESS = '0x12b19d3e2ccc14da04fae33e63652ce469b3f2fd';
const GRID_WHALE = '0xb26b6b10f391D8630695C3479cb99531E2880Ed3';

task('steal-grid-tokens')
  .addParam('account')
  .addParam('amount')
  .setAction(async (args, hre) => {
    const { startImpersonate, stopImpersonate, signer } = impersonateAccount(
      GRID_WHALE,
      hre
    );

    await startImpersonate();

    const gridToken = ERC20__factory.connect(
      GRID_MAINNET_TOKEN_ADDRESS,
      signer
    );

    await gridToken.transfer(
      args.account,
      hre.ethers.utils.parseUnits(args.amount, 12)
    );

    await stopImpersonate();
  });

export const impersonateAccount = (
  address: string,
  hre: HardhatRuntimeEnvironment
) => {
  const startImpersonate = () =>
    hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [address],
    });

  const stopImpersonate = () =>
    hre.network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: [address],
    });

  const signer = hre.ethers.provider.getSigner(address);

  return {
    startImpersonate,
    stopImpersonate,
    signer,
  };
};
