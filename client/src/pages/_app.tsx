import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../components/header/MainLayout';
import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chatroom</title>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}