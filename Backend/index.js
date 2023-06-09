// IMPORTs_
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const CONNECT = require("./Configs/connection");
const userRouter = require("./Routes/users.routes");
const capsuleRouter = require("./Routes/capsule.route");
const app = express();

// USE_
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(userRouter);
app.use(capsuleRouter)

// LOGIC_
app.get("/", (req, res) => {
  res.send("Server working correctly!");
});

// CONNECT & LISTEN_
const PORT = 8080;
CONNECT().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at :", PORT);
  });
}).catch((err)=>{
  console.log(err)
})
