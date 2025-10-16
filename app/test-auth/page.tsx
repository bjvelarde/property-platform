// app/test-auth/page.tsx
export default function TestAuth() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
            <div className="space-y-4">
                <a
                    href="/api/auth/signin"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Test Sign In
                </a>
                <div>
                    <a
                        href="/api/debug-env"
                        className="text-blue-600 underline"
                        target="_blank"
                    >
                        Check Environment Variables
                    </a>
                </div>
            </div>
        </div>
    );
}