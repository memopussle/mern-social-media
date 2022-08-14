import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//import post routes
import postRoutes from "./routes/posts.js";

const app = express();

app.use('/posts', postRoutes); //every routes in postRoutes is going to start with /posts

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// host data on mongo atlas
const CONNECTION_URL =
  "mongodb+srv://xanhtham:gianganhthu7b..@cluster0.tupwf3g.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.port || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));