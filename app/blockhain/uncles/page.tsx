'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { useEffect, useState } from 'react';
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

export default function UnclesPage(txId: String) {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const totalPages = Math.ceil(data.length / dataPerPage);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [totalBlock, setTotalBlock] = useState(0)
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  const [blockDataList, setBlockDataList] = useState<any[]>([])

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const getUncles = async (pageNumber: any) => {
    try {      
      let blocks: any = [];
      let time: any
      const times = []
      let latestBlock = await web3.eth.getBlock("latest");
      console.log("latestBlock.number: ", latestBlock.number);
      
      let uncles = await web3.eth.getUncle(latestBlock.number, 0)
      console.log("uncles: ", uncles);
      
      // console.log("latestBlock: ", latestBlock);
      
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
      console.log("blocks: ", blocks);

      setBlockDataList([])
      setBlockDataList(blocks);
      // return blocks;
    } catch (error) {
      console.log("catch getUncles error: ", error);
    }
  }


  useEffect(() => {
    getUncles(1);
  })

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>Uncles</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="w-200">
                  <Text className='m-2'>Block Height</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-2'>
                    <Text className='m-2'>Uncle Number</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Age</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                    <Text className='m-2'>Miner</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Reward</Text>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
            </tbody>
          </table>
          <div className="flex h-screen">
            <div className="m-auto">
              <Text className='items-center'>
                There are no matching entries
              </Text>
            </div>
          </div>
          {/* Pagination */}
          {/* <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className="mx-1 px-3 py-1 bg-gray-200">
                {i + 1}
              </button>
            ))}
          </div> */}
        </Card>
      </Grid>
    </main>
  );
}
