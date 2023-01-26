import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
  user_id: String,
  username: String,
  movie_id: String,
  rating: Number,
  content: String,
});

const Comments = models.comments || model("comments", commentSchema);
export default Comments;
