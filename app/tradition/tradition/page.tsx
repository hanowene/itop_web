import {useTranslations} from 'next-intl';
 
export default function TraditionSubPage() {
  const t = useTranslations();
  return <h1>{t('Tradition')}</h1>;
}