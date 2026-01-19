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
    const id = req.params.id;
    const query = "SELECT * FROM movies WHERE id = ?";

    connection.query(query, [id], (err, results) => {
        if (err) return next(err);

        if (results.length === 0) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(results[0]);
    });
}


export default {index, show};