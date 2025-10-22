// components/layout/header.tsx - TEMPORARY MOCK UI
'use client';

import { Button } from '@/components/ui/button';

export function Header() {
  // Mock session state
  const isSignedIn = false;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PropertyPlatform</h1>
        <div>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <span>Welcome, User</span>
              <Button onClick={() => console.log('Sign out clicked')}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={() => console.log('Sign in clicked')}>Sign In (Mock)</Button>
          )}
        </div>
      </div>
    </header>
  );
}
