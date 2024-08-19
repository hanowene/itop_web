'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid, Button } from '@tremor/react';
import { useRouter } from 'next/router';
import Chart from '../chart';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import Web3 from 'web3';
// const router = useRouter();

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
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default function TransactionId(params: any) {

  const urlEtherscan = "https://api.etherscan.io/api"
  // const urlBeth = "http://127.0.0.1:7545"
  const urlBeth = "https://rpc.bethscan.org"
  // const wsUrlBeth = "ws://127.0.0.1:7545"
  // const wsUrlBeth = "ws://103.6.55.18:8545"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const tempTransactionDetail: Transaction = {
    hash: "",
    nonce: 0,
    blockHash: "",
    blockNumber: 0,
    transactionIndex: 0,
    from: "",
    to: "",
    value: "",
    gasPrice: "",
    gas: 0,
    input: ""
  }
  type Transaction = {
    hash: string;
    nonce: number;
    blockHash: string | null;
    blockNumber: number | null;
    transactionIndex: number | null;
    from: string;
    to: string | null;
    value: string;
    gasPrice: string;
    gas: number;
    input: string;
  }
  const [transactionDetail, setTransactionDetail] = useState(tempTransactionDetail)
  const blockId = params.params.id;
  const blockNumber = params.params.id;
  
  const [menu1, setMenu1] = useState({
    id: 0,
    name: "Overview",
    isClick: true,
    count: 0
  })
  const [menu2, setMenu2] = useState({
    id: 0,
    name: "Transactions",
    isClick: false,
    count: 0
  })
  const [menu3, setMenu3] = useState({
    id: 0,
    name: "State",
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

  const getTransactionDetail = async () => {
    const respTransaction = await web3.eth.getTransaction(blockId)
    // const respTransaction = await web3.eth.getTransaction("0x48372d2eb2698e04d61f746f42623e73531d36b8610a558725fa27a7cf69a6b1")
    // console.log("respTransaction: ", respTransaction);
    if (respTransaction !== null && respTransaction !== undefined) {
      setTransactionDetail(respTransaction);
      setIsEmptyTransaction(true)
    }
  }

  type BlockHeader = {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionRoot: string;
    stateRoot: string;
    receiptRoot: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number | string | Date;
    transactions: String[],
    difficulty: String,
    totalDifficulty: String,
    size: number
  }

  const blockData: BlockHeader = {
    number: 0,
    hash: "",
    parentHash: "",
    nonce: "",
    sha3Uncles: "",
    logsBloom: "",
    transactionRoot: "",
    stateRoot: "",
    receiptRoot: "",
    miner: "",
    extraData: "",
    gasLimit: 0,
    gasUsed: 0,
    timestamp: "",
    transactions: [],
    difficulty: "",
    totalDifficulty: "",
    size: 0
  }
  const [blockDetail, setBlockDetail] = useState(blockData)
  const [isEmptyBlock, setIsEmptyBlock] = useState(false)
  const [timeBlock, setTimeBlock] = useState(new Date())

  const getBlockDetail = async () => {
    const respBlock = await web3.eth.getBlock(blockNumber)
    // console.log("respBlock: ", respBlock);
    if (respBlock !== null && respBlock !== undefined) {
      setTimeBlock(new Date(respBlock.timestamp));
      setBlockDetail(respBlock)
      setIsEmptyBlock(true)
      }
    // console.log("blockDetail: ", blockDetail);
    // console.log("timeBlock: ", timeBlock);
  }
  
  const convertNumber = (inputNumber: String) => {
    return Number((Number(inputNumber)).toFixed(1)).toLocaleString()
  }
  
  
  useEffect(() => {
    // getTransactionDetail()
    getBlockDetail()
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Flex className='flex-row w-full flex justify-start mb-1'>
        <Text className='text-xl text-neutral-950 items-center ustify-stretch'>Block &nbsp;</Text>
        <Text className='items-center ustify-stretch'># {blockId}</Text>
      </Flex>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <div className='flex flex-row'>
        <Button 
          className={"rounded-md w-32 h-8 mr-2 "+ (menu1.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
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
          className={"rounded-md w-32 h-8 mr-2 "+ (menu2.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(1)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
            {menu2.name}
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
      </div>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          {
            isEmptyBlock === true
            ?
            <><Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Block Height:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.number !== null ? blockDetail.number : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Timestamp:
                </div>
                <div className="col-span-2 w-2/3">
                  {/* 6d ago (Jun 20 2024 18:50:19 PM (+07:00 UTC)) Confirmed within {'<='} 5 secs */}
                  {/* {blockDetail.timestamp !== null ? new Date(blockDetail.timestamp).toString : ""} */}
                  {timeBlock !== null ? timeBlock.toString() : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Transactions:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.transactions.length} transactions in this block
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Mined by:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.miner !== null ? blockDetail.miner : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Difficulty:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.difficulty !== null ? blockDetail.difficulty : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Total difficulty:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.totalDifficulty !== null ? blockDetail.totalDifficulty : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Size:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.size !== null ? blockDetail.size : ""} bytes
                  {/* 609 bytes */}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Gas used:
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.gasUsed !== null ? blockDetail.gasUsed : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Gas limit
                </div>
                <div className="col-span-2 w-2/3">
                  {blockDetail.gasLimit !== null ? blockDetail.gasLimit : ""}
                </div>
              </Flex>
              <Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Burnt fees:
                </div>
                <div className="col-span-2 w-2/3">
                  0 BETH
                </div>
              </Flex></>
            : 
            <><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Block Height:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Timestamp:
              </div>
              <div className="col-span-2 w-2/3">
              
              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Transactions:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Mined by:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Difficulty:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Total difficulty:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Size:
              </div>
              <div className="col-span-2 w-2/3">

                {/* 609 bytes */}
              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Gas used:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Gas limit
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Burnt fees:
              </div>
              <div className="col-span-2 w-2/3">
                0 BETH
              </div>
            </Flex></>
          }
        </Card>
      </Grid>
      {/* <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <Chart /> */}
    </main>
  );
}
