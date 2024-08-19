'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid, Button } from '@tremor/react';
import { useRouter } from 'next/router';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import Web3 from 'web3';
import Image from 'next/image';
// const router = useRouter();
import bethLogo from '../../assets/logo/beth-logo.png';
import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";
import axios from 'axios';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

// const data = [
//   {
//     category: 'Website',
//     stat: '10,234',
//     data: website
//   },
//   {
//     category: 'Online Shop',
//     stat: '12,543',
//     data: shop
//   },
//   {
//     category: 'Mobile App',
//     stat: '2,543',
//     data: app
//   }
// ];

const bodyHead = [
  {
    title: 'Overview',
    // stat: '8044',
  },
  {
    title: 'More Info',
    // stat: '2146300',
  },
];


export default function AddressIdPage(params: any) {
  const urlEtherscan = "https://api.etherscan.io/api"
  // const urlBeth = "http://127.0.0.1:7545"
  const urlBeth = "https://rpc.bethscan.org"
  // const wsUrlBeth = "ws://127.0.0.1:7545"
  // const wsUrlBeth = "ws://103.6.55.18:8545"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const addressId = params.params.id;
  
  const [menu1, setMenu1] = useState({
    id: 0,
    name: "Transactions",
    isClick: true,
    count: 0
  })
  const [menu2, setMenu2] = useState({
    id: 1,
    name: "Token Transfer (BET-20)",
    isClick: false,
    count: 0
  })
  const [menu3, setMenu3] = useState({
    id: 2,
    name: "Internal Transactions",
    isClick: false,
    count: 0
  })
  const [menu4, setMenu4] = useState({
    id: 2,
    name: "Coin balance history",
    isClick: false,
    count: 0
  })

  const updateMenu = (id: number) => {
    console.log("id: ", id);
    if (id === 0 ) {
      menu1.isClick = !menu1.isClick
      menu2.isClick = false
      menu3.isClick = false
    } else if (id === 1 ) {
      menu1.isClick = false
      menu2.isClick = !menu2.isClick
      menu3.isClick = false
    } else if (id === 2 ) {
      menu1.isClick = false
      menu2.isClick = false
      menu3.isClick = !menu3.isClick
    }
    setMenu1({...menu1})
    setMenu2({...menu2})
    setMenu3({...menu3})
  }
  const [isEmptyTransaction, setIsEmptyTransaction] = useState(false)

  type NativePrice = {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    value: string;
  }
  type TokenInfo = {
    exchangeAddress: string;
    exchangeName: string;
    nativePrice: NativePrice;
    pairAddress: string;
    pairTotalLiquidityUsd: string;
    possibleSpam: boolean;
    priceLastChangedAtBlock: string;
    tokenAddress: string;
    tokenDecimals: string;
    tokenLogo: string;
    tokenName: string;
    tokenSymbol: string;
    usdPrice: number;
    usdPriceFormatted: string;
    verifiedContract: string;
  }

  const tempTokenInfo: TokenInfo = {
    exchangeAddress: '',
    exchangeName: '',
    nativePrice: {
      address: '',
      decimals: 0,
      name: '',
      symbol: '',
      value: ''
    },
    pairAddress: '',
    pairTotalLiquidityUsd: '',
    possibleSpam: false,
    priceLastChangedAtBlock: '',
    tokenAddress: '',
    tokenDecimals: '',
    tokenLogo: '',
    tokenName: '',
    tokenSymbol: '',
    usdPrice: 150,
    usdPriceFormatted: '',
    verifiedContract: ''
  }

  const [isEmptyBlock, setIsEmptyBlock] = useState(false)
  const [timeBlock, setTimeBlock] = useState(new Date())
  const [addressbalance, setAddressBalance] = useState("")
  const [tokenInfo, setTokenInfo] = useState(tempTokenInfo)
  const apiMoralis = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiOTg1NTlmLWFkNGItNDJiNC1hNjk2LTEwYjYwYTVhNmNkZSIsIm9yZ0lkIjoiMzk3OTk4IiwidXNlcklkIjoiNDA4OTU5IiwidHlwZUlkIjoiYTEyNjQyYjItZWU2My00MmMzLWJiZjUtYjY1MjMxYjdlODE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0NzU3MjAsImV4cCI6NDg3NTIzNTcyMH0.qV63IWaSl3_fQqSDmFkeqmwUP0SDwOHTfvrlQbayM8E"
  const [latestBlockNumber, setLatestBlockNumber] = useState(0)
  const [gasPrice, setGasPrice] = useState(0)
  
  /* blocks and transactions data */
  const [blockDataList, setBlockDataList] = useState<any[]>([])
  let [loadingBlocks, setLoadingBlocks] = useState(true);
  let [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactionList, setTransactioList] = useState<any[]>([])
  const [totalBlock, setTotalBlock] = useState(0)
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [dataPerPage, setDataPerPage] = useState(30)
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  // const [transactionFee, setTransactionFee] = useState(0);
  const [gasTracker, setGasTracker] = useState(0);
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

  const getTransactions = async (pageNumber: any) => {
    try {      
      // console.log("pageNumber: ", pageNumber);
      let accounts = await web3.eth.getAccounts()
      let firstAccount = accounts[0]
      let checkAddress = await web3.utils.isAddress(addressId)
      let myAddr = addressId
      // let myAddr = "0x829b3909343e06442b87e108d7b9a2768ab195c6"
      // let myAddr = "0x33449a3af79A4125c57987eEaf756a20b6b50Ef5"
      // let myAddr = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"
      console.log("checkAddress: ", checkAddress);
      // let transactionCountByAddress = await web3.eth.getTransactionCount("0x829b3909343e06442b87e108d7b9a2768ab195c6")
      let transactionCountByAddress = await web3.eth.getTransactionCount(myAddr)
      console.log("transactionCountByAddress: ", transactionCountByAddress);
      
        
      // if (firstAccount) {
        setLoadingTransactions(true)
        setTransactioList([])
        let params = {
          module: "account",
          action: "txlist",
          // address: firstAccount,
          address: addressId,
          // address: myAddr,
          // address: "0x829b3909343e06442b87e108d7b9a2768ab195c6",
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
        console.log("etherResp: ", etherResp);
        let dataResult = etherResp.data.result
        // console.log("dataResult: ", dataResult);
        setTotalTransaction(dataResult.length)
        setGasTracker(3)
        let transactions = []
      let limitData = dataResult.length - (pageNumber * dataPerPage)
      // console.log("limitData: ", limitData);
      
        
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

  const getTransactionData = async () => {
    try {
      let myAddr = "0x829b3909343e06442b87e108d7b9a2768ab195c6"
      // let myAddr = "0x33449a3af79A4125c57987eEaf756a20b6b50Ef5"
      // var myAddr = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
      var currentBlock = await web3.eth.getBlockNumber();
      var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
      var bal:any = await web3.eth.getBalance(myAddr, currentBlock);
      console.log("currentBlock: ", currentBlock);
      console.log("n: ", n);
      let userBalance = web3.utils.fromWei(bal.toString(), 'ether')
      console.log("userBalance: ", userBalance);
      
      for (var i=currentBlock; i >= 0 && (n > 0 || Number(bal) > 0); --i) {
          try {
              var block = await web3.eth.getBlock(i, true);
              if (block && block.transactions) {
                  block.transactions.forEach(function(e) {
                      if (myAddr == e.from) {
                        if (e.from != e.to)
                          bal += e.value;
                          console.log(i, e.from, e.to, e.value.toString());
                          --n;
                      }
                      if (myAddr == e.to) {
                        if (e.from != e.to)
                          bal =  bal -  Number(e.value);
                          console.log(i, e.from, e.to, e.value.toString());
                      }
                  });
              }
          } catch (e) { console.error("Error in block " + i, e); }
      }
      console.log("bal: ", bal);
      
    } catch (error) {
      console.log("tryCatch getTransactionData error: ", error);
      
    }
  }

  const convertNumber = (inputNumber: String) => {
    return Number((Number(inputNumber)).toFixed(1)).toLocaleString()
  }

  const getAddressBalance = async () => {
    const balance = await web3.eth.getBalance(addressId)    
    setAddressBalance(web3.utils.fromWei(balance.toString(), 'ether'))
  }

  const getTokenInfo = async () => {
    try {
      /* use moralis api */
      await Moralis.start({
        apiKey: apiMoralis
      });
      /* token asli */
      const address = "0x829b3909343e06442b87e108d7b9a2768ab195c6"

      /* token usdt */
      // const address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      const chain = EvmChain.ETHEREUM;
      
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain,
      });
      console.log("getTokenInfo: ", response);
      // let responseData: TokenInfo = response.result;
      setTokenInfo(response.result)
      
    
      // console.log("respMoralis: ", response.toJSON());
    } catch (error) {
      // console.error("getTokenInfo: ", error);
    }
  }

  const getListData = async () => {
    try {
      // await Moralis.start({
      //   apiKey: apiMoralis
      // });

      // const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      //   "chain": "0x1",
      //   "order": "DESC",
      //   "address": addressId
      // });

      await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiOTg1NTlmLWFkNGItNDJiNC1hNjk2LTEwYjYwYTVhNmNkZSIsIm9yZ0lkIjoiMzk3OTk4IiwidXNlcklkIjoiNDA4OTU5IiwidHlwZUlkIjoiYTEyNjQyYjItZWU2My00MmMzLWJiZjUtYjY1MjMxYjdlODE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0NzU3MjAsImV4cCI6NDg3NTIzNTcyMH0.qV63IWaSl3_fQqSDmFkeqmwUP0SDwOHTfvrlQbayM8E"
      });

      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        "chain": "0x1",
        "order": "DESC",
        "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
      });
      console.log("getListData: ", response);
    } catch (error) {
      console.log("tryCatch error getListData: ", error);
    }
  }
  
  const getLatestBlockNumber = async () => {
    try {
      let latestBlockNumber = await web3.eth.getBlock("latest");
      let latest = latestBlockNumber.number
      setLatestBlockNumber(latest)
      
    } catch (error) {
      console.log("catch getLatestBlockNumber error: ", error);
    }
  }

  const getGasPrice = async () => {
    try {
      let resultGasPrice = await web3.eth.getGasPrice();
      setLatestBlockNumber(Number(resultGasPrice))
      
    } catch (error) {
      console.log("catch getGasPrice error: ", error);
    }
  }
  
  useEffect(() => {
    getAddressBalance()
    getLatestBlockNumber()
    getGasPrice()
    getTokenInfo()
    // getTransactions(1)
    // getTransactionData()
    // getListData()
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Flex className='flex-row w-full flex justify-start'>
        <Text className='text-xl items-center ustify-stretch text-neutral-950'>
          Address &nbsp;
        </Text>
        <Text className='text-gray-700 truncate'>
          {addressId}
        </Text>
      </Flex>
      <div className="border-t-2 border-gray-300 mb-4"></div>
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        <Card key={1}>
          <div className='flex-col flex-1' >
            <Title className='text-gray-600 h-1/3 mb-6'>Overview</Title>
            <div className='mb-4'>
              <Text className='text-gray-600 h-1/3'>BETH BALANCE</Text>
              <Flex className='flex-row justify-start'>
                <Image
                  className="h-6 w-6 rounded-full row-span-1"
                  src={bethLogo}
                  height={20}
                  width={20}
                  alt={`COIN avatar`}
                />
              <Text className='text-gray-600 h-1/3'>
                {addressbalance !== "" ? addressbalance : 0} BETH
              </Text>
              </Flex>
            </div>
            <div className=''>
              <Text className='text-gray-600 h-1/3'>BETH VALUE</Text>
              <Flex className='justify-start'>
                <Text>$ &nbsp; </Text>
                <Text>
                  {
                    tokenInfo !== undefined
                    ?
                    tokenInfo.usdPrice
                    :
                    150
                  }
                </Text>
              </Flex>
            </div>
          </div>
        </Card>
        <Card key={2}>
          <div className='flex-col flex-1' >
            <Title className='text-gray-600 h-1/3 mb-6'>More Info</Title>
            <div className='mb-4'>
              <Text className='text-gray-600 h-1/3'>LAST BLOCK UPDATE</Text>
              <Flex className='flex-row justify-start'>
              <Text className='text-blue-500 h-1/3'>
                {latestBlockNumber}
              </Text>
              </Flex>
            </div>
            <div className=''>
              <Text className='text-gray-600 h-1/3'>GAS USED</Text>
              <Flex className='justify-start'>
                <Text>
                  { gasPrice }
                </Text>
              </Flex>
            </div>
          </div>
        </Card>
      </Grid>
      <Flex className='flex sm:flex-row flex-col mt-4 gap-1'>
        <Button 
          className={"rounded-md sm:w-64 w-full h-8 mr-2"+ (menu1.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(0)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
          {/* <Text className={'flex items-center justify-center '+ (menu1.isClick === true) ? "text-zinc-100" : "text-black"}> */}
            {menu1.name}
          </Text>
        </Button>
        <Button 
          className={"rounded-md sm:w-64 w-full h-8 mr-2 "+ (menu2.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(1)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
            {menu2.name}
          </Text>
        </Button>
        <Button 
          className={"rounded-md sm:w-64 w-full h-8 mr-2 "+ (menu3.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(2)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
            {menu3.name}
          </Text>
        </Button>
        <Button 
          className={"rounded-md sm:w-64 w-full h-8 mr-2 "+ (menu4.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(3)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
            {menu4.name}
          </Text>
        </Button>
        {/* <Button 
          className={"rounded-md w-32 h-8 mr-2 "+ (menu3.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            updateMenu(2)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
            {menu3.name}
          </Text>
        </Button> */}
      </Flex>

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
