import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDB, folder, doc } from '../../../db'


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
    },
    // 1. signIn 2. session 3.jwt
    callbacks: {
        async session(session, user) {
            if (user) {
                session.user.id = user.id
            }
            return session
        },
        async jwt(tokenPayload, user, account, profile, isNewUser) {
            const { db } = await connectToDB()

            if (isNewUser) {
                const newFolder = await folder.createFolder(db, {
                    createdBy: user._id,
                    name: 'Getting Started Folder'
                })

                await doc.createDoc(db, {
                    createdBy: user._id,
                    folder: newFolder.id,
                    name: 'Start here doc',
                    content: {
                        time: 1556098174371,
                        blocks: [
                            {
                                type: 'header',
                                data: {
                                    text: 'Some default content',
                                    level: 2,
                                }
                            }
                        ],
                        version: '2.12.1'
                    }
                })
            }
        }
    }
})
