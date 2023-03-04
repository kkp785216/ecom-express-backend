import bodyParser from "body-parser";
import express from "express";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRoute";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// to load env file
config();

const app = express();
const port = process.env.PORT || 3000;

// for connecting database
dbConnect();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});