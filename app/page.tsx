import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting...',
};

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/ko" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.location.href = '/ko';
          `,
        }} />
      </head>
      <body>
        <p>Redirecting to <a href="/ko">/ko</a>...</p>
      </body>
    </html>
  );
}
