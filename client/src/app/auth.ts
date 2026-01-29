import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth"
 

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session:{
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        token.githubId = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.githubId); 
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});  
