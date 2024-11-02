import Navbar from '@/components/header/navbar';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Bazaar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-512-white.svg" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="w-full min-w-[320px] sm:min-w-0">
        {/* Add your main content here */}
      </main>
    </>
  );
}

export default Home;