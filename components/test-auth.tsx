// components/test-auth.tsx - UPDATED FOR MOCK
'use client';

import { trpc } from '@/lib/trpc/client';

export function TestAuth() {
    const { data: session, isLoading, error } = trpc.auth.getSession.useQuery();

    return (
        <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Auth Test (Mock)</h3>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <pre className="text-sm">
                {JSON.stringify(session, null, 2)}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
                Note: Using mock authentication for development
            </p>
        </div>
    );
}