import { ethers } from 'ethers';
import config from '../../config';
import { Redeemer__factory } from '../../contracts';
import { getRedeemNotifications } from '../../config/notifications';
import sendTransaction from './send-transaction';

const sendRedeemTransaction = async (
	gridAmount: ethers.BigNumber,
	phononToReceive: ethers.BigNumber,
	signer: ethers.Signer,
) => {
	const redeemerContract = Redeemer__factory.connect(
		config.redeemerContractAddress,
		signer,
	);
	await sendTransaction(
		redeemerContract.redeem(),
		getRedeemNotifications({ gridAmount, phononToReceive }),
	);
};

export default sendRedeemTransaction;
