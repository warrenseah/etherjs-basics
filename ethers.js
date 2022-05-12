require('dotenv').config();
const ethers = require('ethers');
const delay = require('delay');

(async () => {
    const network = "homestead";
    const provider = ethers.getDefaultProvider(network, {
        infura: process.env.INFURAKEY
    });
    
    await delay(1000);
    const networkName = await provider.getNetwork();
    await delay(1000);
    const blockNo = await provider.getBlockNumber();
    console.log(networkName.name, blockNo);
    await delay(1000);
    const gasFee = await provider.getFeeData();
    for (const property in gasFee) {
        console.log(`${property}: ${ethers.utils.formatUnits(gasFee[property], 'gwei')}`);
    }

    await delay(1000);

    // Create a wallet signer
    const wallets = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
    console.log('Wallet address: ', wallets.address);
    await delay(1000);
    const walletBalance = await provider.getBalance(wallets.address);
    console.log(`${wallets.address} balance: ${ethers.utils.formatEther(walletBalance)} ether`);

    await delay(1000);
    console.log(ethers.BigNumber.from("42"));
})();



