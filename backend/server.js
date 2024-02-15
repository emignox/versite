const http = require("http");
const express = require("express");
const app = express();
const client = require("./db");
const server = http.createServer(app);
const cors = require("cors");
const userRouter = require("./routes/route-user");
const auth = require("./routes/route-auth"); // Importa il router

app.use(cors());
app.use(express.json());
// Utilizza il router per creare uno user endpoint
app.use("/publics", express.static("publics"));
app.use("/api/user", userRouter);
app.use("/api/auth", auth);

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
