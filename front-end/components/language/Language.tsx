import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const { t } = useTranslation();

  const handleLanguageChange = (event: { target: { value: string } }) => {
    // get new locale from event and push it to the router
    const newLocale = event.target.value;
    router.push(
      {
        pathname,
        query,
      },
      asPath,
      { locale: newLocale }
    );
  };

  return (
    <div>
      <label htmlFor="language" className="text-black justify-start">
        {t('language')}
      </label>
      <select
        id="language"
        className="ml-2 p-1 rounded-lg"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default Language;
