const http = require("http");
const express = require("express");
const app = express();
const client = require("./db");
const server = http.createServer(app);
const cors = require("cors");
const userRouter = require("./routes/route-user");
const auth = require("./routes/route-auth");
const Post = require("./routes/route-post");
const getPost = require("./routes/route-getPost");

app.use(cors());
app.use(express.json());
// Utilizza il router per creare uno user endpoint

// REGISTRATION AUTHENTICATION AND LOGIN ROUTES
app.use("/publics", express.static("publics"));
app.use("/api/", userRouter);
app.use("/api/auth", auth);

//  POSTS  AND LIKE COMMENTS ROUTES

app.use("/api/post", Post);
//GET POST BY ID
app.use("/api/getPost", getPost);

if (server.listen(3000)) {
  console.log("server is listening on port 3000");
} else {
  console.log("server in not running ");
}

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

process.on("exit", async () => {
  await client.close();
});
