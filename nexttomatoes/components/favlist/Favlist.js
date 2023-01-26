import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Favlist.module.css";

const Favlist = (props) => {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    async function getFavlist() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/favlist/favlist`
        );
        setFavoris(res.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    getFavlist();
  }, []);

  return (
    <div className={styles.formContainer}>
      {favoris
        .filter((favori) => favori.user_id === props.resulty)
        .map((favori) => (
          <div key={favori.id}>
            <p className={styles.titleContainer}>{favori.movie_title}</p>
          </div>
        ))}
    </div>
  );
};

export default Favlist;
