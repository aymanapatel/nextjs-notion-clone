import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


export default (req, res) => NextAuth(req, res, {

    session: {
        // Default is DB Session
        // Using JWT here
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },

    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // can add other Providers sich as Goole, Okta .etc
    ],

    /**
     * Database: 
     * Uses TypeORM under the hood for ORMapping. 
     *Provides Userand other table/collection automagically.
     */
    database: process.env.DATABASE_URL,
    pages: {
        signIn: `signIn`
    }
})
