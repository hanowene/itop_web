import {useTranslations} from 'next-intl';
import Image from 'next/image';
import PapuaMap from '../assets/maps/papua-map3.png';
 
export default function HomePage() {
  const t = useTranslations();
  return (
    <div>
        <div className='text-center m-2'>
            <a className='text-2xl'>{t('Geography')}</a>
        </div>
        <div className="mt-4 mb-4 grid justify-items-center">
            <Image
                className="w-1/2"
                src={PapuaMap}
                // height={40}
                // width={40}
                alt={`Peta Papua`}
            />
        </div>
    </div>
  );
}