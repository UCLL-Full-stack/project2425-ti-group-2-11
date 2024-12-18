import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const useLanguage = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      router.push(router.pathname, router.asPath, { locale: savedLanguage });
    }
  }, []); // Empty dependency array ensures this runs only once

  const handleLanguageChange = (language: string) => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language);
      router.push(router.pathname, router.asPath, { locale: language });
    }
  };

  return { handleLanguageChange };
};

export default useLanguage;