import bodyParser from "body-parser";
import express from "express";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRoute";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// to load env file
config();

// Configring express Application
const app = express();

const port = process.env.PORT || 3000;

// for connecting database
dbConnect();

// RequestBodyParser - it parse api request body
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// serving -  {{ecom-auth-host}}
app.use('/api/auth', authRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});