'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from '../chart';
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

const accountData = [
  {
    no: 1,
    address: "0x1420dd8B0198287120A66f5CEce8b7D8F490ddC3",
    nameTag: "-",
    balance: "989,999,998.999811",
    transactionTotal: 1,
  },
  {
    no: 2,
    address: "0x7f050F82E816e54f09922Da8638FA1F884C940a7",
    nameTag: "-",
    balance: "9,999,823.42028612",
    transactionTotal: 13,
  },
  {
    no: 3,
    address: "0x0DD040EE1d3dcb51e5b522A69F3F045E2A21E121",
    nameTag: "-",
    balance: "10.21722",
    transactionTotal: 0,
  },
  {
    no: 4,
    address: "0x3B8a6af961325EaB32D186a63f05c1FeD28C5802",
    nameTag: "-",
    balance: "10",
    transactionTotal: 2,
  },
  {
    no: 5,
    address: "0x15fffF1eE6E1b42F68Ef23a5D0504fFD0dDadF3e",
    nameTag: "-",
    balance: "8.23",
    transactionTotal: 1,
  },
  {
    no: 6,
    address: "0xe6f1995fEf7c9D9376BD6b75f205B4504733032F",
    nameTag: "-",
    balance: "8.099937",
    transactionTotal: 1,
  },
  {
    no: 7,
    address: "0x18437ca9e8519390b9844f83516A490ce605b456",
    nameTag: "-",
    balance: "8",
    transactionTotal: 8,
  },
  {
    no: 8,
    address: "0x4A2d1Ba22F5c861B34C788bBe01cD2bBF86D1d3f",
    nameTag: "-",
    balance: "7.54",
    transactionTotal: 1,
  },
  {
    no: 9,
    address: "0x162CF1f93B45Ae7Fa947399e7B44180322794d94",
    nameTag: "-",
    balance: "6.573",
    transactionTotal: 1,
  },
  {
    no: 10,
    address: "0x21975b89C6b6739ef04dD28c0bdffF1f6c69A949",
    nameTag: "-",
    balance: "6.52113",
    transactionTotal: 1,
  },
]

export default function TopAccountPage(txId: String) {
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [accountList, setAccountList] = useState<any[]>([])

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
    // getTransactions(pageNumber);
  };


  const getAccountList = async (pageNumber: any) => {
    try {
      let accounts = await web3.eth.getAccounts()
      // let accounts = ["0x829b3909343e06442b87e108d7b9a2768ab195c6","0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8"]
      let collectAccounts:any = []


      for (let i = 0; i < accounts.length; ++i) {
        let account = {
          no: 0,
          address: "",
          nameTag: "-",
          balance: "",
          transactionTotal: 0
        }
        // console.log("account before: ", account);

        // console.log("account.balance before: ", account.balance );
        // console.log("account.transactionTotal before: ", account.transactionTotal );
        account.no = i+1
        account.address = accounts[i]
        account.balance = await web3.eth.getBalance(accounts[i])
        account.transactionTotal = await web3.eth.getTransactionCount(accounts[i])
        
        // console.log("account after: ", account);
        collectAccounts.push(account)        
        // console.log("collectAccounts before: ", collectAccounts);
        // resetAccountModel()
        // console.log("collectAccounts after: ", collectAccounts);
        
      }
      // console.log("collectAccounts: ", collectAccounts);
      
      setAccountList(collectAccounts)
    } catch (error) {
      console.log("catch getAccountList error: ", error);
    }
  }

  useEffect(() => {
    // loadBlocks()
    getAccountList(1);
  }, []);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>
        Top Accounts by BETH Balance 
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="">
                  <Text>#</Text>
                </th>
                <th className="">
                  <Text>Address</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <Text className=''>Name Tag</Text>
                </th>
                <th className=" tracking-wider w-200">
                  <Text className=''>Balance</Text>
                </th>
                <th className="w-200">
                  <Text className=''>Txn Count</Text>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 mb-2">
              {
                accountList.length > 0
                ?
                accountList.map((item, i) => (
                  <tr key={i}>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1'>{item.no}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 text-blue-500 truncate'>{item.address}</Text>
                    </td>
                    <td className=''>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>{item.nameTag}</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1 sm:w-100'>{item.balance} BETH</Text>
                    </td>
                    <td>
                      <Text className='mb-2 mt-2 p-1'>{item.transactionTotal}</Text>
                    </td>
                  </tr>
                ))
                : 
                <></>
              }
            </tbody>
          </table>
          {/* Pagination */}
          {/* <div className="flex justify-center mt-4">
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
          </div> */}
        </Card>
      </Grid>
    </main>
  );
}
