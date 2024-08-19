'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state/store';
import { updateLanguage } from '../../redux/update/updateLanguage'

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
//   const language = useSelector((state: RootState) => state.changeLanguage.language)
//   const dispatch = useDispatch()

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    console.log("nextLocale: ", nextLocale);
    // updateLanguage(nextLocale)
    // startTransition(() => {
    //   router.replace(`/${nextLocale}`);
    // });
  };
  return (
    <label className='border-2 rounded'>
      <p className='sr-only'>change language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value='id'>Indonesian</option>
      </select>
    </label>
  );
}