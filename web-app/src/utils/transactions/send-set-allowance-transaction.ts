import { ethers } from 'ethers';
import config from '../../config';
import { ERC20__factory } from '../../contracts';
import { getAllowanceNotifications } from '../../config/notifications';
import sendTransaction from './send-transaction';

const sendIncreaseAllowanceTransaction = async (signer: ethers.Signer) => {
	const gridToken = ERC20__factory.connect(config.gridContractAddress, signer);

	await sendTransaction(
		gridToken.approve(
			config.redeemerContractAddress,
			ethers.constants.MaxInt256,
		),
		getAllowanceNotifications(),
	);
};

export default sendIncreaseAllowanceTransaction;
