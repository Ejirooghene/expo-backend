import express, { Express } from "express";
import dotenv from "dotenv";
import { auth, exhibit } from "./routes";
import { connectDB } from "./configs";
import cors from "cors";

dotenv.config();

connectDB();

const app: Express = express();

const port = process.env.PORT || 8080;

// app.json();
// app.urlencoded({ extended: false });
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", auth);
app.use("/exhibit", exhibit);

app.listen(port, () => console.log(`server started on port ${port}`));       