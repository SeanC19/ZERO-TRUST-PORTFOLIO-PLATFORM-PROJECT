import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

const handler = NextAuth({
  providers: [
    CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID!,
        clientSecret: process.env.COGNITO_CLIENT_SECRET || "",
        issuer: process.env.COGNITO_ISSUER!,
    }), 
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string | undefined
        token.idToken = account.id_token as string | undefined
      }
      return token
    },
    async session({ session, token }) {
      // Session already knows these types from next-auth.d.ts
      session.accessToken = token.accessToken as string | undefined
      session.idToken = token.idToken as string | undefined
      return session
    },
  },
})

export { handler as GET, handler as POST }