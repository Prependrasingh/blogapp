const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const blog = require("./routes/blog");

app.use("/api/v1", blog);

require("dotenv").config();

const connectwithDB = require("./config/database");

connectwithDB();

app.get("/", (req, res) => {
    res.send("<h1>This is HOMEPAGE</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});