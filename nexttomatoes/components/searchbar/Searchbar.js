import styles from "./Searchbar.module.css";

const Searchbar = ({ keyword, onChange }) => {
  return (
    <div className={styles.searchboxContainer}>
      <div className={styles.wrap}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            placeholder="Search a movie"
            key="search-bar"
            value={keyword}
            onChange={(e) => onChange(e.target.value)}
          ></input>
          {/* <input
            type="submit"
            value="Search"
            className={styles.searchButton}
          ></input> */}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
