import Image from "next/image";
import Link from "next/link";
import stylos from "./Card.module.css";
import { useState, useEffect } from "react";
import Favbutton from "../favlist/Favbutton";

const Card = ({ resultos }) => {
  const [comments, setComments] = useState([]);
  const [average, setAverage] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/api/comments/comment")
      .then((response) => response.json())
      .then((data) => {
        // console.log(resultos);
        const idFilm = resultos.id;
        setComments(data.message);
        let rate = 0;
        data.message
          .filter((comment) => comment.movie_id == idFilm)
          .map((comment) => (rate += parseInt(comment.rating)));
        // console.log('total rate: ', rate)
        let NumberOfRate = [];
        data.message
          .filter((comment) => comment.movie_id == idFilm)
          .map((comment) => (NumberOfRate = comment.rating));
        // console.log("NumberOfRate", NumberOfRate)

        setAverage(rate / NumberOfRate.length);

        // console.log(average)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={stylos.cardContainer}>
      <Link href={`http://localhost:3000/Movies/${resultos.id}`}>
        <div className={stylos.imgContainer}>
          <Image
            className={stylos.imgFilm}
            src={`https://image.tmdb.org/t/p/w500${resultos.poster_path}`}
            width={200}
            height={300}
            //   fill
            alt={resultos.original_title}
          />
        </div>
      </Link>
      <div className={stylos.movieTextContainer}>
        <div className={stylos.NoteEtFavContainer}>
          <div className={stylos.movieNote}>{average.toFixed(1)}</div>
          <div className={stylos.favButton}>
            {" "}
            <Favbutton ladata={resultos} />{" "}
          </div>
        </div>
        <div className={stylos.movieTitle}>{resultos.original_title}</div>
      </div>
    </div>
  );
};

export default Card;
