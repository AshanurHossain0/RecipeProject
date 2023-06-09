require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const { appConfig } = require("./config/config");
const cors=require("cors");

const connectDatabase = require("./config/database");


const userRoute = require("./routes/api/user");
const recipeRoute = require("./routes/api/recipe");
const reviewRoute = require("./routes/api/review");

const app = express();

app.use(cors());

// Connect to the database
connectDatabase();

// Init Middleware
app.use(express.json({ extended: false }));

// Server Check
app.get("/", (req, res) => res.send("API Running"));


// Define Routes
app.use("/api/users", userRoute);
app.use("/api/recipes",recipeRoute);
app.use("/api/reviews", reviewRoute);


const PORT = appConfig.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
