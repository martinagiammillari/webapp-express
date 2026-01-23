import connection from "../database/dbConnection.js";

// INDEX
function index(req, res, next) {
    const query = "SELECT * FROM movies";

    connection.query(query, (err, results) => {
        if (err) return next(err);

        res.json({
            results
        });
    });
}




// SHOW
function show(req, res, next) {
  const slug = req.params.slug;

  const query = `
    SELECT
      movies.*,
      reviews.id AS review_id,
      reviews.name,
      reviews.vote,
      reviews.\`text\`
    FROM movies
    LEFT JOIN reviews
      ON reviews.movie_id = movies.id
    WHERE movies.slug = ?
  `;

  connection.query(query, [slug], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    // Creo l'oggetto movie base
    const movie = {
      id: results[0].id,
      title: results[0].title,
      director: results[0].director,
      abstract: results[0].abstract,
      genre: results[0].genre,
      release_year: results[0].release_year,
      image: results[0].image,
      reviews: []
    };

    // Aggiungo le recensioni
    results.forEach((row) => {
      if (row.review_id) {
        movie.reviews.push({
          id: row.review_id,
          name: row.name,
          vote: row.vote,
          text: row.text 
        });
      }
    });

    res.json(movie);
  });
}




// STORE
function storeReview(req, res, next) {
  const data = req.body;
  const movieId = req.params.id;

  const sql = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [movieId, data.name, data.vote, data.text],
    (err, result) => {
      if (err) return next(err);

      res.status(201).json({
        message: "Added review",
        id: result.insertId
      });
    }
  );
}




export default { index, show, storeReview };