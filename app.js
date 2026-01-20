import express from "express";
import moviesRouter from "./routers/movies.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT;
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use("/api/movies", moviesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {
    console.log(`server is listening on ${port}`);
});