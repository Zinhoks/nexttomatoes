import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import stylos from "../../styles/[movieId].module.css";
import axios from "axios";

export default function SingleMovie({ data }) {
  const router = useRouter();
  // const { movieId, title } = router.query;
  const query = router.query;
  const movieId = query.movieId;
  const [movie, setMovie] = useState({});
  const [movieUpdate, setMovieUpdate] = useState([]);

  useEffect(() => {
    (async () => {
      const config = {
        method: "get",
        url: `http://localhost:3000/api/admin/${movieId}`,
        headers: {},
      };

      await axios(config)
        .then(function (res) {
          const data =  res.data.message          
          setMovie(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
  }, []);
  // async function updateMovie(req, res) {
  //   var config = {
  //     method: 'PUT',
  //     url: `http://localhost:3000/api/admin/${movieId}?title=${query.title}`,
  //     headers: {}
  //   };

  //   axios(config)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  const updateMovie = async () => {
 
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      url: `http://localhost:3000/api/admin/${movieId}?title=${query.title}&overview=${query.overview}&`,
      body: JSON.stringify(movieUpdate),
    };
    // const response = await fetch(
    //   `http://localhost:3000/api/admin/${movieId}?title=${query.title}`,
    //   Options
    // );
    axios(Options)
    .then(function (response) {
      console.log(JSON.stringify((response.data)));
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  return (
    <div>
      <Head>
        
        <title>Movie edit page</title>        
      </Head>
      <main className={stylos.container}>
        <span className="backButton">
          {router.pathname !== "/" && (
            <button onClick={() => router.push("/admin/movies")}>Back</button>
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
        <div className={stylos.card}>
          <div
            className="card-body d-flex justify-content-evenly align-items-center fs-6 border"
            key={data.message._id}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.message.poster_path}`}
              height={300}
              width={300}
              alt={data.message.original_title}
              className={stylos.img}
            />
            <section className={stylos.editForm}>
              <h3>Edit movie information*</h3>
              <div>*All the fields are required</div>
              <form onSubmit={updateMovie} method="put">
                <div>
                  <h5 className={stylos.cardHead}>Title:</h5>
                  <input
                    name="title"
                    placeholder=""
                    onChange={(e) =>
                    setMovieUpdate({ ...movieUpdate, title: e.target.value }) }
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div>
                  <h5>Overview:</h5>
                  <textarea
                    name="overview"
                    rows="10"
                    cols="25"
                    placeholder=""
                    onChange={(e) =>
                      setMovieUpdate({ ...movieUpdate, overview: e.target.value })
                    }
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div>
                  <div>
                    <h5>Release date:</h5>
                    <input
                      name="release-date"
                      placeholder={data.message.release_date}
                      onChange={(e) =>
                        setMovieUpdate({
                          ...movieUpdate,
                          release_date: e.target.value,
                        })
                      }
                      className={stylos.input}
                    />
                  </div>
                </div>
                <div>
                  <h5>Original language:</h5>
                  <input
                    name="original_language"
                    placeholder={data.message.original_language}
                    onChange={(e) =>
                      setMovieUpdate({
                        ...movieUpdate,
                        original_language: e.target.value,
                      })
                    }
                    className={stylos.input}
                  />
                </div>
                <button type="submit" value="Submit" className={stylos.btn}>
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;
  const { movieId } = ctx.query;

  // request movie from api
  let response = await fetch(
    `${dev ? DEV_URL : PROD_URL}/api/admin/${movieId}`
  );
  // extract the data
  let data = await response.json();
  return {
    props: { data },
  };
}
