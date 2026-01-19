import express from "express";
const app = express();
const port = process.env.SERVER_PORT;
app.listen(() => {
    console.log(`server is listening on ${port}`);
})