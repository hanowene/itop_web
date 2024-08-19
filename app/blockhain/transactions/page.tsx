'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from '../chart';
import axios from 'axios';
import { CSSProperties, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import Web3 from 'web3';
import ClipLoader from 'react-spinners/ClipLoader';

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
    stat: '0',
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

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "light-green",
};

export default function TransactionsPage(txId: String) {
  /* blocks and transactions data */
  const [blockDataList, setBlockDataList] = useState<any[]>([])
  let [loadingBlocks, setLoadingBlocks] = useState(true);
  let [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactionList, setTransactioList] = useState<any[]>([])
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const bethServer = "https://bethscan.org:4010"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [totalBlock, setTotalBlock] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [dataPerPage, setDataPerPage] = useState(30)
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  // const [transactionFee, setTransactionFee] = useState(0);
  const [gasTracker, setGasTracker] = useState("0");
  const [spinnerColor, setColor] = useState("#00688b");

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [displayPages, setDisplayPages] = useState<any>([])
  
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
    getTransactions(pageNumber);
  };

  const configPagination = async () => {
    let latestBlock = await web3.eth.getBlock("latest");
    let totalBlocks = latestBlock.number
    const tempTotalPage = Math.ceil(totalBlocks / dataPerPage);  
    setTotalPages(tempTotalPage)
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const maxPagesToShow = 5;
    const lastIndex = Math.min(currentPage + maxPagesToShow - 1, totalPages);
    const firstIndex = Math.max(lastIndex - maxPagesToShow + 1, 1);
    let tempPageNumbers = pageNumbers.slice(firstIndex - 1, lastIndex)
    setDisplayPages(tempPageNumbers) 
  }

  // const getTransanctions = async (pageNumber: any) => {
  //   try {      
  //     let blocks: any = [];
  //     let time: any
  //     const times = []
  //     let latestBlock = await web3.eth.getBlock("latest");
  //     // console.log("latestBlock: ", latestBlock);
  //     let prevTimestamp = latestBlock.timestamp
  //     let latestBlockNumber = latestBlock.number - (dataPerPage * pageNumber)
  //     setTotalBlock(latestBlockNumber);
  //     for (let i = latestBlockNumber; i > (latestBlockNumber - dataPerPage); --i) {
  //       let block = await web3.eth.getBlock(i);
  //       // block.baseFeePerGas = await web3.utils.toWei("1911959", 'gwei')
  //       time =  Number(prevTimestamp) - Number(block.timestamp)
  //       times.push(time)
  //       blocks.push(block)
  //     }
  //     setAverageBlockTime(Math.round(times.reduce((a, b) => a + b) / times.length))
  //     console.log("blocks: ", blocks);
  //     setBlockDataList([])
  //     setBlockDataList(blocks);
  //     return blocks;
  //   } catch (error) {
  //     console.log("catch getBlocks error: ", error);
  //   }
  // }

  
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

  function convertToWei (param: any) {
    let result = web3.utils.toWei(param, 'gwei')
    return result;
  }

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
      // console.log("blocks: ", blocks);
      // setBlockDataList([])
      // setBlockDataList(blocks);
      return blocks;
    } catch (error) {
      console.log("catch getBlocks error: ", error);
    }
  }

  const getTransactions = async (pageNumber: any) => {
    try {      
      let myAddr = "0x829b3909343e06442b87e108d7b9a2768ab195c6"
      let accounts = await web3.eth.getAccounts()
      var currentBlock = await web3.eth.getBlockNumber();
      var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
      setTotalTransaction(n)
      let firstAccount = accounts[0]
      // if (firstAccount) {
        setLoadingTransactions(true)
        setTransactioList([])
        let params = {
          module: "account",
          action: "txlist",
          // address: firstAccount,
          address: "0x829b3909343e06442b87e108d7b9a2768ab195c6",
          // address: "0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8",
          // address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
          startblock: "0",
          endBlock: "99999999999999",
          page: 1,
          offset: 0,
          // sort: "desc",
          sort: "asc",
          apiKey: "173EA7S7EPZEWEGZX78GNER9KAKX42E3U3"
        }
        const etherResp = await axios.get(urlEtherscan, {params:params})
        // console.log("etherResp: ", etherResp);
        let dataResult = etherResp.data.result
        // console.log("dataResult: ", dataResult);
        // setTotalTransaction(dataResult.length)
        // setGasTracker(3)
        let transactions = []
      let limitData = dataResult.length - (pageNumber * dataPerPage)
        
        if (dataResult !== undefined && dataResult.length > 0) {
          // for (let i = 0; i < dataResult.length; i++) {
        for (let i = limitData; i > limitData-30; i--) {
  
            // if (i < 6) {            
            // var balance = await web3.eth.getBalance(dataResult[i].from);
            // var gasPrice = await web3.eth.getGasPrice(); // estimate the gas price
            // var transactionObject = {
            //   from: dataResult[i].from,
            //   to: dataResult[i].to,
            //   gasPrice: dataResult[i].gasPrice,
            // }
            // var gasLimit: any = await web3.eth.estimateGas(transactionObject); // estimate the gas limit for this transaction
            // var transactionFee = dataResult[i].gasPrice * gasLimit;
            const gasUsed = (dataResult[i].gasUsed !== undefined ? dataResult[i].gasUsed : 1)
            const gasPrice = (dataResult[i].gasPrice !== undefined ? dataResult[i].gasPrice : 1)
            const transactionFee = gasUsed * gasPrice;
            dataResult[i].transactionFee = web3.utils.fromWei(((dataResult[i].gasUsed ? dataResult[i].gasUsed : 1) * dataResult[i].gasPrice).toString(), 'ether')
            // dataResult[i].transactionFee = 1
            // dataResult[i].value ?  dataResult[i].value =  web3.utils.fromWei(dataResult[i].value.toString(), 'ether') : dataResult[i].value = 1
            dataResult[i].value = web3.utils.fromWei(dataResult[i].value.toString(), 'ether')
            transactions.push(dataResult[i])
            // }
          }        
        }        
        // console.log("transactions: ", transactions);
        setTransactioList(transactions);
        setLoadingTransactions(false)
      // } else {
        // setTransactioList([]);
        // setLoadingTransactions(false)
      // }
      // console.log("transactionList: ", transactionList);
    } catch (error) {
      console.log("catch error getTransaction: ", error);
      
    }
  }

  useEffect(() => {
    // loadBlocks()
    configPagination();
    getTransactions(1);
    getBlocks(1);
    // getAverageGasUsed()

  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>Transactions</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {data.map((item, i) => (
          <Card key={item.category}>
            <Title className='text-gray-600'>{item.category}</Title>
            <Text className='text-gray-600'>{
              i === 0
              ?
              Intl.NumberFormat('us').format(Number(totalTransaction)).toString()
              :
              i === 1
              ?
              Intl.NumberFormat('us').format(Number(totalBlock)).toString()
              :
              i === 2
              ?
              Intl.NumberFormat('us').format(Number(averageBlockTime)).toString()
              :
              i === 3
              ?
              // Intl.NumberFormat('us').format(gasTracker).toString()
              gasTracker
              :
              Intl.NumberFormat('us').format(Number(item.stat)).toString()
          }</Text>
          </Card>
        ))}
      </Grid>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          {/* <Flex className='row overflow-x-auto'>
            <div className='p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <Text>Txn Hash</Text>
            <div className='grid grid-rows-1 grid-flow-col gap-2'>
              <Text className=''>Method</Text>
              <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </div>
            <Text>Block</Text>
            <div className='grid grid-rows-1 grid-flow-col gap-'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              <Text className=''>Age</Text>
            </div>
            <Text>From</Text>
            <Text>To</Text>
            <Text>Value</Text>
            <div className='grid grid-rows-1 grid-flow-col gap-'>
              <Text className=''>Txn Fee</Text>
              <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </div>
          </Flex> */}
          {/* {
            transactionData.map((item, i) => (
              <Flex className='row  overflow-x-auto'>
                <div className='grid grid-rows-1 p-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <Text className='grid grid-rows-1 p-1 truncate'>{item.transactionHash}</Text>
                <Text className='grid grid-rows-1 p-1'>{item.method}</Text>
                <Text className='grid grid-rows-1 p-1'>{item.block}</Text>
                <Text className='grid grid-rows-1 p-1'>{item.age}h ago</Text>
                <Text className='grid grid-rows-1 p-1 truncate'>{item.from}</Text>
                <Text className='grid grid-rows-1 p-1 truncate'>{item.to}</Text>
                <Text className='grid grid-rows-1 p-1'>{item.value}</Text>
                <Text className='grid grid-rows-1 p-1'>{item.transactionFee}</Text>
              </Flex>
            ))
          } */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="px-6 py-3 w-1 text-left text-xs font-medium tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </th>
                <th className="w-200">
                  <Text className=''>Txn Hash</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-2'>
                    <Text className=''>Method</Text>
                    <div className=''>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                      </svg>
                    </div>
                  </div>
                </th>
                <th className="">
                  <Text>Block</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    <Text className=''>Age</Text>
                  </div>
                </th>
                <th className="">
                  <Text>From</Text>
                </th>
                <th className="">
                  <Text>To</Text>
                </th>
                <th className="">
                  <Text>Value</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-'>
                    <Text className=''>Txn Fee</Text>
                    <div className=''>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                      </svg>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {
                loadingTransactions === false
                ?
                transactionList.map((item: {
                  value: ReactNode;
                  gasUsed: any;
                  gasPrice: any;
                  timeStamp: number;
                  blockNumber: ReactNode;
                  methodId: ReactNode; blockHash: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; method: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; block: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; age: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; from: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; to: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; 
                  // value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; 
                  transactionFee: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; 
}, i: Key | null | undefined) => (
                  <tr key={i}>
                    <td className='px-6 py-3 w-1 text-left text-xs font-medium tracking-wider'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 w-[200px] truncate text-blue-500'>{item.blockHash}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1'>{item.methodId}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 text-blue-500'>{item.blockNumber}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 w-[100px]'>{
                      // item.age

                      (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes()) > 0 
                      ? (((60 * (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes())) - new Date(item.timeStamp * 1000).getSeconds()) + new Date().getSeconds()) + "s ago"
                      : Math.sign(new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds()) === -1
                        ? new Date(item.timeStamp * 1000).getSeconds() - new Date().getSeconds() + "s ago"
                        : new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds() + "s ago"
                      }
                      {/* h ago */}
                      </Text>
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
                      <Text className='mb-2 mt-2 p-1'>{
                      // (item.gasPrice * item.gasUsed).toString()
                      item.transactionFee
                      }</Text>
                    </td>
                  </tr>
                ))
                :
                <></>
                // <ClipLoader
                //   color={spinnerColor}
                //   loading={loadingTransactions}
                //   cssOverride={override}
                //   size={120}
                //   aria-label="Loading Spinner"
                //   data-testid="loader"
                // />
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
