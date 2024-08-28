import {useTranslations} from 'next-intl';
 
export default function HousePage() {
  const t = useTranslations();
  return <h1>{t('House')}</h1>;
}