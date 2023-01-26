import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import stylos from "../../styles/movies.module.css";
import axios from "axios";

export default function Movies({ movies }) {
  const router = useRouter();
  async function deleteMovie(e, movieId) {
    e.preventDefault();
    console.log(movieId);

    let url = `http://localhost:3000/api/admin/${movieId}`;
    await axios
      .delete(url)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  }
  return (
    <div className={stylos.listMovies}>
      <Head>
        <title>Movies Administration Dashboard</title>
      </Head>

      <main className="bg-light container text-left">
        <span className="backButton">
          {router.pathname !== "/" && (
            <button onClick={() => router.push("/")}>Back</button>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-return-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </span>
        <div className="card grid row-gap">
          <p>
            {router.pathname !== "/" && (
              <button onClick={() => router.push("/admin/addmovie")}><FontAwesomeIcon icon={faPlus} className="p-2" />Add a movie</button>
            )}

            
          </p>
          {movies.map((messages, _id) => (
            <div
              className="card-body d-flex justify-content-between align-items-center fs-6 border"
              key={messages._id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${messages.poster_path}`}
                height={100}
                width={100}
                alt={messages.title}
                className={stylos.img}
              />
              <span className={stylos.title}>{messages.title}</span>
              <span className="">
                <Link href={`http://localhost:3000/admin/${messages._id}`}>
                  <FontAwesomeIcon icon={faPen} className="p-2" />
                </Link>
                <button
                  onClick={(e) => deleteMovie(e, messages._id)}
                  className={stylos.trash}
                >
                  <FontAwesomeIcon icon={faTrash} className="p-2" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/movies`);
  // extract the data
  let data = await response.json();
  console.log(data);

  return {
    props: {
      movies: data["message"],
    },
  };
}
