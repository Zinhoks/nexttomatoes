import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { name, email, password } = req.body;
        //Validate
        if (!email || !email.includes('@') || !password || !name) {
            res.status(422).json({ message: 'Information invalide' });
            return;
        }
        //Connect with database
        const client = await MongoClient.connect(
            "mongodb+srv://francois:w4NLgB4r2LMfk4p@showtime.gen4dj7.mongodb.net/Tomatoes?retryWrites=true&w=majority");
        const db = client.db();
        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            email,
            name,
            statu : 0,
            password: await hash(password, 12),
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;

