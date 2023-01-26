import React, { useState } from "react";
import axios from "axios";
import { accountService } from "../../_service/account_service";
import stylos from "./Commentmovie.module.css";

const Commentmovie = (props) => {
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movie_id = JSON.parse(JSON.stringify(props.resultos.id));
    const user_id = accountService.getToken();
    const username = accountService.getUsername();

    const data = { rating, content, movie_id, user_id, username };
    try {
      await axios.post("/api/comments/comment", data);
      alert("Comment submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting comment. Please try again later.");
    }
    window.location.reload(false);
  };

  return (
    <div className={stylos.commentFormContainer}>
      <form onSubmit={handleSubmit}>
        <span className={stylos.pContainer}>
          <p className={stylos.para}>Post your review here !</p>
        </span>
        <div className={stylos.itemContainer}>
          <label id={stylos.labelRatingContainer}>
            Rating:
            <input
              id={stylos.noteFilm}
              type="number"
              min="1"
              max="5"
              placeholder="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
        </div>
        <div className={stylos.itemContainer}>
          <label>
            <textarea
              id={stylos.textareaComment}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here"
            />
          </label>
        </div>
        <button className={stylos.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Commentmovie;
