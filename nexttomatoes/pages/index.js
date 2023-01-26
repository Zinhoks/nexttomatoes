import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Searchbar from "../components/searchbar/Searchbar";
import Fetchmovie from "./Movies/Fetchmovie";
import stylus from "../styles/fetchmovie.module.css";

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=c82e43e35199b967dfcd41ee155c3c46`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

const FetchmovieWithSearch = ({ data }) => {
  const [stories, setStories] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchStories = async () => {
    try {
      const stortedStories = data.results.sort((story, nextStory) =>
        story.points < nextStory.points ? 1 : -1
      );
      setAllStories(stortedStories);
      setStories(stortedStories);
      setError(null);
    } catch (err) {
      setError(err.message);
      setStories(null);
    } finally {
      setLoading(false);
    }
  };

  const updateKeyword = (keyword) => {
    const filtered = allStories.filter((story) => {
      return `${story.original_title.toLowerCase()} ${story.title.toLowerCase()} ${story.release_date.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setStories(filtered);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <>
      <div className={stylus.headosContainer}>
        <Header />
      </div>
      <div className="wrapper">
        {loading && <div>Search is loading...</div>}
        {error && <div>{`Problem fetching results - ${error}`}</div>}
        <Searchbar keyword={keyword} onChange={updateKeyword} />
        <Fetchmovie stories={stories} />
      </div>
    </>
  );
};

export default FetchmovieWithSearch;
