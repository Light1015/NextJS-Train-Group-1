import type { Metadata } from 'next';
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
