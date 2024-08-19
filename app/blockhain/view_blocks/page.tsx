'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from '../chart';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from "axios"

const data = [
  {
    category: 'NETWORK UTILIZATION',
    stat: 0,
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

const blockData = [
  {
    block: 212367,
    age: "1",
    transactionTotal: 0,
    feeRecipient: "0x141505dd2b003499e72c717a7cae10219a49b7c1ec5652c1602fe7468a2fa2a1",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212387,
    age: "1",
    transactionTotal: 0,
    feeRecipient: "0x691ddbfe7cb9f2988c8753ee81890323ec88d91dcb4a30af505980137fbfb13e",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212392,
    age: "1",
    transactionTotal: 0,
    feeRecipient: "0x103a91edc15a6de39c3db401bd092e3957b1058b79eb083a4c96cf35742e96c4",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212480,
    age: "1",
    transactionTotal: 0,
    feeRecipient: "0xfe99b0e3457f41d54cad21e5d6d17f019037ed3e3d71ac3aaa4d7edac72e00a7",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212600,
    age: "1",
    transactionTotal: 0,
    feeRecipient: "0x3f5e380ad7be09089ebd171748bfc390d7f77e1d8c2011765e3b3b3ae2aaf5ce",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212865,
    age: "12",
    transactionTotal: 0,
    feeRecipient: "0x6be5f8dbb3f1132dbdc6bbb52642685b793545ff163ecdbca59e18a68aef627c",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212880,
    age: "12",
    transactionTotal: 0,
    feeRecipient: "0xa4410a6d90e5a4bc051f2e93ea4718a40e920575ef80ade92eb37b5617b19dd7",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212911,
    age: "12",
    transactionTotal: 0,
    feeRecipient: "0xc1298b179b7bf06ef92c9b5604a296c56ca26856fc9489d11115bc1451379d55",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212923,
    age: "12",
    transactionTotal: 0,
    feeRecipient: "0x530cf3591b5f4f3345251c9989e6cef014b0b6cbadf1ba3d6cd2118c156675f1",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
  {
    block: 212930,
    age: "12",
    transactionTotal: 0,
    feeRecipient: "0x7589516e6c0cee8f79d83ca01a060e2c15fd9130811ea993bff821f2569698bf",
    gasUsed: 0,
    gasLimit: 14000000,
    baseFee: 0,
    reward: "0.00000",
    burntFee: "0.00000",
  },
]

export default function TransactionsPage(txId: String) {
  /* load blocks data */
  const [blockDataList, setBlockDataList] = useState<any[]>([])
  let [loadingBlocks, setLoadingBlocks] = useState(true);
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const bethServer = "https://bethscan.org:4010"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [totalBlock, setTotalBlock] = useState(0)
  const [dataPerPage, setDataPerPage] = useState(30)
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [gasTracker, setGasTracker] = useState("0");

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [displayPages, setDisplayPages] = useState<any>([])
  // const totalPages = Math.ceil(blockDataList.length / dataPerPage);  const indexOfLastData = currentPage * dataPerPage;
  
  // const indexOfFirstData = indexOfLastData - dataPerPage;
  // const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber: any) => {
    const maxPagesToShow = 5;
    const lastIndex = Math.min(pageNumber + maxPagesToShow - 1);
    const firstIndex = Math.max(lastIndex - maxPagesToShow + 1);
    const pageNumbers: number[] = [];
    for (let i = firstIndex; i <= lastIndex; i++) {
      pageNumbers.push(i);
    }

    setCurrentPage(pageNumber)
    setDisplayPages(pageNumbers);
    getBlocks(pageNumber);
    // setDisplayPages(pageNumbers.slice(firstIndex - 1, lastIndex)) 
  };
  // const pageNumbers: number[] = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }
  // const maxPagesToShow = 5;
  // const lastIndex = Math.min(currentPage + maxPagesToShow - 1, totalPages);
  // const firstIndex = Math.max(lastIndex - maxPagesToShow + 1, 1);
  // const displayPages = pageNumbers.slice(firstIndex - 1, lastIndex);

  const configPagination = async () => {
    let latestBlock = await web3.eth.getBlock("latest");
    let totalBlocks = latestBlock.number
    const tempTotalPage = Math.ceil(totalBlocks / dataPerPage);  
    
    // const totalPages = Math.ceil(totalBlocks / dataPerPage);  
    setTotalPages(tempTotalPage)
    // const indexOfLastData = currentPage * dataPerPage;
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    const maxPagesToShow = 5;
    const lastIndex = Math.min(currentPage + maxPagesToShow - 1, totalPages);
    // const firstIndex = Math.max(lastIndex - maxPagesToShow + 1, 1);
    const firstIndex = Math.max(lastIndex - maxPagesToShow + 1, 1);
    let tempPageNumbers = pageNumbers.slice(firstIndex - 1, lastIndex)
    setDisplayPages(tempPageNumbers) 
  }


  const getTotalTransaction = async () => {
    try {
      let myAddr = "0x829b3909343e06442b87e108d7b9a2768ab195c6"
      var currentBlock = await web3.eth.getBlockNumber();
      var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
      setTotalTransaction(n)
    } catch (error) {
      console.log("error: ", error);
      
    }
  }

  // const getTotalBlock = async () => {
  //   try {
  //     let blocks: any = [];
  //     let time: any
  //     const times = []
  //     let latestBlock = await web3.eth.getBlock("latest");
  //     // console.log("latestBlock: ", latestBlock);
  //     let prevTimestamp = latestBlock.timestamp
  //     let latestBlockNumber = latestBlock.number
  //     setTotalBlock(latestBlockNumber);
  //     for (let i = latestBlockNumber; i > (latestBlockNumber - dataPerPage); --i) {
  //       let block = await web3.eth.getBlock(i);
  //       // block.baseFeePerGas = await web3.utils.toWei("1911959", 'gwei')
  //       time =  Number(prevTimestamp) - Number(block.timestamp)
  //       times.push(time)
  //       blocks.push(block)
  //     }
  //     setAverageBlockTime(Math.round(times.reduce((a, b) => a + b) / times.length))
  //     // console.log("blocks: ", blocks);
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // }

  const getBlocks = async (pageNumber: any) => {
    try {      
      let blocks: any = [];
      let time: any
      const times = []
      let latestBlock = await web3.eth.getBlock("latest");
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
      
      return blocks;
    } catch (error) {
      console.log("catch getBlocks error: ", error);
    }
  }

  function convertToWei (param: any) {
    let result = web3.utils.toWei(param, 'gwei')
    return result;
  }

  const getAverageGasUsed = async () => {
    try {
      // let localhostServer = "http://0.0.0.0:4010/beth/getDailyTotalGasUsed"
      // const bethResp = await axios.get(localhostServer)
      const bethResp = await axios.get(bethServer+"/beth/getDailyTotalGasUsed")
      // console.log("bethResp: ", bethResp.data.result.data);
      setGasTracker(bethResp.data.result.data[0].gasUsed)
      // setGasTracker("3")
    } catch (e) {
      // console.log("tryCatch getAverageGasUsed: ", e);
      setGasTracker("3")
      throw e
    }
  }
  
  useEffect(() => {
    getBlocks(1);
    configPagination()
    getTotalTransaction()
    // getAverageGasUsed()
  }, [
    // blockDataList
  ]);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>Blocks</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {data.map((item, i) => (
          <Card key={item.category}>
            <Title className='text-gray-600'>{item.category}</Title>
            <Text className='text-gray-600'>{
              i === 0
              ?
              item.stat + "%"
              :
              i === 1
              ? 
              totalBlock.toString()
              // Intl.NumberFormat('us').format(Number(totalBlock)).toString()
              :
              i === 2
              ?
              averageBlockTime
              :
              gasTracker
              // Intl.NumberFormat('us').format(Number(item.stat)).toString()
          }</Text>
          </Card>
        ))}
      </Grid>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
        <Title className='mb-8 text-gray-500'>Comprehensive details on every blockchain block available here.</Title>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="">
                  <Text>Block</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <Text className=''>Age</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <Text className=''>Txn</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Fee Recipient</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Gas Used</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Gas Limit</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Base Fee</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Reward</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Burnt Fees (BETH)</Text>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {
                blockDataList.map((item, i) => (
                  <tr key={i}>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 text-blue-500'>{item.number}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1'>{
                      (new Date().getMinutes() - new Date(item.timestamp * 1000).getMinutes()) > 0 
                      ? (((60 * (new Date().getMinutes() - new Date(item.timestamp * 1000).getMinutes())) - new Date(item.timestamp * 1000).getSeconds()) + new Date().getSeconds()) + "s ago"
                      : Math.sign(new Date().getSeconds() - new Date(item.timestamp * 1000).getSeconds()) === -1
                        ? new Date(item.timestamp * 1000).getSeconds() - new Date().getSeconds() + "s ago"
                        : new Date().getSeconds() - new Date(item.timestamp * 1000).getSeconds() + "s ago"
                      }</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>{item.transactions.length}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>{item.receiptsRoot}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>{Intl.NumberFormat('us').format(Number(item.gasUsed)).toString()}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>
                        {
                          Intl.NumberFormat('us').format(Number(item.gasLimit)).toString()
                        }
                      </Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>
                        {/* {
                          convertToWei(item.baseFeePerGas).toNumber()
                        } */}
                        {
                          Math.ceil(item.baseFeePerGas)
                          ?
                          Math.ceil(item.baseFeePerGas)
                          :
                          "0"
                        }
                        &nbsp;
                        Gwei
                        </Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>{item.reward} 0.00000 BETH</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>
                        {/* {item.burntFee} */}
                        0.00000
                        </Text>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {currentPage > 1 && (
              <button onClick={() => paginate(currentPage - 1)} className="mx-1 px-3 py-1 bg-gray-200">
                Previous
              </button>
            )}
            {
              displayPages.map((page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
                <button
                  key={index}
                  onClick={() => paginate(page)} 
                  className={`mx-1 px-3 py-1 ${currentPage === page ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                  >
                  {page}
                </button>
              ))
            }
            {currentPage < totalPages && (
              <button onClick={() => paginate(currentPage + 1)} className="mx-1 px-3 py-1 bg-gray-200">
                Next
              </button>
            )}
          </div>
        </Card>
      </Grid>
    </main>
  );
}
