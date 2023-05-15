import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from './Header'

function Home() {
  return (
    <div>
      <Head>
        <title>Album Release - Home</title>
      </Head>
      <Header />
    </div>
  );
}

export default Home;
