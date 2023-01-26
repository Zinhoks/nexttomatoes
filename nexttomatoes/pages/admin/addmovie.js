import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import stylos from "../../styles/addMovie.module.css";
import axios from "axios";

export default function AddMovie({ data }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title);

    // console.log(user_id);
    const data = { title, overview, date, language };
    try {
      await axios.post("/api/admin/movies", data);
    } catch (error) {
      console.error(error);
      alert("Error submitting comment. Please try again later.");
    }
  };
  return (
    <div>
      <Head>
        <title>Add Movie page</title>
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
            <section className={stylos.editForm}>
              <h3>Add movie information</h3>
              <form onSubmit={handleSubmit}>
                <div>
                <Image
              src={"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"}
              height={300}
              width={300}
              alt=""
              className={stylos.img}
            />
                  <h5 className={stylos.cardHead}>Title:</h5>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div>
                  <h5>Release_date:</h5>
                  <input
                    name="date"
                    rows="10"
                    cols="25"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div>
                  <h5>Original language:</h5>
                  <input
                    name="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
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
