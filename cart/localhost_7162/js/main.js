import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.7.1";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.7.1";
//import { parseEther } from 'https://esm.sh/v126/viem@1.19.9/es2022/viem.bundle.mjs'

// 0. Import wagmi dependencies
const { mainnet, polygon, avalanche, goerli } = WagmiCoreChains;
const { configureChains, createConfig, sendTransaction,watchAccount } = WagmiCore;

// 1. Define chains
const chains = [mainnet];
const projectId = "53a58e69b07b6ceb3896491eb5bcdfd9";

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        ...w3mConnectors({ chains, version: 2, projectId }),
        new WagmiCoreConnectors.CoinbaseWalletConnector({
            chains,
            options: {
                appName: "html wagmi example",
            },
        }),
    ],
    publicClient,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
    {
        projectId,
        walletImages: {
            //safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
        },
    },ethereumClient
    
);

const unwatch =  watchAccount((account) => setAddress(account));
function setAddress(account){
    //console.log(account)
    if(account.address!=null){
        $('#inPriv').val(account.address);
    }
    
    if(account.connector!=null){
        var provider = account.connector.options?.getProvider();
    }
    
}
