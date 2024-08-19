import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CommonProvider } from '@uc/libs/shared/components/common-provider';
import ErrorBoundary from '@uc/libs/shared/components/error-boundry';
import '@uc/assets/styles/common/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel, Tax, Housing, Shopping for Defence & Armed Forces | udChalo',
  description:
    'udChalo provides concession on multiple services like travel, tax filing, housing, and consumer electronics for Defence Personnel/Armed Forces/Paramilitary/Veterans and Dependents.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <CommonProvider>
            {children}
          </CommonProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
