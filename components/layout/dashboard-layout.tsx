// components/layout/dashboard-layout.tsx
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  header?: ReactNode;
}

export function DashboardLayout({ sidebar, children, header }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">{sidebar}</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header && (
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
            {header}
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
