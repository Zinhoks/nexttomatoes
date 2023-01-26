import { ObjectId, Decimal128 } from "bson";
import {Schema, models, model} from "mongoose";

const movieSchema = new Schema ({
    _id:ObjectId,
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Decimal128,
    poster_path:String,
    release_date: String,
    title: String,
    vote_average: Decimal128,
    vote_count: String,
})

const Movies = models.movies || model("movies", movieSchema)
export default Movies;


