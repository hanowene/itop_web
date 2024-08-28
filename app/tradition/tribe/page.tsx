import {useTranslations} from 'next-intl';
 
export default function TribePage() {
  const t = useTranslations();
  return <h1>{t('Tribe')}</h1>;
}