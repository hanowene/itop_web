import {useTranslations} from 'next-intl';
 
export default function ClothesPage() {
  const t = useTranslations();
  return <h1>{t('Traditional Clothes')}</h1>;
}