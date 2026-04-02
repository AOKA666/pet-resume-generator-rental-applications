import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Resume Generator',
  description: 'Create a pet resume and landlord intro note for rental applications.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
