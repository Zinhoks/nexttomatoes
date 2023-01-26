import { Schema, models, model } from "mongoose";

const favlistSchema = new Schema({
  user_id: String,
  movie_id: String,
  movie_title: String,
});

const Favlist = models.favlist || model("favlist", favlistSchema);
export default Favlist;
