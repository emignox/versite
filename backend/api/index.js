const express = require("express");
const userRoutes = require("../routes/userRoutes");
require("dotenv").config();
const app = express();
const connect = require("../db");
const postRoutes = require("../routes/postRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("../middleware/auth.middleware");
const { requireAuth } = require("../middleware/auth.middleware");
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_2,
    process.env.CLIENT_URL_3,
    process.env.CLIENT_URL_4,
  ],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.get("*", checkUser);

app.get("/ciao", (req, res) => {
  res.status(200).send("ciao");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
