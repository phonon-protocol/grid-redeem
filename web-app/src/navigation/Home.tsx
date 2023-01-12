import * as React from 'react';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { ButtonSendTransaction } from '../components';
import { displayToken } from '../utils/format';
import useData from '../hooks/useData';
import sendIncreaseAllowanceTransaction from '../utils/transactions/send-set-allowance-transaction';
import sendRedeemTransaction from '../utils/transactions/send-redeem-transaction';
import {
	GRID_TOKEN_DECIMALS,
	PHONON_PER_GRID,
	PHONON_TOKEN_DECIMALS,
} from '../config/constants';

const Home: React.FC = () => {
	const { data: accountData } = useAccount();
	const { data: signer } = useSigner();
	const { systemData, userData, refreshData } = useData(accountData?.address);
	const [, setSending] = React.useState(false);

	const toReceive = userData?.gridBalance
		.mul(PHONON_PER_GRID)
		.mul(
			ethers.BigNumber.from('10').pow(
				PHONON_TOKEN_DECIMALS - GRID_TOKEN_DECIMALS,
			),
		);

	const onRedeem = async () => {
		if (!signer || !userData || !toReceive) {
			return;
		}

		setSending(true);

		try {
			if (userData.redeemerGridAllowance.lt(userData.gridBalance)) {
				await sendIncreaseAllowanceTransaction(signer);
				refreshData();
			}

			await sendRedeemTransaction(userData.gridBalance, toReceive, signer);
			await refreshData();
		} finally {
			setSending(false);
		}
	};

	// const canRedeem =
	// 	!sending &&
	// 	!!accountData?.address &&
	// 	userData?.gridBalance.gt(ethers.constants.Zero);

	return (
		<div className='flex flex-col justify-center mt-8 sm:mx-auto sm:w-full sm:max-w-4xl backdrop-blur py-8 px-4 shadow sm:rounded-lg sm:px-10'>
			<div className='bg-red-500 mb-5 p-2 text-center'>
				<p className='font-bold'>Redemption period is over</p>
				<p className='text-sm mt-1'>
					The DAO has voted to remove PHONON liquidity from The Redeemer
					Contract. More details can be found{' '}
					<a
						className='link'
						href='https://vote.phonon.network/#/proposal/0xe37c3382a322d3377f38b3beda07610d81f4074bd8c6397c236736f98cf42844'
					>
						here
					</a>
					.
				</p>
			</div>
			<h1 className='text-3xl phonon-text-gradient mb-5'>Redeem</h1>

			<div className='sm:grid grid-cols-2 gap-x-16 gap-y-5'>
				<div>
					<h2 className='text-lg phonon-text-gradient mb-5'>
						Upgrade your GRID to PHONON
					</h2>

					<p className='text-sm'>
						Phonon DAO has issued 10 billion PHONON tokens for the purpose of
						managing the protocol, bootstrapping participation, and long-term
						incentive alignment among all stakeholders.
					</p>
					<p className='text-sm mt-3'>
						60.36% of all PHONON tokens are immediately available to current
						GRID holders via a redeemer contract which issues 155 PHONON for
						each 1 GRID upgraded. More details can be found in a{' '}
						<a
							className='link'
							href='https://blog.phonon.network/phonon-dao-launch-overview-resources-and-phonon-token-details-f8369e89f1ea'
						>
							post on the PhononDAO blog
						</a>
						.
					</p>
				</div>

				<div className='sm:pt-0 flex flex-col justify-between mt-3 sm:mt-0'>
					<div className='grid grid-cols-7 text-sm'>
						<div className='col-span-3 pb-1'>GRID upgraded</div>
						<div className='col-span-4 text-right'>
							<DisplaySystemData
								data={displayToken(
									systemData?.redeemerGridBalance,
									GRID_TOKEN_DECIMALS,
								)}
							/>
						</div>
						<div className='col-span-3 pb-1'>Percent upgraded</div>
						<div className='col-span-4 text-right'>
							<DisplaySystemData
								data={
									systemData
										? `${displayToken(systemData.percentageUpgraded, 12)}%`
										: undefined
								}
							/>
						</div>
						<div className='col-span-7 mt-3 mb-2'>
							<span className='text phonon-text-gradient mb-5'>
								Your wallet
							</span>
						</div>
						<div className='col-span-3 pb-1'>GRID balance</div>
						<div className='col-span-4 text-right'>
							<DisplayUserData
								accountConnected={!!accountData}
								data={displayToken(userData?.gridBalance, GRID_TOKEN_DECIMALS)}
							/>
						</div>
						<div className='col-span-3 pb-1'>PHONON balance</div>
						<div className='col-span-4 text-right'>
							<DisplayUserData
								accountConnected={!!accountData}
								data={displayToken(
									userData?.phononBalance,
									PHONON_TOKEN_DECIMALS,
								)}
							/>
						</div>
					</div>

					<ButtonSendTransaction
						className='w-full mt-4'
						onClick={onRedeem}
						disabled={true} // redeem is now closed
					>
						{toReceive?.gt(0)
							? `Redeem ${displayToken(
									toReceive,
									PHONON_TOKEN_DECIMALS,
							  )} PHONON`
							: 'Redeem'}
					</ButtonSendTransaction>
				</div>

				<div className='col-span-2 text-center text-xs pt-3 link'>
					<a href='https://etherscan.io/address/0xfdcc959b0aa82e288e4154cb1c770c6c4e958a91'>
						View Redeemer Contract on Etherscan
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;

const DisplaySystemData: React.FC<{
	data: string | undefined;
}> = (props) => {
	if (!props.data) {
		return <span>Loading...</span>;
	}

	return <span>{props.data}</span>;
};

const DisplayUserData: React.FC<{
	data: string | undefined;
	accountConnected: boolean;
}> = (props) => {
	if (!props.accountConnected) {
		return <span>-</span>;
	}

	if (props.accountConnected && !props.data) {
		return <span>Loading...</span>;
	}

	return <span>{props.data}</span>;
};
