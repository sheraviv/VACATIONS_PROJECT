import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import router from "./vacations/route/route";
import charts from "./charts/route/route";
import loginRouter from "./login/route/route";
import registrationRouter from "./registration/route/route";
import verifyToken from "./auth/auth";
import { initDB } from "./db";
const app = express();


const { PORT } = process.env;

initDB();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.get("/WORKING!!!", async (req, res) => {
  return res.send("Api is working!");
});

app.use("/login", loginRouter); 
app.use("/regester", registrationRouter); 
app.use(verifyToken);
app.use("/vacations", router);
app.use("/charts", charts);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
