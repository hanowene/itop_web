import {useTranslations} from 'next-intl';
 
export default function CulturePage() {
  const t = useTranslations();
  return <h1>{t('Culture')}</h1>;
}