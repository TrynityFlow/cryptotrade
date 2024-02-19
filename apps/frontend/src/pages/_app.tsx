import { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Noto_Sans as FontSans } from 'next/font/google';
import { Nav } from '../components/layout';
import { cn } from '@cryptotrade/ui-components';
import {NextUIProvider} from "@nextui-org/react";

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
      <Head>
        <title>CryptoTrade</title>
      </Head>
      <style global jsx>
        {`
          html {
            font-family: ${fontSans.style.fontFamily};
          }
        `}
      </style>
      <span
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Nav />
        <main className={`app`}>
          <Component {...pageProps} />
        </main>
      </span>
      <ReactQueryDevtools />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
