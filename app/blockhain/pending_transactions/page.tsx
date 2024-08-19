'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import axios from 'axios';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import Web3 from 'web3';

const data = [
  {
    category: 'TOTAL TRANSACTIONS',
    stat: '8044',
  },
  {
    category: 'TOTAL BLOCKS',
    stat: '2146300',
  },
  {
    category: 'AVERAGE BLOCK TIME',
    stat: '5000',
  },
  {
    category: 'GAS TRACKER',
    stat: '3',
  }
];

const transactionData = [
  {
    transactionHash: "0x141505dd2b003499e72c717a7cae10219a49b7c1ec5652c1602fe7468a2fa2a1",
    method: "0xa9059cbb",
    block: 212367,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010203
  },
  {
    transactionHash: "0x691ddbfe7cb9f2988c8753ee81890323ec88d91dcb4a30af505980137fbfb13e",
    method: "0xa9059cbb",
    block: 212387,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010108
  },
  {
    transactionHash: "0x103a91edc15a6de39c3db401bd092e3957b1058b79eb083a4c96cf35742e96c4",
    method: "0xa9059cbb",
    block: 212392,
    age: "11",
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010603
  },
  {
    transactionHash: "0xfe99b0e3457f41d54cad21e5d6d17f019037ed3e3d71ac3aaa4d7edac72e00a7",
    method: "0xa9059cbb",
    block: 212480,
    age: "11",
    from: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010703
  },
  {
    transactionHash: "0x3f5e380ad7be09089ebd171748bfc390d7f77e1d8c2011765e3b3b3ae2aaf5ce",
    method: "0xa9059cbb",
    block: 212600,
    age: "11",
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010224
  },
  {
    transactionHash: "0x6be5f8dbb3f1132dbdc6bbb52642685b793545ff163ecdbca59e18a68aef627c",
    method: "0xa9059cbb",
    block: 212865,
    age: "12",
    from: "0x2D1cAAFa3e777a611959e30266a51Cf34Cd74Ed9",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010205
  },
  {
    transactionHash: "0xa4410a6d90e5a4bc051f2e93ea4718a40e920575ef80ade92eb37b5617b19dd7",
    method: "0xa9059cbb",
    block: 212880,
    age: "12",
    from: "0x37E1176556c962D0B6C4439c385FAb211df6Dbf0",
    to: "0x4EcA56058CACcb6C6A1eda3F2D68Aca705805E0c",
    value: 0,
    transactionFee: 0.00010304
  },
  {
    transactionHash: "0xc1298b179b7bf06ef92c9b5604a296c56ca26856fc9489d11115bc1451379d55",
    method: "0xa9059cbb",
    block: 212911,
    age: "12",
    from: "0x203480649706602d970e823e9190A5EB3c9631c0",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010203
  },
  {
    transactionHash: "0x530cf3591b5f4f3345251c9989e6cef014b0b6cbadf1ba3d6cd2118c156675f1",
    method: "0xa9059cbb",
    block: 212923,
    age: "12",
    from: "0xBDb294121A3fe6228BE4c2625C2ccCA0027A7772",
    to: "0xB2E7a5f2d19abCda452d8f9F30cc8514F5903354",
    value: 0,
    transactionFee: 0.00010421
  },
  {
    transactionHash: "0x7589516e6c0cee8f79d83ca01a060e2c15fd9130811ea993bff821f2569698bf",
    method: "0xa9059cbb",
    block: 212930,
    age: "12",
    from: "0x37E1176556c962D0B6C4439c385FAb211df6Dbf0",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    value: 0,
    transactionFee: 0.00010720
  },
]
const dummyPendingTransactions = [
  {
    hash: '0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b',
    nonce: 2,
    blockHash: '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
    blockNumber: 3,
    transactionIndex: 0,
    from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    to: '0x6295ee1b4f6dd65047762f924ecd367c17eabf8f',
    value: '123450000000000000',
    gas: 314159,
    gasPrice: '2000000000000',
    input: '0x57cb2fc4',
    v: '0x3d',
    r: '0xaabc9ddafffb2ae0bac4107697547d22d9383667d9e97f5409dd6881ce08f13f',
    s: '0x69e43116be8f842dcd4a0b2f760043737a59534430b762317db21d9ac8c5034'
  },
  {
    hash: '0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b',
    nonce: 3,
    blockHash: '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
    blockNumber: 4,
    transactionIndex: 0,
    from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    to: '0x6295ee1b4f6dd65047762f924ecd367c17eabf8f',
    value: '123450000000000000',
    gas: 314159,
    gasPrice: '2000000000000',
    input: '0x57cb2fc4',
    v: '0x3d',
    r: '0xaabc9ddafffb2ae0bac4107697547d22d9383667d9e97f5409dd6881ce08f13f',
    s: '0x69e43116be8f842dcd4a0b2f760043737a59534430b762317db21d9ac8c5034'
  }
]

export default function TransactionsPage(txId: String) {
  /* blocks and transactions data */
  const [blockDataList, setBlockDataList] = useState<any[]>([])
  let [loadingBlocks, setLoadingBlocks] = useState(true);
  let [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactionList, setTransactioList] = useState<any[]>([])
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [totalBlock, setTotalBlock] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [dataPerPage, setDataPerPage] = useState(30)
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  // const [transactionFee, setTransactionFee] = useState(0);
  const [gasTracker, setGasTracker] = useState(0);

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [displayPages, setDisplayPages] = useState<any>([])
  const [pendingTransactions, setPendingTransactions] = useState<any>([])


  const getPendingTransactions = async (pageNumber: any) => {
    try {
      let blocks: any = [];
      let time: any
      const times = []
      let latestBlock = await web3.eth.getBlock("latest");
      // console.log("latestBlock: ", latestBlock);
      let getPendingTransactions = await web3.eth.getPendingTransactions()
      console.log("pendingTransactions: ", pendingTransactions);
      
      let prevTimestamp = latestBlock.timestamp
      let latestBlockNumber = latestBlock.number - (dataPerPage * pageNumber)
      
      setTotalBlock(latestBlockNumber);
      for (let i = latestBlockNumber; i > (latestBlockNumber - dataPerPage); --i) {
        let block = await web3.eth.getBlock(i);
        // block.baseFeePerGas = await web3.utils.toWei("1911959", 'gwei')
        time =  Number(prevTimestamp) - Number(block.timestamp)
        times.push(time)
        blocks.push(block)
      }
      setAverageBlockTime(Math.round(times.reduce((a, b) => a + b) / times.length))
      // console.log("blocks: ", blocks);

      // setBlockDataList([])
      // setBlockDataList(blocks);
      return blocks;
    } catch (error) {
      console.log("catch getBlocks error: ", error);
    }
  }

  // const subscribePendingTransactions = async () => {
  //   var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
  //     if (!error)
  //       console.log(result);
  //   })
  //   .on("data", function(transaction){
  //     console.log(transaction);
  //   });
    
  //   // unsubscribes the subscription
  //   subscription.unsubscribe(function(error, success){
  //     if(success)
  //       console.log('Successfully unsubscribed!');
  //   });
  // }

  useEffect(() => {
    getPendingTransactions(1);
    // subscribePendingTransactions();
  })
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>Pending Transactions</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="w-200">
                  <Text className='m-2'>Txn Hash</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-2'>
                    <Text className='m-2'>Method</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Nonce</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                    <Text className='m-2'>Last Seen</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Gas Limit</Text>
                </th>
                <th className="">
                  <Text className='m-2'>Gas Price</Text>
                </th>
                <th className="">
                  <Text className='m-2'>From</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-'>
                    <Text className='m-2'>To</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Amount</Text>
                </th>
              </tr>
            </thead>
            {/* <div className="border-t-1 border-gray-300 mb-3 w-full"></div> */}
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {/* {
                transactionData.map((item, i) => (
                  <tr>
                    <td className='px-6 py-3 w-1 text-left text-xs font-medium tracking-wider'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>{item.transactionHash}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1'>{item.method}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.block}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.age}h ago</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 w-[200px] text-ellipsis overflow-hidden text-blue-500'>{item.from}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1  w-[200px] truncate text-blue-500'>{item.to}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.value}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.transactionFee}</Text>
                    </td>
                  </tr>
                ))
              } */}
              {
                // dummyPendingTransactions.map((item, i ) => (
                pendingTransactions.map((item: { hash: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; input: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; nonce: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; gas: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; gasPrice: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; from: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; to: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; value: any; }, i: Key | null | undefined ) => (
                  <tr key={i}>
                    {/* <td className='px-6 py-3 w-1 text-left text-xs font-medium tracking-wider'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </td> */}
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>{item.hash}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate '>{item.input}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 '>{item.nonce}</Text>
                    </td>
                    <td className=''>
                      {/* <Text className='mb-2 mt-2 p-1'>{item.input}</Text> */}
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 '>
                        {item.gas}
                      </Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 '>
                        {item.gasPrice}
                      </Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 w-[200px] text-ellipsis overflow-hidden text-blue-500'>{item.from}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1  w-[200px] truncate text-blue-500'>{item.to}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1  w-[200px] truncate'>
                        {
                          // item.to
                          web3.utils.fromWei(Number(item.value).toString(), 'ether') + " ETH"
                        }
                        </Text>
                    </td>
                    {/* <td>
                      <Text className='mb-2 mt-2 p-1 text-blue-500'>
                        
                      </Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 w-[100px]'> */}
                        {/* {
                        (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes()) > 0 
                        ? (((60 * (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes())) - new Date(item.timeStamp * 1000).getSeconds()) + new Date().getSeconds()) + "s ago"
                        : Math.sign(new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds()) === -1
                          ? new Date(item.timeStamp * 1000).getSeconds() - new Date().getSeconds() + "s ago"
                          : new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds() + "s ago"
                        } */}
                      {/* h ago */}
                      {/* &nbsp; */}
                      {/* </Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 w-[200px] text-ellipsis overflow-hidden text-blue-500'>{item.from}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1  w-[200px] truncate text-blue-500'>{item.to}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.value !== undefined ? item.value : 0}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{ */}
                      {/* // (item.gasPrice * item.gasUsed).toString()
                      // item.transactionFee */}
                      {/* web3.utils.fromWei(((item.gas ? item.gas : 1) * Number(item.gasPrice)).toString(), 'ether')
                      }</Text>
                    </td> */}
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="flex h-screen">
            <div className="m-auto">
              <Text className='items-center'>
                There are no matching entries
              </Text>
            </div>
          </div>
        </Card>
      </Grid>
    </main>
  );
}
