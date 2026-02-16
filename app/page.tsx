import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting...',
};

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/soglab/ko" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.location.href = '/soglab/ko';
          `,
        }} />
      </head>
      <body>
        <p>Redirecting to <a href="/soglab/ko">/soglab/ko</a>...</p>
      </body>
    </html>
  );
}
