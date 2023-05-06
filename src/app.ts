import bodyParser from "body-parser";
import express from "express";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import { config } from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// to load env file
config();

// Configring express Application
const app = express();

const port = process.env.PORT || 3000;

// for connecting database
void dbConnect();

// RequestBodyParser - it parse api request body
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// serving -  {{ecom-auth-host}} Create User, Login User
app.use("/api/auth", authRouter);

// serving -  {{ecom-user-host}} Get Profile, Update Profile, Delete Profile,
app.use("/api/user", userRouter);

// serving -  {{ecom-admin-host}} Get Profile, Update Profile, Delete Profile,
app.use("/api/admin", adminRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
