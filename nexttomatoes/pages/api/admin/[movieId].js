/* eslint-disable import/no-anonymous-default-export */
const { connectToDatabase } = require("../../../lib/mongodb");
import { ObjectId } from "mongodb";

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the movies
        const { movieId } = req.query;
        let movies = await db
          .collection("movies")
          .findOne({ _id: ObjectId(movieId) });
        // return the movies
        console.log('Get Movie')
        return res.json({
          message: JSON.parse(JSON.stringify(movies)),
          success: true,  
        });
      } catch (error) {
        // return the error
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
    case "POST": {
      try {
        let { db } = await connectToDatabase();
        const { movieId, title, overview, date, language } = req.body;
        let movies = await db
          .collection("movies")
          .insertOne({ title, overview, date, language  });
        return res.json({
          message: JSON.parse(JSON.stringify(movies)),
          success: true,
        });
      } catch (error) {
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
    case "PUT": {
      try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the movies
        const { movieId } = req.query;
        console.log(req.query)
        const data = req.body;
        console.log(req.query)
        let movies = await db
          .collection("movies")
          .updateOne({ _id: ObjectId(movieId) }, {
            $set: {
              title: req.query.title,
              overview: req.query.overview              
              
             },
          });
        // return the movies  
        return res.json({message:JSON.parse(JSON.stringify(movies))});

      } catch (error) {
        // return the error
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
    case 'DELETE': {
      try {
        // connect to the database
        let { db } = await connectToDatabase();
        const { movieId } = req.query;
        // delete the movies
        await db.collection('movies').deleteOne({
            _id: ObjectId(movieId),
        });

        // return the movies
        return res.json({
          message: 'Post deleted successfully',
          success: true,
        });
      } catch (error) {
        // return the error
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
  }
  }
};

  