import ShoppingCart from "@/components/cart/ShoppingCart";
import Navbar from "@/components/header/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Cart: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {userId !== null ? (
          <ShoppingCart userId={userId} />
        ) : (
          <div>No user ID found</div>
        )}
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
export default Cart;
