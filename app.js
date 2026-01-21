import express from "express";
import cors from "cors";
import moviesRouter from "./routers/movies.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const port = process.env.SERVER_PORT || 3600;

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));


app.use(express.static("public"));

app.use("/api/movies", moviesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
