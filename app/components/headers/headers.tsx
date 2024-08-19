'use client';

import { Fragment, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' },
  { name: 'Test', href: '/test' }
];

const headersObj = {
  price: 150,
  gas: 2.5
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Headers() {
  const pathname = usePathname();
  const coinName = "COIN";

  const [tokenInfo, setTokenInfo] = useState({})
  const apiMoralis = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiOTg1NTlmLWFkNGItNDJiNC1hNjk2LTEwYjYwYTVhNmNkZSIsIm9yZ0lkIjoiMzk3OTk4IiwidXNlcklkIjoiNDA4OTU5IiwidHlwZUlkIjoiYTEyNjQyYjItZWU2My00MmMzLWJiZjUtYjY1MjMxYjdlODE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0NzU3MjAsImV4cCI6NDg3NTIzNTcyMH0.qV63IWaSl3_fQqSDmFkeqmwUP0SDwOHTfvrlQbayM8E"

  const getTokenInfo = async () => {
    try {
      /* etherscan pro plan */
      // const urlEtherscan = "https://api.etherscan.io/api"
      // let params = {
      //   module: "token",
      //   action: "tokeninfo",
      //   address: "0xf755dCA2A9560E3d76D55e0C912f18e5541F64C8",
      //   apiKey: "173EA7S7EPZEWEGZX78GNER9KAKX42E3U3"
      // }
      // const etherResp = await axios.get(urlEtherscan, {params:params})
      // console.log("etherResp: "), etherResp;
      // let dataResult = etherResp.data.result
      // if (dataResult !== null) {
      //   setTokenInfo(dataResult)
      // }
      // console.log("tokenInfo: ", tokenInfo);      
      
      /* use moralis api */
      await Moralis.start({
        apiKey: apiMoralis
      });
      /* token asli */
      // const address = "0x829b3909343e06442b87e108d7b9a2768ab195c6"

      /* token usdt */
      const address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      const chain = EvmChain.ETHEREUM;
      // console.log("chain: ", chain);
      
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain,
      });
      // console.log("response: ", response);
      
    
      // console.log("respMoralis: ", response.toJSON());
    } catch (error) {
      // console.error("getTokenInfo: ", error);
    }
  }

  useEffect(() => {
    // getTokenInfo()
  }, [])

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="hidden sm:-my-px sm:mt-4 sm:ml-6 sm:flex sm:space-x-8">
                  <a className={classNames(
                    'border-slate-500 text-gray-900',
                    // 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}>
                    {coinName} Price: $ {headersObj.price}
                  </a>
                  <a className={classNames(
                    'border-slate-500 text-gray-900',
                    // 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}>
                    Gas: {headersObj.gas} Gwei
                    </a>
                </div>
              </div>
            </div>
        </div>
        </>
      )}
    </Disclosure>
  );
}
