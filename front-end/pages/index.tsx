import Navbar from "@/components/header/navbar";
import Main from "@/components/main/main";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Bazaar</title>
        <meta name="description" content="User Bazaar - Your one-stop shop for amazing products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-512-white.svg" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <Navbar />
        </header>
        <main className="flex-grow">
          <Main />
        </main>
      </div>
    </>
  );
};

export default Home;

