import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '678537079664-342s4irhi4htuc0gg7sqjbeqjc7i4k22.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },
};
export default NextAuth(authOptions);
