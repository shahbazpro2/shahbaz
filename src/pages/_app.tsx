import AOS from 'aos';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import 'tailwindcss/tailwind.css';
import 'aos/dist/aos.css';
import '@/common/styles/globals.css';

import Layout from '@/common/components/layouts';
import {
  firaCode,
  jakartaSans,
  onestSans,
  soraSans,
} from '@/common/styles/fonts';

import defaultSEOConfig from '../../next-seo.config';

const ProgressBar = dynamic(
  () => import('src/common/components/elements/ProgressBar'),
  { ssr: false },
);

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
    });
  }, []);

  return (
    <>
      <style jsx global>
        {`
          html {
            --jakartaSans-font: ${jakartaSans.style.fontFamily};
            --soraSans-font: ${soraSans.style.fontFamily};
            --firaCode-font: ${firaCode.style.fontFamily};
            --onestSans-font: ${onestSans.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...defaultSEOConfig} />
      <SessionProvider session={session}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Layout>
            <ProgressBar />
            <Component {...pageProps} />
          </Layout>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-neutral-800)',
                color: 'var(--color-neutral-100)',
              },
              success: {
                duration: 4000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default App;
