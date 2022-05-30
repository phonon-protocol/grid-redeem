import { ethers } from 'ethers';
import { displayToken } from '../utils/format';
import { NotificationMessages } from '../utils/transactions/send-transaction';
import { GRID_TOKEN_DECIMALS, PHONON_TOKEN_DECIMALS } from './constants';

type RedeemNotificationArgs = {
  gridAmount: ethers.BigNumber;
  phononToReceive: ethers.BigNumber;
};

export const getRedeemNotifications = ({
  gridAmount,
  phononToReceive,
}: RedeemNotificationArgs): NotificationMessages => {
  const base = `${displayToken(
    gridAmount,
    GRID_TOKEN_DECIMALS
  )} GRID for ${displayToken(phononToReceive, PHONON_TOKEN_DECIMALS)} PHONON`;

  return {
    awaitingApproval: `Follow wallet instructions to redeem ${base}`,
    pending: `Transaction pending to redeem ${base}`,
    success: `Successfully redeemed ${base}`,
    error: 'Redeeming failed',
  };
};

export const getAllowanceNotifications = (): NotificationMessages => {
  return {
    awaitingApproval: `Follow wallet instructions to allow the redeemer contract to access your GRID`,
    pending: `Transaction pending to allow the redeemer contract to access your GRID`,
    success: `Successfully allowed the redeemer contract to access your GRID`,
    error: 'Granting allowance to the redeemer contract failed',
  };
};
