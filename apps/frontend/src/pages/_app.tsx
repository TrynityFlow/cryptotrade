import { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default CustomApp;
