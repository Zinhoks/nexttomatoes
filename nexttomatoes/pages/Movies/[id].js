import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import stylos from "../../styles/[id].module.css";
import stylus from "../../styles/fetchmovie.module.css";
import Commentmovie from "../../components/comments/Commentmovie";
import CommentDisplay from "../../components/comments/CommentDisplay";
import Card from "../../components/card/Card";
import Favbutton from "../../components/favlist/Favbutton";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=c82e43e35199b967dfcd41ee155c3c46`
  );
  const data = await res.json();
  return { props: { data } };
}

const Moviesolo = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <div className={stylus.headosContainer}>
        <Header />
      </div>
      <div className={stylos.cardAndFormContainer}>
        <div className={stylos.cardSoloContainer}>
          <div className={stylos.cardContainer}>
            <div className={stylos.imgContainer}>
              <Image
                className={stylos.imgFilm}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                width={250}
                height={375}
                alt={data.original_title}
              />
            </div>
            <div className={stylos.movieTextContainer}>
              <span className={stylos.movieNote}>85.5</span>
              <span className={stylos.movieTitle}>{data.original_title}</span>
            </div>
          </div>
        </div>
        <div className={stylos.commentFormContainer}>
          <Commentmovie resultos={data} />
        </div>
      </div>
      <div className={stylos.commentDisplayContainer}>
        <CommentDisplay resultos={data} />
      </div>
    </div>
  );
};

export default Moviesolo;
