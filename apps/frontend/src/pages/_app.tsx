import { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Noto_Sans as FontSans } from 'next/font/google';
import { cn } from '@cryptotrade/ui-components';
import { NextUIProvider } from '@nextui-org/react';
import { LoginContext } from '../libs/loginContext';
import { useState } from 'react';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<Request.User>();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <LoginContext.Provider value={{ user: user, updateUser: setUser }}>
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
          <main
            className={cn(
              'bg-background app min-h-screen font-sans antialiased',
              fontSans.variable,
            )}
          >
            <Component {...pageProps} />
          </main>
          <ReactQueryDevtools />
        </LoginContext.Provider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
