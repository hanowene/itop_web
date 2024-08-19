import { cookies } from 'next/headers';
import Image from 'next/image';
import DismissButton from '../../dismiss-button';
import usdtLogo from '../../assets/logo/usdt-logo.png'

export default function BoxHome2a() {
  const cookieStore = cookies();
  const isHidden = cookieStore.get('template-banner-hidden');

  return (
    <div className='w-full'>
      <div className="flex mb-4">
        <div className="rounded-[14px] w-1/2 h-1/2 bg-gray-50 border border-gray-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 p-4">
          {/* <div className="w-1/2 rounded-[14px] w-1/2 h-1/2 bg-gray-50 border border-gray-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 px-5 h-12 rounded-2xl w-1/2 sm:w-[800] h-40 sm:h-[160px] p-0.5 z-10 bottom-10 left-0 right-0 sm:flex-row p-1"> */}
          <div className="px-5">
            <div className='sm:flex-col'>
              <div className='border-slate-500 text-gray-900 inline-flex px-1 pt-1 border-b-2 text-sm font-medium'>
                <a>Latest Blocks</a>
              </div>
              <div className="grid grid-rows-1 grid-flow-col">
                <div className="row-span-2 ...">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <div className="col-span-3 ...">
                    <a className='sm:mt-4'>
                      78201
                  </a>
                </div>
                <div className="col-span-3 ...">
                    <a className='sm:mt-4'>
                      1s ago
                  </a>
                </div>
                <div className="col-span-3 ...">
                    <a className='sm:mt-4'>
                      Validated By {"<NAME>"}
                  </a>
                </div>
                <div className="col-span-3">
                  <a className='sm:mt-4'>
                    0 txns
                  </a>
                </div>
                <div className="row-span-1">
                  <a
                    className="rounded-[14px] border border-black-400 text-black text-[13px] font-mono hover:bg-gray-700 transition-all rounded-md w-[100px] h-10 flex items-center justify-center"
                    // href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    0 COIN
                  </a>
                </div>
              </div>
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-start-2 row-span-2 ...">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  <a className='sm:mt-4'>
                    COIN PRICE
                  </a>
                </div>
                <div className="row-end-3 row-span-2 ...">
                  <a className='sm:mt-4'>
                    COIN PRICE
                  </a>
                </div>
                <div className="row-start-1 row-end-4 ...">
                  03
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="w-1/2 bg-gray-500 h-12">

        </div>
      </div>
    </div>
  );
}
