import {useTranslations} from 'next-intl';
 
export default function ToolsPage() {
  const t = useTranslations();
  return <h1>{t('Tools')}</h1>;
}