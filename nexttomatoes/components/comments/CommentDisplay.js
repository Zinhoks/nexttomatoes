import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CommentDisplay.module.css";

const CommentDisplay = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comments/comment`
        );
        setComments(res.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    getComments();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <p id={styles.titleContainer}> Reviews from our users </p>
      <div>
        {comments
          .filter((comment) => comment.movie_id === props.resultos.id)
          .map((comment) => (
            <div key={comment._id} className={styles.commentListContainer}>
              <div className={styles.commentContainer}>
                <div className={styles.nameAndRatingContainer}>
                  <p id={styles.authorContainer}>
                    posted by: {comment.username}
                  </p>
                  <p id={styles.ratingContainer}>Rating: {comment.rating}</p>
                </div>
                <div className={styles.commentBox}>
                <div className={styles.commentContentContainer}>
                  {comment.content}
                </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div id={styles.footerContainer}></div>
    </div>
  );
};

export default CommentDisplay;
