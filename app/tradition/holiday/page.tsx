import {useTranslations} from 'next-intl';
 
export default function HolidayPage() {
  const t = useTranslations();
  return <h1>{t('Holiday')}</h1>;
}