import React, { useState, useEffect } from "react";

const Test = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  async function logValue(e) {
    e.preventDefault();
    console.log(selectedGenre);
    await fetch(
      `http://localhost:3000/api/CallFilter?genreIdCat=${selectedGenre}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form>
        <label>Select </label>
        <select
          id="genreselect"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
          }}
        >

          <option value=""></option>
          <option value="crime">Crime</option>
          <option value="drama">Drama</option>
          <option value="fantasy">Fantasy</option>
        </select>
        <button onClick={logValue}>submit</button>
      </form>
    </div>
  );
};

export default Test;
