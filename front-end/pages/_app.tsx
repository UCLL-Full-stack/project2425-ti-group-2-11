import useLanguage from "@/components/language/useLanguage";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
    useLanguage();
    return <Component {...pageProps} />;
}
export default appWithTranslation(App);