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
  // console.log("params: ", params);
  // console.log("params.searchParams: ", params.searchParams);
  const props = params.searchParams.object !== undefined ? JSON.parse(params.searchParams.object) : ""
  
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
  const txId = params.params.id;
  
  const [menu1, setMenu1] = useState({
    id: 0,
    name: "Overview",
    isClick: true,
    count: 0
  })
  const [menu2, setMenu2] = useState({
    id: 0,
    name: "Logs",
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
  const [timeTransaction, setTimeTransaction] = useState("")

  function getTimeDifference(timestamp: number) {
    let result = ""    
    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Calculate the difference in milliseconds
    const difference = currentTimestamp - timestamp;

    // Check the difference in terms of seconds, minutes, and hours
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (typeof timeStamp === "number") {
      if (difference < 60 * 1000) { // Less than 1 minute
          // console.log(`Difference: ${seconds} seconds`);
          result = `${seconds}s ago`
      } else if (difference < 60 * 60 * 1000) { // Less than 1 hour
          // console.log(`Difference: ${minutes} minutes`);
          result = `${minutes}m ago`
      } else if (difference < 24 * 60 * 60 * 1000) { // Less than 1 day
          // console.log(`Difference: ${hours} hours`);
          result = `${hours}h ago`
        } else {
          // console.log("Difference is more than 1 day.");
          result = `${days}d ago`
      }
    } else {
      result = "-"
    }
    return result
  }

  const getTransactionDetail = async () => {
    const respTransaction = await web3.eth.getTransaction(txId)
    // const respTransaction = await web3.eth.getTransaction("0x48372d2eb2698e04d61f746f42623e73531d36b8610a558725fa27a7cf69a6b1")
    // console.log("respTransaction: ", respTransaction);
    if (respTransaction !== null && respTransaction !== undefined) {
      // respTransaction.value = web3.utils.toWei(respTransaction.value, 'ether')
      respTransaction.value = (Number(respTransaction.value)/1000000000000).toString()
      setTransactionDetail(respTransaction);
      // let dummyTimestamp = 1722151607
      // console.log("dummyTimestamp: ", new Date(dummyTimestamp));
      // setTimeTransaction((getTimeDifference(dummyTimestamp)).toString())

      setTimeTransaction((getTimeDifference(Number(props.timeStamp))).toString())
      setIsEmptyTransaction(true)
    }
  }
  
  // const updateMenu = (index: any) => {
  //   console.log("index: ", index);
  //   // for (let i = 0; i < optionMenus.length; ++i) {
  //   //   if (i === index) {
  //   //     console.log("optionMenus[i] before: ", optionMenus[i]);
  //   //     optionMenus[i].isClick = !optionMenus[i].isClick
  //   //     optionMenus[i].count = optionMenus[i].count + 1
  //   //     const updatedMenu = optionMenus.filter((item) => item.id !== index)
  //   //     console.log("optionMenus[i] after: ", optionMenus[i]);
  //   //   } else {
  //   //     optionMenus[i].isClick = false
  //   //   }
  //   // }
  //   optionMenus.map((item, i) => {
  //     if (i === index) {
  //       optionMenus[i].isClick = !optionMenus[i].isClick
  //     } else {
  //       optionMenus[i].isClick = false
  //     }
  //   })
  //   setOptionMenus([])
  //   console.log("optionMenus: ", optionMenus);
  //   setOptionMenus(optionMenus)
  //   console.log("optionMenus: ", optionMenus);
  // }
  // const setFirstMenu = () => {
  //   if (optionMenus.length === 0) {
  //     setOptionMenus([
  //       {
  //         name: "Overview",
  //         isClick: true,
  //         count: 0
  //       },
  //       {
  //         name: "Logs",
  //         isClick: false,
  //         count: 0
  //       },
  //       {
  //         name: "State",
  //         isClick: false,
  //         count: 0
  //       },
  //     ])
  //   }
  // }
  
  useEffect(() => {
    // loadBlocks()
    getTransactionDetail()
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4'>Transaction Details</Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      <div className='flex flex-row overflow-x-auto'>
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
          {/* <Text className={'flex items-center justify-center '+ (menu2.isClick === true) ? "text-zinc-100" : "text-black"}> */}
            {menu2.name}
          </Text>
        </Button>
        <Button 
          className={"rounded-md w-32 h-8 mr-2 "+ (menu3.isClick === true ? "active:bg-violet-700 focus:outline-none" : "bg-white-500")} 
          onClick={() => {
            // updateMenu(i)
            updateMenu(2)
          }}
        >
          <Text className={"flex items-center justify-center text-neutral-950"}>
          {/* <Text className={'flex items-center justify-center '+ (menu3.isClick === true) ? "text-zinc-100" : "text-black"}> */}
            {menu3.name}
          </Text>
        </Button>
      </div>
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
          {
            isEmptyTransaction === true
            ?
            <><Flex className='mb-3'>
                <div className="col-span-1 w-1/3">
                  Transaction Hash:
                </div>
                <div className="col-span-2 w-2/3">
                  {transactionDetail.hash !== null ? transactionDetail.hash : ""}
                </div>
                {/* </div> */}
              </Flex><Flex className='mb-3'>
                  {/* <div className="grid grid-cols-3 grid-flow-col gap-2"> */}
                  <div className="col-span-1 w-1/3">
                    Status:
                  </div>
                  <div className="col-span-2 w-2/3">
                    Success
                  </div>
                  {/* </div> */}
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Block:
                  </div>
                  <div className="col-span-2 w-2/3">
                    {transactionDetail.blockNumber !== null ? transactionDetail.blockNumber : ""}
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Timestamp:
                  </div>
                  <div className="col-span-2 w-2/3">
                    {/* 6d ago (Jun 20 2024 18:50:19 PM (+07:00 UTC)) Confirmed within {'<='} 5 secs */}
                    {timeTransaction}
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Method:
                  </div>
                  <div className="col-span-2 w-2/3">
                    transfer
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Sponsored:
                  </div>
                  <div className="col-span-2 w-2/3">

                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    From:
                  </div>
                  <div className="col-span-2 w-2/3">
                    {transactionDetail.from !== null ? transactionDetail.from : ""}
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Interacted With (To):
                  </div>
                  <div className="col-span-2 w-2/3">
                    {transactionDetail.to !== null ? transactionDetail.to : ""}
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    BET-20 Tokens transferred
                  </div>
                  <div className="col-span-2 w-2/3">
                    2008034
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Value:
                  </div>
                  <div className="col-span-2 w-2/3">
                    {/* 0 BETH ($0) */}
                    {transactionDetail.value !== null ? (Number(transactionDetail.value)/1000000).toString() : ""} BETH
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Transaction fee:
                  </div>
                  <div className="col-span-2 w-2/3">
                    {/* 0.000106173 BETH ($0.0106173) */}
                    {transactionDetail.gasPrice !== null ? transactionDetail.gasPrice : ""}
                  </div>
                </Flex><Flex className='mb-3'>
                  <div className="col-span-1 w-1/3">
                    Gas price
                  </div>
                  <div className="col-span-2 w-2/3">
                    {/* 3 Gwei (0.000000003 BETH) */}
                    {transactionDetail.gas !== null ? transactionDetail.gas : ""}
                  </div>
                </Flex></>
            : 
            <><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Transaction Hash:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex>
            <Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Status:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Block:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Timestamp:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Method:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Sponsored:
              </div>
              <div className="col-span-2 w-2/3">

              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                From:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Interacted With (To):
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                BET-20 Tokens transferred
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Value:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Transaction fee:
              </div>
              <div className="col-span-2 w-2/3">
              </div>
            </Flex><Flex className='mb-3'>
              <div className="col-span-1 w-1/3">
                Gas price
              </div>
              <div className="col-span-2 w-2/3">
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
