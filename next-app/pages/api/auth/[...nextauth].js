import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { User } from '../../../models/User'
import dbConnect from '../../../utils/dbConnect'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        await dbConnect()

        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error('No user found')
        }

        const isValid = await user.comparePassword(credentials.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return Promise.resolve(user)
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user._id
      }
      return token
    },
    async session(session, token) {
      session.userId = token.id
      return session
    }
  }
})