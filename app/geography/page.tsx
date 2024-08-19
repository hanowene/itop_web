import {useTranslations} from 'next-intl';
import Image from 'next/image';
import PapuaMap from '../assets/maps/papua-regions.png';
 
export default function HomePage() {
  const t = useTranslations();
  return (
    <div>
        <div className='text-center m-2'>
            <a>{t('Geography')}</a>
        </div>
        <div className=''>
            <Image
                className=""
                src={PapuaMap}
                // height={40}
                // width={40}
                alt={`COIN avatar`}
            />
        </div>
    </div>
  );
}