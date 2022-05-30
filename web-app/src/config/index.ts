const getEnvVariable = (property: string, canBeUndefined = false): string => {
  const value = process.env[property];
  if (!canBeUndefined && !value) {
    throw new Error(`${property} environment variable is not set`);
  }
  return value as string;
};

const config = {
  chainId: Number(getEnvVariable('REACT_APP_CHAIN_ID')),
  rpcUrl: getEnvVariable('REACT_APP_RPC_URL'),
  redeemerContractAddress: getEnvVariable(
    'REACT_APP_REDEEMER_CONTRACT_ADDRESS'
  ),
  gridContractAddress: getEnvVariable('REACT_APP_GRID_TOKEN_CONTRACT_ADDRESS'),
  phononContractAddress: getEnvVariable(
    'REACT_APP_PHONON_TOKEN_CONTRACT_ADDRESS'
  ),
};

export default config;
