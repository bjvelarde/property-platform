// lib/auth-mock.ts
// Temporary mock authentication until NextAuth issue is resolved

interface MockSession {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
    expires: string;
}

export const auth = async (): Promise<MockSession> => {
    return {
        user: null, // Change to null for now to avoid type issues
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
};

export const signIn = async (provider?: string) => {
    console.log(`Mock sign in with ${provider || 'unknown provider'}`);
    return { ok: true, error: null };
};

export const signOut = async () => {
    console.log('Mock sign out');
    return { ok: true };
};

export const handlers = {
    GET: (req: Request) => {
        return new Response(JSON.stringify({ user: null }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    },
    POST: (req: Request) => {
        return new Response(JSON.stringify({ user: null }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    },
};