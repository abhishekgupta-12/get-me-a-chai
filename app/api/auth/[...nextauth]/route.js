import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider === "github") {
        await connectDb()
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
        }
      }
      return true
    },

    async session({ session }) {
      await connectDb()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser?.username || session.user.name
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
