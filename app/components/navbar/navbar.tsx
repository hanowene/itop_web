'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {useTranslations} from 'next-intl';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Text } from '@tremor/react';
// import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
// import Link from 'next/link';

// import usdtLogo from '../../assets/logo/usdt-logo.png';
import bethLogo from '../../assets/logo/beth-logo.png';
import Logo from '../../assets/logo/logo.png';
// import logo from './logo.jpeg'; // with import
// import "../../i18n"
import {Link} from '../../navigation';
import LocalSwitcher from '../button/local-switcher';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blockchain', href: '/playground' },
  { name: 'Token', href: '/test' },
  { name: 'NFT', href: '/test' },
  { name: 'Resources', href: '/test' },
];

const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    }
];
  
const blockhains = [
  {
    key: "transaction",
    label: "Transactions",
    href: '/blockhain/transactions',
  },
  {
    key: "pending",
    label: "Pending Transactions",
    href: '/blockhain/pending_transactions',
  },
  {
    key: "blocks",
    label: "View Blocks",
    href: '/blockhain/view_blocks',
  },
  {
    key: "forked",
    label: "Forked Blocks(Reorgs)",
    href: '/blockhain/forked_blocks',
  },
  {
    key: "uncles",
    label: "Uncles",
    href: '/blockhain/uncles',
  },
  {
    key: "accounts",
    label: "Top Accounts",
    href: '/blockhain/top_accounts',
  },
  {
    key: "contracts",
    label: "Verified Contracts",
    href: '/blockhain/verified_contracts',
  },
]

const tokens = [
  {
    key: "tokens",
    label: "Top Tokens",
    href: '/token/top_tokens',
  },
  {
    key: "holders",
    label: "Top Holders",
    href: '/token/top_holders',
  },
]

const nft = [
  {
    key: "nft",
    label: "Top NFT's",
    href: '/nft/nft',
  },
  {
    key: "holders",
    label: "Top NFT Holders",
    href: '/nft/holders',
  },
]

const resources = [
  {
    key: "resources",
    label: "Chart and Stats",
    href: '/resource/chart',
  },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={"/"}>
                    <Image
                      className="h-12 w-12 rounded-full"
                      src={Logo}
                      height={40}
                      width={40}
                      alt={`COIN avatar`}
                    />
                  </Link>
                </div>
                <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/" className='m-auto text-xl pt-4 pb-2 text-blue-500'>
                      {/* <a className='text-center m-auto text-xl pt-4 pb-2 '> */}
                        {/* {t('Geography')} */}
                        {/* </a> */}
                        Identitas Orang Papua
                  </Link>
                </Text>
                {/* <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className='m-auto text-xl pt-4 pb-2 '>{t('Home')}</a>
                </Text> */}
                <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/geography" className='text-center m-auto text-xl pt-4 pb-2 '>
                      {/* <a className='text-center m-auto text-xl pt-4 pb-2 '> */}
                        {t('Geography')}
                        {/* </a> */}
                  </Link>
                </Text>
                <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/tradition" className='text-center m-auto text-xl pt-4 pb-2 '>
                      {/* <a className='text-center m-auto text-xl pt-4 pb-2 '> */}
                        {t('Tradition')}
                        {/* </a> */}
                  </Link>
                </Text>
                <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/culture" className='text-center m-auto text-xl pt-4 pb-2 '>
                      {/* <a className='text-center m-auto text-xl pt-4 pb-2 '> */}
                        {t('Culture')}
                        {/* </a> */}
                  </Link>
                </Text>
                <Text className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/about-us" className='text-center m-auto text-xl pt-4 pb-2 '>
                      {/* <a className='text-center m-auto text-xl pt-4 pb-2 '> */}
                        {t('About Us')}
                        {/* </a> */}
                  </Link>
                </Text>
                {/* <div className="sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <LocalSwitcher />
                </div> */}
                {/* <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item, i) => (
                    i === 1
                      ?
                    <Dropdown key={i}  className='bg-slate-300 rounded'>
                          <DropdownTrigger>
                            <Button 
                              variant="bordered" 
                            >
                              Blockchain
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Dynamic Actions" items={blockhains}>
                            {(blockchain) => (
                              <DropdownItem
                                key={blockchain.key}
                                color={blockchain.key === "delete" ? "danger" : "default"}
                                className={blockchain.key === "delete" ? "text-danger" : ""}
                                href={blockchain.href}
                              >
                                {blockchain.label}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      :
                      i === 2
                      ?
                    <Dropdown key={i} className='bg-slate-300 rounded'>
                          <DropdownTrigger>
                            <Button 
                              variant="bordered" 
                            >
                              Tokens
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Dynamic Actions" items={tokens}>
                            {(token) => (
                              <DropdownItem
                                key={token.key}
                                color={token.key === "delete" ? "danger" : "default"}
                                className={token.key === "delete" ? "text-danger" : ""}
                                href={token.href}
                              >
                                {token.label}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      :
                      i === 3
                      ?
                    <Dropdown key={i} className='bg-slate-300 rounded'>
                          <DropdownTrigger>
                            <Button 
                              variant="bordered" 
                            >
                              NFTs
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Dynamic Actions" items={nft}>
                            {(itemNft) => (
                              <DropdownItem
                                key={itemNft.key}
                                color={itemNft.key === "delete" ? "danger" : "default"}
                                className={itemNft.key === "delete" ? "text-danger" : ""}
                                href={itemNft.href}
                              >
                                {itemNft.label}
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      :
                      i === 4
                      ?
                    <Dropdown key={i} className='bg-slate-300 rounded'>
                          <DropdownTrigger>
                            <Button 
                              variant="bordered" 
                            >
                              Resources
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Dynamic Actions" items={resources}>
                            {(resource) => (
                              <DropdownItem
                                key={resource.key}
                                color={'danger'}
                              >
                                <a href={resource.href}>
                                  {resource.label}
                                </a>
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      :
                      <Button 
                          variant="bordered" 
                          key={i}
                        >
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? 'border-slate-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={pathname === item.href ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Button>
                  ))}
                </div> */}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item, i) => (
                i === 1
                ?
              <Dropdown key={i} className='bg-slate-300 rounded'>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                      >
                        Blockchain
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={blockhains}>
                      {(blockchain) => (
                        <DropdownItem
                          key={blockchain.key}
                          color={blockchain.key === "delete" ? "danger" : "default"}
                          className={blockchain.key === "delete" ? "text-danger" : ""}
                          href={blockchain.href}
                        >
                          {blockchain.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                :
                i === 2
                ?
              <Dropdown key={i} className='bg-slate-300 rounded'>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                      >
                        Tokens
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={tokens}>
                      {(token) => (
                        <DropdownItem
                          key={token.key}
                          color={token.key === "delete" ? "danger" : "default"}
                          className={token.key === "delete" ? "text-danger" : ""}
                          href={token.href}
                        >
                          {token.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                :
                i === 3
                ?
              <Dropdown key={i} className='bg-slate-300 rounded'>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                      >
                        NFTs
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={nft}>
                      {(itemNft) => (
                        <DropdownItem
                          key={itemNft.key}
                          color={itemNft.key === "delete" ? "danger" : "default"}
                          className={itemNft.key === "delete" ? "text-danger" : ""}
                          href={itemNft.href}
                        >
                          {itemNft.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                :
                i === 4
                ?
                  <Dropdown key={i} className='bg-slate-300 rounded'>
                    <DropdownTrigger>
                      <Button 
                        variant="bordered" 
                      >
                        Resources
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={resources}>
                      {(resource) => (
                        <DropdownItem
                          key={resource.key}
                          // color={resource.key === "delete" ? "danger" : "default"}
                          // className={resource.key === "delete" ? "text-danger" : ""}
                          color={'danger'}
                        >
                          <a href={resource.href}>
                            {resource.label}
                          </a>
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                :
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {/* <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div> */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
