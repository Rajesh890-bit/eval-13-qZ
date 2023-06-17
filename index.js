const express = require("express");
const cors = require("cors");

const { connection } = require("./db");

const { userRouter } = require("./routes/User.routes");
const { quizRouter } = require("./routes/Quiz.routes");

require("dotenv").config();

const { auth } = require("./middleware/auth.middleware");
const { LeaderRouter } = require("./routes/LeaderBoard.routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);

//protected routes are below
// app.use(auth); // below this line routes are protected

app.use("/quiz", quizRouter);
app.use("/leader", LeaderRouter);

app.listen(process.env.port || 8000, async () => {
  try {
    await connection;
    console.log(`Connected to the DB ${process.env.port || 8000}`);
  } catch (error) {
    console.log(error);
    console.log("Cannot Connect to the DB");
  }
});
