import Navbar from "@/components/header/navbar";
import ProfileOverview from "@/components/profile/profileOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <><main className="overscroll-y-contain">
      <Navbar type="profile"/>
      <ProfileOverview />
    </main>
    </>
  );
};
export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", [`common`])),
      },
  };
}
export default Profile;
