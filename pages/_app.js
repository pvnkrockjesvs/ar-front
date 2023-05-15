import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Album release</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
