'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from './chart';
import AccountChart from './account_chart';
import { useState } from 'react';

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

export default function ChartAndStats() {
  const [currentMenu, setCurrentMenu] = useState(0)
  const changeMenu = (menuNumber: number) => {
    setCurrentMenu(menuNumber)
  }
  return (
    <main className="mx-auto max-w-7xl">
      <Text className='mb-4 text-xl text-neutral-950'>
        Peta Charts & Statistics
      </Text>
      <div className="border-t-2 border-gray-300 mb-3"></div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/5 text-gray-500">
        {/* <div className="w-1/4 bg-gray-800 text-white"> */}
          {/* <div className="p-4 text-2xl font-bold">Menu</div> */}
          <ul>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(0)
              }}
            >
              <div className='row flex-row'>
                <Text>Accounts</Text>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(1)
              }}
            >
              <div className='row flex-row'>
                <Text>Transactions</Text>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(2)
              }}
            >
              <div className='row flex-row'>
                <Text>Blocks</Text>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(3)
              }}
            >
              <div className='row flex-row'>
                <Text>Tokens</Text>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(4)
              }}
            >
              <div className='row flex-row'>
                <Text>Gas</Text>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer"
              onClick={() => {
                setCurrentMenu(5)
              }}
            >
              <div className='row flex-row'>
                <Text>Contracts</Text>
              </div>
            </li>
            {/* <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Accounts</li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Transactions</li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Blocks</li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Tokens</li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Gas</li>
            <li className="p-4 hover:bg-gray-400 hover:rounded hover:text-neutral-950 cursor-pointer">Contracts</li> */}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-500">Coming Soon...</h1>
          </div>
        </div>
        {/* {
          currentMenu === 0
          ?
          <AccountChart/>
          :
          <></>
        } */}
      </div>
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
