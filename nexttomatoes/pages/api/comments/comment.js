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
        const { commentId } = req.query;
        let comments = await db.collection("comments").find({}).toArray();
        // return the movies
        // console.log("Get Comment");
        // console.log("c les coms", comments);
        return res.json({
          message: JSON.parse(JSON.stringify(comments)),
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
        const { user_id, username, movie_id, rating, content } = req.body;
        let comments = await db
          .collection("comments")
          .insertOne({ user_id, username, movie_id, rating, content });
        // console.log("Get Comment");
        return res.json({
          message: JSON.parse(JSON.stringify(comments)),
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
        await db.collection("comments").deleteOne({
          _id: new ObjectId(req.body),
        });

        return res.json({
          message: "Comment deleted successfully",
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
