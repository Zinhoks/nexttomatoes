const Test = async (req, res) => {
  let id = req.query.genreIdCat
  try {
    const genreIdCat = {
      crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      "Science Fiction": 878,
      Thriller: 53,
      western: 37,
    };

    const genre = genreIdCat[id];
    const result = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=c82e43e35199b967dfcd41ee155c3c46&with_genres=` +
        genre
    );

    const data = await result.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
export async function FiltertGenre(req, res) {
    const genreIdCat= req.query.genreIdCat
    res.status(200).json(await Test(genreIdCat))

}

export default Test;