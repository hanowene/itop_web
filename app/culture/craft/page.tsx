import {useTranslations} from 'next-intl';
 
export default function CraftPage() {
  const t = useTranslations();
  return <h1>{t('Craft')}</h1>;
}