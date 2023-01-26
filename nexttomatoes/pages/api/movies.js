/* eslint-disable import/no-anonymous-default-export */
const { connectToDatabase } = require("../../lib/mongodb");

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the movies
        let movies = await db
          .collection("movies")
          .find({})
          .sort({ published: -1 })
          .toArray();
        // return the movies
        console.log('Get Movies')
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
    case 'DELETE': {
      try {
        // connect to the database
        let { db } = await connectToDatabase();
        const { movieId } = req.query;
        // delete the movies
        await db.collection('movies').deleteOne({
            _id: new ObjectId(movieId),
        });

        // return the movies
        return res.json({
          message: 'Movie deleted successfully',
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

  