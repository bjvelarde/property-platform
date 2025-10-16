// app/api/debug-env/route.ts
export async function GET() {
    const env = {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
    };

    return Response.json(env);
}