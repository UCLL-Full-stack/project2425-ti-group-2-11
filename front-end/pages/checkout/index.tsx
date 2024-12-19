import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Navbar from "@/components/header/navbar";
import CheckoutComponent from "@/components/checkout/checkout";
import { useRouter } from "next/router";
import { ShoppingCart } from "@/types/cartTypes";

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const cartQuery = router.query.cart;
  const userId = router.query.userId;

  let cart: ShoppingCart | undefined;
  if (typeof cartQuery === "string") {
    try {
      cart = JSON.parse(cartQuery);
    } catch (error) {
      console.error("Failed to parse cart:", error);
    }
  }
  return (
    <>
      <Head>
        <title>{t('checkout.title')}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-512-white.svg" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Navbar />
        <CheckoutComponent userId={Number(userId)} cart={cart} />
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [`common`])),
    },
  };
};

export default Checkout;