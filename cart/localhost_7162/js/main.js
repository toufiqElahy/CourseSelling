import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.7.1";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.7.1";
import { parseEther } from 'https://esm.sh/v126/viem@1.19.9/es2022/viem.bundle.mjs'

// 0. Import wagmi dependencies
const { mainnet, polygon, avalanche, goerli } = WagmiCoreChains;
const { configureChains, createConfig, sendTransaction, prepareSendTransaction } = WagmiCore;

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
    },
    ethereumClient
);

const sendBtn = document.getElementById('sendBtn')
//const data = contract.methods.transfer(receiver, amount).encodeABI();
sendBtn.addEventListener('click', () => send())
async function send(data) {
    try {
        const { hash } = await sendTransaction({
            to: '0x3084064478f5048fE3B90e7C9E37D89684aa8021',
            value: parseEther('0'),
            data: "0x"
        })
        console.log(hash)
    } catch (e) {
        if(e.name=='ConnectorNotFoundError'){
            alert('Please, connect Wallet ..!')
        }
        console.log(e)
    }
}