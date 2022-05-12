require('dotenv').config();
const ethers = require('ethers');
const delay = require('delay');
const abi = require('./abis/kryptotrees.json');

(async () => {
    const network = "matic"; // connect to polygon matic network
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMYKEY}`);

    await delay(1000);
    // Create a wallet signer with provider
    const signer = new ethers.Wallet(process.env.PRIVATEKEY, provider);
    console.log('Wallet address: ', signer.address);

    await delay(1000);
    const gasFee = await provider.getFeeData();
    for (const property in gasFee) {
        console.log(`${property}: ${ethers.utils.formatUnits(gasFee[property], 'gwei')}`);
    }

    // Create contract with read/write access
    const kryptoTrees = new ethers.Contract(
        process.env.KRYPTOTREES_ADD,
        abi,
        signer
    );

    // // Read contract
    await delay(1000);
    const tokenIDS = await kryptoTrees.walletOfOwner(signer.address);
    console.log(`tokenIds: ${tokenIDS}`);

    // try {
    //     // Write contract
    //     await delay(1000);
    //     // safeTransferFrom is a overloaded function (function shared the same name)
    //     const txn = await kryptoTrees['safeTransferFrom(address,address,uint256)'](signer.address, '0xa57297Eb18698A00Edcb17F1551cC0a231F45de8', 6227, {
    //         maxFeePerGas: ethers.utils.parseUnits("227", "gwei"),
    //         maxPriorityFeePerGas: ethers.utils.parseUnits("54", "gwei"),
    //         gasLimit: '140400'
    //     });

    //     const receipt = await txn.wait();

    //     console.log(`txnReceipt:`, receipt);

    //     // Object return 
    //     // txnReceipt: {
    //     //     to: '0x660DEC2E3a19fb5534AFe02B5c115DC4905BC9f9',
    //     //     from: '0xA4cFD9ebeCbAD72616875745e96D422F384EDeA4',
    //     //     contractAddress: null,
    //     //     transactionIndex: 43,
    //     //     gasUsed: BigNumber { _hex: '0x014fef', _isBigNumber: true },
    //     //     logsBloom: '0x00000800000000000200000000000000000000000000000000000000000000400000000000000020000000000000000000008000000000000000000000200000000000000000000000000008000000800000000014400000000100000000000000000000220000000000000000000800000000000000000080000010000000000000000000000000000000000000000000000000000000008000000000000000220000000000000000000000000000000000000000000000000000000200004000000002000000000041000000000000000000000000000000100000000020000210000000000000000000200000000000000000000000020000000000100000',
    //     //     blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030',
    //     //     transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //     logs: [
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x660DEC2E3a19fb5534AFe02B5c115DC4905BC9f9',
    //     //         topics: [Array],
    //     //         data: '0x',
    //     //         logIndex: 227,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030'
    //     //       },
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x660DEC2E3a19fb5534AFe02B5c115DC4905BC9f9',
    //     //         topics: [Array],
    //     //         data: '0x',
    //     //         logIndex: 228,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030'
    //     //       },
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x0000000000000000000000000000000000001010',
    //     //         topics: [Array],
    //     //         data: '0x00000000000000000000000000000000000000000000000000107fa4efafa400000000000000000000000000000000000000000000000000085ae3a1ea06f49400000000000000000000000000000000000000000000f9df636664a47ac5fe54000000000000000000000000000000000000000000000000084a63fcfa57509400000000000000000000000000000000000000000000f9df6376e4496a75a254',
    //     //         logIndex: 229,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030'
    //     //       }
    //     //     ],
    //     //     blockNumber: 28228833,
    //     //     confirmations: 2,
    //     //     cumulativeGasUsed: BigNumber { _hex: '0xbcd731', _isBigNumber: true },
    //     //     effectiveGasPrice: BigNumber { _hex: '0x2cd194fd48', _isBigNumber: true },
    //     //     status: 1,
    //     //     type: 2,
    //     //     byzantium: true,
    //     //     events: [
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x660DEC2E3a19fb5534AFe02B5c115DC4905BC9f9',
    //     //         topics: [Array],
    //     //         data: '0x',
    //     //         logIndex: 227,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030',
    //     //         args: [Array],
    //     //         decode: [Function (anonymous)],
    //     //         event: 'Approval',
    //     //         eventSignature: 'Approval(address,address,uint256)',
    //     //         removeListener: [Function (anonymous)],
    //     //         getBlock: [Function (anonymous)],
    //     //         getTransaction: [Function (anonymous)],
    //     //         getTransactionReceipt: [Function (anonymous)]
    //     //       },
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x660DEC2E3a19fb5534AFe02B5c115DC4905BC9f9',
    //     //         topics: [Array],
    //     //         data: '0x',
    //     //         logIndex: 228,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030',
    //     //         args: [Array],
    //     //         decode: [Function (anonymous)],
    //     //         event: 'Transfer',
    //     //         eventSignature: 'Transfer(address,address,uint256)',
    //     //         removeListener: [Function (anonymous)],
    //     //         getBlock: [Function (anonymous)],
    //     //         getTransaction: [Function (anonymous)],
    //     //         getTransactionReceipt: [Function (anonymous)]
    //     //       },
    //     //       {
    //     //         transactionIndex: 43,
    //     //         blockNumber: 28228833,
    //     //         transactionHash: '0xec15200e51dacae30d5f75baeb2990d70309268711e6665481dd47c23d1f60fe',
    //     //         address: '0x0000000000000000000000000000000000001010',
    //     //         topics: [Array],
    //     //         data: '0x00000000000000000000000000000000000000000000000000107fa4efafa400000000000000000000000000000000000000000000000000085ae3a1ea06f49400000000000000000000000000000000000000000000f9df636664a47ac5fe54000000000000000000000000000000000000000000000000084a63fcfa57509400000000000000000000000000000000000000000000f9df6376e4496a75a254',
    //     //         logIndex: 229,
    //     //         blockHash: '0xd46b2c238b7612023317a754ad7d830fa5c3a6e550852235da4f7ecbbfd55030',
    //     //         removeListener: [Function (anonymous)],
    //     //         getBlock: [Function (anonymous)],
    //     //         getTransaction: [Function (anonymous)],
    //     //         getTransactionReceipt: [Function (anonymous)]
    //     //       }
    //     //     ]
    //     //   }
    // } catch (error) {
    //     console.error(error);
    // }

})();
