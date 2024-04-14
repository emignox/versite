const express = require("express"); // Import express
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
require("dotenv").config(); // Import dotenv
const app = express(); // Initialize the app with express
const connect = require("./db"); // Import the connect function from db.js
const postRoutes = require("./routes/postRoutes");
const cookiePaerser = require("cookie-parser");
const { checkUser } = require("./middleware/auth.middleware");
const { requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors"); // Import cors

app.use(express.json()); // Use express.json middleware

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_2],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
console.log(
  `CORS is configured to accept requests from: ${process.env.CLIENT_URL}`
);
app.get("/ciao", (req, res) => {
  res.status(200).send("ciao");
});

//routes
app.use("/api/user", userRoutes); // Use userRoutes
app.use(cookiePaerser());
// authorisation cors

app.use("/api/post", postRoutes);

// Serve static files from the "uploads" directory
// ... il resto del tuo codice server qui ...
//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//server.js
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
