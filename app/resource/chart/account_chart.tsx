'use client';

import { Card, AreaChart, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const data = [
  {
    Month: 'Jan 24',
    Sales: 2890,
  },
  {
    Month: 'Feb 24',
    Sales: 1890,
  },
];

const listChart = [
  {
    id: 0,
    name: "Accounts growth",
  },
  {
    id: 1,
    name: "Active accounts",
  },
  {
    id: 2,
    name: "New accounts",
  },
]

type AccountGrowthList = []

type AccountGrowth = {
  no: number;
  address: string;
  nameTag: string;
  balance: string;
  transactionTotal: number;
}
export default function AccountChart() {
  const urlEtherscan = "https://api.etherscan.io/api"
  const urlBeth = "https://rpc.bethscan.org"
  const web3 = new Web3(Web3.givenProvider || urlBeth);
  const [accountList, setAccountList] = useState<AccountGrowthList[]>([])
  const [accountGrowth, setAccountGrowth] = useState<any[]>([])
  const [activeAccount, setActiveAccount] = useState<any[]>([])
  const [newAccount, setNewAccount] = useState<any[]>([])

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
      // let accounts = await web3.eth.getAccounts()
      let accounts = ["0x829b3909343e06442b87e108d7b9a2768ab195c6","0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8"]
      let collectAccounts:any = []


      for (let i = 0; i < accounts.length; ++i) {
        let account: AccountGrowth = {
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
      
      console.log("collectAccounts: ", collectAccounts);
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
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      <Card className="mt-8">
        <Title>Accounts growth</Title>
        {/* <Text>Accounts growth</Text> */}
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-2"
        >
          <AreaChart
            className="mt-4 h-80"
            data={data}
            categories={['Sales']}
            index="Month"
            colors={['indigo']}
            valueFormatter={(number: number) =>
              `$ ${Intl.NumberFormat('us').format(number).toString()}`
            }
            yAxisWidth={60}
          />
        </Flex>
      </Card>
    </Grid>
    // <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
    //   {listChart.map((item, i) => (
    //     <Card key={i}>
    //       <Title>{item.name}</Title>
    //       <Flex
    //         justifyContent="start"
    //         alignItems="baseline"
    //         className="space-x-2"
    //       >
    //         <Metric>{item.stat}</Metric>
    //         <AreaChart
    //           className="mt-4 h-80"
    //           data={data}
    //           categories={['Sales']}
    //           index="Month"
    //           colors={['indigo']}
    //           valueFormatter={(number: number) =>
    //             `$ ${Intl.NumberFormat('us').format(number).toString()}`
    //           }
    //           yAxisWidth={60}
    //         />
    //         <Text>Total views</Text>
    //       </Flex>
    //       <Flex className="mt-6">
    //         <Text>Pages</Text>
    //         <Text className="text-right">Views</Text>
    //       </Flex>
    //       <BarList
    //         data={item.data}
    //         valueFormatter={(number: number) =>
    //           Intl.NumberFormat('us').format(number).toString()
    //         }
    //         className="mt-2"
    //       />
    //     </Card>
    //   ))}
    // </Grid>

    // <Card className="mt-8">
    //   <Text>Account</Text>
    //   <AreaChart
    //     className="mt-4 h-80"
    //     data={data}
    //     categories={['Sales']}
    //     index="Month"
    //     colors={['indigo']}
    //     valueFormatter={(number: number) =>
    //       `$ ${Intl.NumberFormat('us').format(number).toString()}`
    //     }
    //     yAxisWidth={60}
    //   />
    // </Card>
  );
}
