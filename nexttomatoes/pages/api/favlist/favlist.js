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
        let favoris = await db.collection("favlist").find({}).toArray();
        // return the movies
        return res.json({
          message: JSON.parse(JSON.stringify(favoris)),
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
        const { user_id, movie_id, movie_title } = req.body;
        let favoris = await db
          .collection("favlist")
          .insertOne({ user_id, movie_id, movie_title });
        console.log("Get favlist");
        return res.json({
          message: JSON.parse(JSON.stringify(favoris)),
          success: true,
        });
      } catch (error) {
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
    case "DELETE": {
      try {
        let { db } = await connectToDatabase();
        await db.collection("favlist").deleteOne({
          _id: new ObjectId(req.body),
        });

        return res.json({
          message: "fav deleted successfully",
          success: true,
        });
      } catch (error) {
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
  }
};
