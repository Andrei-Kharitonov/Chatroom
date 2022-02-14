import type { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../client/components/header/MainLayout';
import { Provider } from "react-redux";
import { store } from "../client/store/store";
import '../client/styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Chatroom</title>
      </Head>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}