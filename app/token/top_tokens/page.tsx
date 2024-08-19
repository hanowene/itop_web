'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import axios from 'axios';
import { any } from 'prop-types';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, useEffect, useState } from 'react';
import Web3 from 'web3';

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

const tokenData = [
  {
    no: 1,
    token: "BillGates",
    price: "0.00",
    totalSupply: 1000000000,
    marketCap: "0.00",
    holders: 2376
  },
  {
    no: 2,
    token: "MuskyElon",
    price: "0.00",
    totalSupply: 10000000,
    marketCap: "0.00",
    holders: 2
  },
  {
    no: 3,
    token: "Theodore",
    price: "0.00",
    totalSupply: 100000000,
    marketCap: "0.00",
    holders: 2
  },
  {
    no: 4,
    token: "SirAlex",
    price: "0.00",
    totalSupply: 43000000,
    marketCap: "0.00",
    holders: 1
  },
]
type DataAccount = {
  accountAddress : string;
  transactions: any[];
  price: string;
}

export default function TopTokenPage(txId: String) {
  const [accountList, setAccountList] = useState<any>([])
  const [transactionList, setTransactioList] = useState<any>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  
  const urlEtherscan = "https://api.etherscan.io/api"
  // const urlBeth = "http://127.0.0.1:7545"
  const urlBeth = "https://rpc.bethscan.org"
  // const wsUrlBeth = "ws://127.0.0.1:7545"
  // const wsUrlBeth = "ws://103.6.55.18:8545"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  
  const getUniqueObjects = (array: any[]) => {
    const seenIds = new Set();
    return array.filter(obj => {
        if (seenIds.has(obj.from)) {
            return false;
        } else {
            seenIds.add(obj.from);
            return true;
        }
    });
};

  const getTransactions = async () => {
    try {
      let params = {
        module: "account",
        action: "txlist",
        address: "0x829b3909343e06442b87e108d7b9a2768ab195c6",
        // address: "0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8",
        // address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
        startblock: "0",
        endBlock: "99999999999999",
        page: 1,
        offset: 0,
        sort: "desc",
        apiKey: "173EA7S7EPZEWEGZX78GNER9KAKX42E3U3"
      }
      
      const etherResp = await axios.get(urlEtherscan, {params:params})
      // console.log("etherResp: ", etherResp);
      let dataResult = etherResp.data.result
      let transactions = []
      // console.log("dataResult: ", dataResult);
      let dataResult2 = getUniqueObjects(dataResult);
      let accounts: any[] = dataResult2.map((obj) => {
          let objTransactions:any = []
          let newObj = {
          accountAddress: obj.from,
          price: "0",
          // price: [],
          transactions: objTransactions
        }
        newObj.transactions.push(obj)
        return newObj
      })
      // console.log("dataResult2: ", dataResult2);
      let accountFroms: any = [];

      // Iterate through variable 2
      dataResult.forEach((obj2: {
        value: any; from: any; 
      }) => {
        // Check if object exists in variable 1 with the same id
        let existingObjIndex = dataResult2.findIndex(
            (obj1: { from: any; }) => obj1.from === obj2.from,
        );
        if (existingObjIndex === -1) {
            // If object doesn't exist in variable 1, push it
            let objTransactions:any = []
            let newObj = {
              accountAddress: obj2.from,
              price: "0",
              // price: [...obj2.value],
              transactions: objTransactions
            }
            newObj.transactions.push(obj2)
            accounts.push(newObj);
        } else {
          // accounts[existingObjIndex].price.push(obj2.value)
          accounts[existingObjIndex].transactions.push(obj2);
            // accountFroms.push(obj2)
            // If object exists in variable 1, update its value
            // dataResult[existingObjIndex] = obj2;
        }
      });
      accounts.map((item1, i) => {
        item1.transactions.map((item2: { value: any; }, ii: any) => {
          item1.price = (Number(item1.price) + Number(item2.value)).toString()
        })
        // item1.price = web3.utils.fromWei(item1.price.toString(), 'ether')
      })
      // console.log("accountFroms: ", accountFroms);
      // console.log("accounts: ", accounts);

      // console.log("transactions: ", transactions);
      // setTransactioList(transactions);
      setAccountList(accounts)
      setLoadingTransactions(false)
      
    } catch (error) {
      console.log("catch error getTransaction: ", error);
      
    }
  }

  useEffect(() => {
    // loadBlocks()
    getTransactions();

  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>
        Token Tracker (BET-20)
      </Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>
      {/* <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {data.map((item, i) => (
          <Card key={item.category}>
            <Title className='text-gray-600'>{item.category}</Title>
            <Text className='text-gray-600'>{
              i === 0
              ?
              item.stat + "%"
              :
              Intl.NumberFormat('us').format(Number(item.stat)).toString()
          }</Text>
          </Card>
        ))}
      </Grid> */}
      <Grid numItemsLg={1} className='gap-1 mt-4'>
        <Card className='flex-row w-full overflow-x-auto'>
        <Text className='mb-8 text-lg text-gray-500'>Displaying complete token contract information seamlessly.</Text>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="w-200">
                  <Text className='m-2'>#</Text>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-2'>
                    <Text className='m-2'>Token</Text>
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Price</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                    <Text className='m-2'>Total Supply</Text>
                  </div>
                </th>
                <th className="">
                  <div className='grid grid-rows-1 grid-flow-col gap-1 w-300'>
                  <Text className='m-2'>Calculating market cap</Text>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg> */}
                  </div>
                </th>
                <th className="">
                  <Text className='m-2'>Holders</Text>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {
                // accountList.map((item: any, i: string) => {
                //   <tr key={i}>
                //     <td className=''>
                //       <Text className='mb-2 mt-2 p-1 '>{i}</Text>
                //     </td>
                //     <td className=''>
                //       <Text className='mb-2 mt-2 p-1 '>{item.accountAddress}</Text>
                //     </td>
                //     <td className=''>
                //       {/* <Text className='mb-2 mt-2 p-1 '> {web3.utils.fromWei(item.price.toString(), 'ether')}</Text> */}
                //     </td>
                //     <td className=''>
                //       <Text className='mb-2 mt-2 p-1 '>tai</Text>
                //     </td>
                //     <td className=''>
                //       <Text className='mb-2 mt-2 p-1 '> </Text>
                //     </td>
                //     <td className=''>
                //       <Text className='mb-2 mt-2 p-1 '>{item.transactions.length}</Text>
                //     </td>
                //   </tr>
                // })
                loadingTransactions === false
                ?
                accountList.map((item: any, i: string) => {
                  <tr key={i}>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{i}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{item.accountAddress}</Text>
                    </td>
                    <td className=''>
                      {/* <Text className='mb-2 mt-2 p-1 '> {web3.utils.fromWei(item.price.toString(), 'ether')}</Text> */}
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '> </Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '> </Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{item.transactions.length}</Text>
                    </td>
                  </tr>
                })
                :
                <></>
              }
              {/* {
                tokenData.map((item, i) => (
                  <tr key={i}>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{item.no}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{item.token}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>${item.price}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{Intl.NumberFormat('us').format(item.totalSupply).toString()}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>${item.marketCap}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 '>{Intl.NumberFormat('us').format(item.holders).toString()}</Text>
                    </td>
                  </tr>
                ))
              } */}
            </tbody>
          </table>
        </Card>
      </Grid>
    </main>
  );
}
