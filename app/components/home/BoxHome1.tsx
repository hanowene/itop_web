'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from './chart';
import { CSSProperties, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader";
import Link from 'next/link';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "light-green",
};
// import { MetaMaskInpageProvider } from "@metamask/providers";
// import { Web3ContextInitOptions } from 'web3-core';
// import moment from 'moment';
// import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
// import Accounts from 'web3-eth-accounts';
var Accounts = require('web3-eth-accounts');

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

const data = [
  {
    category: 'Latest Blocks',
    stat: '10,234',
    data: website
  },
  {
    category: 'Latest Transactions',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

const blocks = [
  {
    block: 123000,
    transactionTime: 2,
    transactionUser: "Kakashi",
    quantity: 0,
    amount: 0
  },
  {
    block: 122980,
    transactionTime: 5,
    transactionUser: "Darth Vader",
    quantity: 0,
    amount: 0
  },
  {
    block: 123100,
    transactionTime: 7,
    transactionUser: "P!nk_Panther",
    quantity: 0,
    amount: 0
  },
  {
    block: 122920,
    transactionTime: 9,
    transactionUser: "MidDawn",
    quantity: 0,
    amount: 0
  },
  {
    block: 123113,
    transactionTime: 11,
    transactionUser: "Politicuss",
    quantity: 0,
    amount: 0
  },
  {
    block: 12276,
    transactionTime: 12,
    transactionUser: "Supermann",
    quantity: 0,
    amount: 0
  },
];

const transactions = [
  {
    smartAddress: "0xe3716ye12h23i9asajx",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
  {
    smartAddress: "0xBFFja982jlaklsassdj",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
  {
    smartAddress: "0xBCasj772ja0akansfan",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
  {
    smartAddress: "0x37asa2283aaxxx2389a",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
  {
    smartAddress: "0xJE718ashs7hGas978yn",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
  {
    smartAddress: "0x2B6onas887asfjao9y8",
    transactionTime: 4,
    from: "0xCK20A744c9BCC7D755624E693f92573E38AC308",
    to: "0x97aF2Ea414ee92B48ec7f4A7d255C8F59761729E",
    amount: 0
  },
];

// let web3: { currentProvider: string | SupportedProviders<EthExecutionAPI> | Web3ContextInitOptions<EthExecutionAPI, RegisteredSubscription> | undefined; eth: { sendTransaction: (arg0: {}) => void; }; };
// let web3: any;

export default function PlaygroundPage() {
  const [account, setAccount] = useState("")
  const [loadingAccount, setLoadingAccount] = useState(false)
  const [blockData, setBlockData] = useState({})
  const [blockDataList, setBlockDataList] = useState<any[]>([])
  const [transactionList, setTransactioList] = useState<any>([])
  const [loadingBlocks, setLoadingBlocks] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [spinnerColor, setColor] = useState("#00688b");

  // const web3 = new Web3(Web3.givenProvider || "https://rpc.bethscan.org/");
  const urlEtherscan = "https://api.etherscan.io/api"
  // const urlBeth = "http://127.0.0.1:7545"
  const urlBeth = "https://rpc.bethscan.org"
  const bethServer = "https://103.6.55.18:4010"
  const httpOptions: any = {
    headers: [
      {
        // 'Content-Security-Policy': 'upgrade-insecure-requests',
        contentSecurityPolicy: {
          'img-src': ["'self'", 'data:', 'https://rpc.bethscan.org'],
        },
        // 'Content-Type': 'Content-Security-Policy',
        // 'Content-Type': 'application/json',
        // 'Referer': '<https://qn-test.com>',
      }
    ]
  }
  const web3 = new Web3(new Web3.providers.HttpProvider(urlBeth, httpOptions));
  // const web3 = new Web3(new Web3.providers.HttpProvider(urlBeth, httpOptions));
  // const web3 = new Web3(Web3.givenProvider || "https://rpc.bethscan.org/");
  // const wsUrlBeth = "ws://127.0.0.1:7545"
  // const wsUrlBeth = "ws://103.6.55.18:8545"
  // const web3 = new Web3(Web3.givenProvider || urlBeth);
  // const accounts = new Accounts(wsUrlBeth);

  // const loadBlocks = async () => {
  //     try {
  //         console.log("streamWeb3NewBlockHeaders");
  //         const urlW3 = "ws://127.0.0.1:7545"
  //         const w3 = new Web3(urlW3)
  //         let account = await web3.eth.getAccounts()
  //         var subscriptionSyncing = w3.eth.subscribe('newBlockHeaders', (error: String, result: any) => {
  //             if (!error) {
  //                 console.log("streamWeb3NewBlockHeaders result: ", result);
  //                 return;
  //             }
  //             console.error("streamWeb3NewBlockHeaders error: ", error);
  //           })
  //           .on('connected', (subscriptionId: any) => {
  //             console.log('connected subscriptionId: ', subscriptionId)
  //           })
  //           .on('data', (log: any) => {
  //             console.log("data log: ", log);
  //           })
  //           .on("changed", (log: any) => {
  //             console.log('changed log: ', log)
  //           })
  //     } catch (error) {
  //         console.log("error: ", error);
  //     }
  // }

  const calculateTime = async (unixTimestamp: any) => {
    let currentSec: any;
    currentSec = new Date().getSeconds();
    let receivedSec = new Date(unixTimestamp * 1000).getSeconds()
    let currentMin: any;
    currentMin = new Date().getMinutes();
    let currentHour: any;
    currentHour = new Date().getHours();
    let currentDate: any;
    currentDate = new Date().getDate()
    let receivedMin = new Date(unixTimestamp * 1000).getMinutes()
    let receivedHour = new Date(unixTimestamp * 1000).getHours()
    let receivedDate = new Date(unixTimestamp * 1000).getDate()
    let test = (new Date().getMinutes() - new Date(unixTimestamp * 1000).getMinutes()) > 0 
                ? Math.sign(new Date(unixTimestamp * 1000).getSeconds() - new Date().getSeconds()) === -1
                  ? new Date(unixTimestamp * 1000).getSeconds() - new Date().getSeconds() + 60 >= 60
                    ? "1 min ago"
                    : new Date(unixTimestamp * 1000).getSeconds() - new Date().getSeconds() + 60 + "s ago"
                  // : new Date(unixTimestamp * 1000).getSeconds() - new Date().getSeconds() + 60 + "s ago"
                    // ? "1 min ago"
                  : new Date(unixTimestamp * 1000).getSeconds() - new Date().getSeconds() + "s ago"
                    // : new Date().getSeconds() - new Date(unixTimestamp * 1000).getSeconds() + 60 + "s ago"
                : new Date().getSeconds() - new Date(unixTimestamp * 1000).getSeconds() + "s ago"
    let diffTime = receivedSec - currentSec;
    return diffTime;
  }

  const getTransactions = async () => {
    try {
      let accounts = await web3.eth.getAccounts()
      // console.log("accounts: ", accounts);
      let firstAccount = accounts[0]
      // if (firstAccount) {
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
          sort: "desc",
          apiKey: "XMN5EZ3DZIQBPC9HW12FP79WQF3DRUR4UT"
          // apiKey: "173EA7S7EPZEWEGZX78GNER9KAKX42E3U3"
        }
        const etherResp = await axios.get(urlEtherscan, {params:params})
        // console.log("etherResp: ", etherResp);
        let dataResult = etherResp.data.result !== null ? etherResp.data.result : []
        let transaction = []
        if (dataResult !== undefined && dataResult.length > 0) {
          for (let i = 0; i < dataResult.length; i++) {
            if (i < 6) {
              transaction.push(dataResult[i])
            }
          }        
        }
        setTransactioList(transaction);
        setLoadingTransactions(false)
        // console.log("transactionList: ", transactionList);
      // } else {
        // setTransactioList([])
        // setLoadingTransactions(false)
      // }
    } catch (error) {
      console.log("catch error getTransaction: ", error);
      setLoadingTransactions(false)
    }
  }

  const getBlocks = async () => {
    try {
      let blocks = [];
      let transactions: any[] = [];
      let latestBlockNumber = await web3.eth.getBlock("latest");
      let latest = latestBlockNumber.number
      // let myAddr = "0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8"
      // var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
      // start getting transactions
      // let account = await web3.eth.getAccounts()
      // let account = web3.eth.defaultAccount
      // let userAccountAddress = await web3.eth.accounts;
      // let myAddr = account[0]
      // var currentBlock = await web3.eth.getBlockNumber();
      // var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
      // var bal = await web3.eth.getBalance(myAddr, currentBlock);
      // n = JSON.parse(n)
      // bal = JSON.parse(bal)
      // console.log("userAccountAddress: ", userAccountAddress);
      // console.log("n: ", n);
      // console.log("bal: ", bal);
      // console.log("account: ", account);
      // if (myAddr === undefined) {
      //   myAddr = "0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8"
      // }
      // end
      let count = 6
      for (var i = latest; i > count; i--) {
        if (count !== 0) {
          let block = await web3.eth.getBlock(i);
          // console.log("block: ", block);
          // calculateTime(block.timestamp)
          // block.timestamp = calculateTime(block.timestamp)
          

          if (block && block.transactions) {
            // console.log("block.transactions: ", block.transactions);
            
            block.transactions.forEach( async function (e: any) {
              // console.log("transaction: ", e);
              // transactions.push(e)
              let trxDetail = await web3.eth.getTransaction(e);
              // let trxDetail = await web3.eth.getTransaction(e, function(err, result) {
              //   console.log("here: ", result);
              //   if (result.value) {
              //       console.log(web3.utils.fromWei(result.value, 'ether'));
              //   }
              // });
              // console.log("trxDetail: ", trxDetail);
              transactions.push(trxDetail)
                // if (myAddr == e.from) {
                //     if (e.from != e.to)
                //         bal = bal.plus(e.value);
                //       transactions.push(e)
                //     // console.log(i, e.from, e.to, e.value.toString(10));
                //     --n;
                // }
                // if (myAddr == e.to) {
                //     if (e.from != e.to)
                //         bal = bal.minus(e.value);
                //       transactions.push(e)
                //       // console.log(i, e.from, e.to, e.value.toString(10));
                // }
            });
            setLoadingBlocks(false);
          }
          blocks.push(block)
          count--
        } else {
          break
        }
      }
      // console.log("blocks: ", blocks);
      setBlockDataList(blocks);
      // console.log("blocks: ", blocks);
      // setTransactioList(transactions);
      // console.log("transactionList: ", transactionList);
      return blocks;
    } catch (error) {
      console.log("catch getBlocks error: ", error);
      setLoadingBlocks(false);
    }
  }

  const loadWeb3 = async () => {  
    // if (window.ethereum) {
    //     console.log("window.ethereum");
    //     window.web3 = new Web3(window.ethereum);
    //     try {
    //       await ethereum.enable();
    //     } catch (error) {
    //     }
    // } else if (window.web3) {
    //   console.log("window.web3");
    //   window.web3 = new Web3(window.web3.currentProvider);
    //   web3.eth.sendTransaction({})
    // } else {
    //   console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }
  }
  
  const loadBlockchainData = async () => {
    try {
      // const web3 = window.web3
      // const accounts = await web3.eth.getAccounts()
      // return accounts
    } catch (error) {
      console.log("catch loadBlockchainData error: ", error);
    }
  }

  const [ticking, setTicking] = useState(true),
        [count, setCount] = useState(0)
  useEffect(() => {
    // loadBlocks()
    getBlocks();
    getTransactions();

    // setTimeout(() => {
    //   getTransactions();
    // }, 2000)

    // const timer = setTimeout(() => {
    //   getTransactions()
    //   ticking && setCount(count+1), 1e3
    // }, 2000)
    // return () => clearTimeout(timer)

    // Function to be called every second
    const tick = () => {
      // console.log('Function called at: ', new Date().toLocaleTimeString());
      getBlocks();
      // You can place your logic here
    };

    // Set the interval to call the function every second
    const intervalBlocks = setInterval(tick, 1000);


    // Function to be called every second
    const tickTransactions = () => {
      // console.log('Function called at: ', new Date().toLocaleTimeString());
      getTransactions();
      // You can place your logic here
    };
    const intervalTransactions = setInterval(tickTransactions, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalBlocks);
      clearInterval(intervalTransactions);
    };
  }, [
    // account,
    // blockDataList,
    // loadingAccount
  ]);
  return (
    <main className="p-4 md:p-6 mx-auto max-w-7xl">
      {/* <p>Ini Account: {loadingAccount ?  account[0] : "empty"}</p> */}
      <Grid numItemsSm={2} numItemsLg={2} className="gap-2">
        <Card key={"Latest Blocks"}>
          <Title>{"Latest Blocks"}</Title>
          {/* <div className="p-8 grid grid-flow-col sm:grid-flow-row">
            <div className="grid grid-row-4 auto-rows-fr sm:grid-cols-4 font-bold">
              <p></p>
              <p>Price</p>
              <p>Size</p>
              <p>Color</p>
            </div>
            <div className="grid grid-row-4 sm:grid-cols-4">
              <p className="font-bold">Name</p>
              <p>Text</p>
              <p>Text</p>
              <p>Text</p>
            </div>
            <div className="grid grid-row-4 sm:grid-cols-4">
              <p className="font-bold">Brand</p>
              <p>Text</p>
              <p>Text</p>
              <p>Text</p>
            </div>
          </div> */}
          {
            loadingBlocks !== true
            ?
            blockDataList.map((item, i) => (
              <Flex className="mt-6 p-1 grid grid-flow-row sm:grid-flow-col" key={i}>
                <div className="text-left lg:w-1/12 sm:mt-2 grid grid-row-1 sm:grid-cols-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <div className='pl-1 lg:w-4/12 xl:w-4/12 mt-2 grid grid-col-2'>
                  <Text className="text-left">                    
                    <a href={'/block/'+item.number} className='text-blue-500'>
                      {item.number}
                    </a>
                  </Text>
                  <Text className="text-left ">{
                    (new Date().getMinutes() - new Date(item.timestamp * 1000).getMinutes()) > 0 
                    ? (((60 * (new Date().getMinutes() - new Date(item.timestamp * 1000).getMinutes())) - new Date(item.timestamp * 1000).getSeconds()) + new Date().getSeconds()) + "s ago"
                    : new Date().getSeconds() - new Date(item.timestamp * 1000).getSeconds() + "s ago"
                  }</Text>
                </div>
                <div className='col mt-2 grid-cols-2'>
                  <Text className="w-[200px] pr-2 truncate ">Validated By &nbsp;
                    <a href={"/address/"+item.miner} className='text-blue-500'>{item.miner}</a>
                  </Text>
                  {/* <div className='sm:w-100 truncate'>
                    <Text className="lg:w-[300px] sm:w-100 truncate">Validated By &nbsp;
                      <a  className='text-blue-500 sm:w-100 truncate'>{item.miner}</a>
                    </Text>
                  </div> */}
                  <div className=''>
                    <Text className="text-left">{item.transactions.length} txns</Text>
                  </div>
                </div>
                <Text className='w-full lg:ml-2 lg:w-2/12 mt-2 grid grid-cols-1'>
                  <a
                    className="rounded-[14px] border border-black-400 text-black text-[13px] font-mono hover:bg-gray-700 transition-all rounded-md w-[100px] h-10 flex items-center justify-center"
                    target="_blank"
                    rel="noreferrer"
                    >
                    0 COIN
                  </a>
                </Text>
              </Flex>
            ))
            : 
            <ClipLoader
              color={spinnerColor}
              loading={loadingBlocks}
              cssOverride={override}
              size={120}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
          <div className='mt-6'>
            <Text className="text-center">
              <a href="/blockhain/view_blocks">
                VIEW ALL BLOCKS
              </a>
            </Text>
          </div>
        </Card>
        
        <Card key={"Latest Transactions"}>
          <Title>{"Latest Transactions"}</Title>
            {
              loadingTransactions !== true
              ? 
              transactionList.length > 0 &&  transactionList[0].blockHash !== undefined
                ?
                transactionList.map((item: {
                  timeStamp: number; blockHash: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; from: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; to: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; 
                  }, i: Key | null | undefined) => (
                  <Flex className="mt-6 p-1 grid grid-flow-row sm:grid-flow-col" key={i}>
                    <div className="text-left w-1/12">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    </div>
                    <div className='col w-3/12'>
                      <Text className="w-[200px] pr-2 truncate ">
                        <Link
                        className='text-blue-500'
                        href={{ pathname: '/tx/'+item.blockHash, query: { object: JSON.stringify({timeStamp: item.timeStamp}) } }}
                        >
                          {/* <a 
                          href={'/tx/'+item.blockHash}
                          className='text-blue-500'> */}
                            {item.blockHash}
                          {/* </a> */}
                        </Link>
                      </Text>
                      <Text className="text-left w-[200px]">{
                        (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes()) > 0 
                        ? (((60 * (new Date().getMinutes() - new Date(item.timeStamp * 1000).getMinutes())) - new Date(item.timeStamp * 1000).getSeconds()) + new Date().getSeconds()) + "s ago"
                          : Math.sign(new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds()) === -1
                            ? new Date(item.timeStamp * 1000).getSeconds() - new Date().getSeconds() + "s ago"
  
                      // ? new Date(item.timestamp * 1000).getSeconds() < new Date().getSeconds()
                      // ? Math.sign(new Date(item.timestamp * 1000).getSeconds() - new Date().getSeconds()) === -1
                      //   ? new Date(item.timestamp * 1000).getSeconds() - new Date().getSeconds() + 60 >= 60
                      //     ? "1 min ago"
                      //     : new Date(item.timestamp * 1000).getSeconds() - new Date().getSeconds() + 60 + "s ago"
                      //   : new Date(item.timestamp * 1000).getSeconds() - new Date().getSeconds() + 60 + "s ago"
                      //     // : new Date().getSeconds() - new Date(item.timestamp * 1000).getSeconds() + 60 >= 60
                      //     ? "1 min ago"
                      //     : new Date().getSeconds() - new Date(item.timestamp * 1000).getSeconds() + 60 + "s ago"
                        : new Date().getSeconds() - new Date(item.timeStamp * 1000).getSeconds() + "s ago"
                      }</Text>
                    </div>
                    <div className='col w-6/12'>
                      <Text className="w-[200px] pr-2 truncate ">From &nbsp;
                        <a href={"/address/"+item.from} className='text-blue-500'>{item.from}</a>
                      </Text>
                      <Text className="w-[200px] pr-2 truncate ">To &nbsp;
                        <a href={"/address/"+item.to} className='text-blue-500'>{item.to}</a>
                      </Text>
                    </div>
                    <Text className='w-2/12'>
                      <a
                        className="rounded-[14px] border border-black-400 text-black text-[13px] font-mono hover:bg-gray-700 transition-all rounded-md w-[100px] h-10 flex items-center justify-center"
                        target="_blank"
                        rel="noreferrer"
                        >
                        0 COIN
                      </a>
                    </Text>
                  {/* <BarList
                    data={item.transactionUser}
                    valueFormatter={(number: number) =>
                      Intl.NumberFormat('us').format(number).toString()
                    }
                    className="mt-2"
                  /> */}
                  </Flex>
                  ))
                : 
                <div></div>
              :
              <ClipLoader
                color={spinnerColor}
                loading={loadingTransactions}
                cssOverride={override}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
          }
          <div className='mt-6'>
            <Text className="text-center">
              <a href="/blockhain/transactions">
                VIEW ALL TRANSACTIONS
              </a>
            </Text>
          </div>
          </Card>
        </Grid>
      {/* <Chart /> */}
    </main>
  );
}
