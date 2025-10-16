// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // Use the exact pattern from NextAuth docs
// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     callbacks: {
//         async session({ session, token, user }) {
//             // Return session without modifications for now
//             return session;
//         },
//     },
// });
export { auth, signIn, signOut, handlers } from './auth-mock';