import { Header } from '@/components/layout/header';
import { AuthProvider } from '@/components/providers/auth-provider';
import { TRPCProvider } from '@/components/providers/trpc-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}