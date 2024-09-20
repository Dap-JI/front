import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/globals.css';
import QueryProvider from '@/src/utils/QueryProvider';
import FooterBar from '../components/common/footerBar';
import Toast from '../components/common/toast';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Dap Ji';
const APP_DEFAULT_TITLE = 'Dap Ji';
const APP_TITLE_TEMPLATE = '%s - Dap Ji';
const APP_DESCRIPTION = 'Dap Ji';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  //이거 url바꾸기
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icon/icon.png',
        width: 1200,
        height: 630,
        alt: 'Dap Ji',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icon/icon.png',
        alt: 'Dap Ji',
      },
    ],
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'rgb(247, 244, 244)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* <!-- Open Graph 메타 태그 --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Dap Ji - 당신의 클라이밍 영상을 공유해보세요!"
        />
        <meta
          property="og:description"
          content="Dap Ji - 클라이밍 정답지를 찾아보고 공유해보세요"
        />
        <meta property="og:image" content="/icon/icon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://climbdapji.kr" />
        <meta property="og:site_name" content="Dap Ji" />

        {/* <!-- Twitter 메타 태그 --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dap Ji - 당신의 클라이밍 영상을 공유해보세요!"
        />
        <meta
          name="twitter:description"
          content="Dap Ji - Y클라이밍 정답지를 찾아보고 공유해보세요"
        />
        <meta name="twitter:image" content="/icon/icon.png" />
        <meta name="twitter:image:alt" content="Dap Ji" />

        {/* 파비콘 */}
        <link rel="icon" href="/icon/icon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <Toast />
          {children}
          <FooterBar />
        </QueryProvider>
      </body>
    </html>
  );
}
