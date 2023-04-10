const express = require("express");
const app = express();

// const cors = require("cors");
// var cache = require("cache-control");

const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const trainRoutes = require("./routes/trainRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketroutes = require("./routes/ticketRoutes");
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://glittering-hamster-946780.netlify.app",
// ];

const connectDB = require("./database");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const errHandler = require("./middleware/error");

require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
// app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
var cors = require("cors");
const corsOptions = {
  // origin:'*',
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(fileUpload());
app.set("trust proxy", 1);
// app.use(
//   cache({
//     "/index.html": 1000,
//     "/none/**/*.html": false,
//     "/private.html": "private, max-age=300",
//     "/**": 500, // Default to caching all items for 500
//   })
// );
app.use(cookieParser());
app.use(bodyparser.json());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1", trainRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", ticketroutes);
// if (process.env.NODE_ENV == "Production") {
const path = require("path");
app.get("/", (req, res) => {
  app.use(express.static(__dirname, "client", "build"));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }
app.use(errHandler);
app.listen(process.env.PORT, () => {
  console.log(`server is listening at port:${process.env.PORT}`);
});
