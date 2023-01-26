import NextAuth from 'next-auth';
import CredentialProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },
    // pages: {
    //     signIn: 'pages/auth/signin'
    // },
    //Specify Provider
    providers: [
        CredentialProvider({
            async authorize(credentials) {
                //Connect to DB
                const client = await MongoClient.connect(
                    "mongodb+srv://francois:w4NLgB4r2LMfk4p@showtime.gen4dj7.mongodb.net/Tomatoes?retryWrites=true&w=majority"
                );
                //Get all the users
                const users = await client.db().collection('users');
                //Find user with the email  
                const result = await users.findOne({
                    email: credentials.email,
                });
                //Not found - send error res
                if (!result) {
                    client.close();
                    throw new Error('No user found with the email');
                }
                //Check hased password with DB password
                const checkPassword = await compare(credentials.passowrd, result.passowrd);
                //Incorrect password - send response
                if (!checkPassword) {
                    client.close();
                    throw new Error('Password doesnt match');
                }
                //Else send success response
                client.close();
                return { email: result.email };
            },
        }),
    ],
    // secret: process.env.NEXTAUTH_SECRET
    

});

