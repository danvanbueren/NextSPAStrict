'use client'

import { SPARouterProvider } from '../context/spaRouter';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SPARouterProvider>
          {children}
        </SPARouterProvider>
      </body>
    </html>
  );
}
