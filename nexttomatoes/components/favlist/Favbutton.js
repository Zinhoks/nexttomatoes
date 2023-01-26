import React, { useState } from "react";
import axios from "axios";
import { accountService } from "../../_service/account_service";
import styles from "./Favbutton.module.css";
import Image from "next/image";

const Favbutton = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const movie_id = JSON.parse(JSON.stringify(props.ladata.id));
    const movie_title = JSON.parse(JSON.stringify(props.ladata.original_title));
    const user_id = accountService.getToken();

    console.log("id movie", movie_id);
    console.log("titre movie", movie_title);
    console.log("user id", user_id);
    const data = { movie_id, user_id, movie_title };
    try {
      await axios.post("/api/favlist/favlist", data);
      alert("Successfully added to favlist !");
    } catch (error) {
      console.error(error);
      alert("Error submitting favorite. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.buttonContainer}>
      <button className={styles.button} type="submit">
        <Image
          // className={stylos.imgFilm}
          src={"/../public/images/heart.svg.png"}
          width={15}
          height={15}
          alt={"add to your favorites"}
        />
      </button>
    </form>
  );
};

export default Favbutton;
