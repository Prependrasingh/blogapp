const express = require("express");
const app = express();
const cors = require('cors'); // ← step 1: require at top

require("dotenv").config();



app.use(cors());        // ← step 2: use BEFORE routes
app.use(express.json());

const PORT = process.env.PORT || 5000;

const blog = require("./routes/blog");
app.use("/api/v1", blog);

const connectwithDB = require("./config/database");
connectwithDB();

app.get("/", (req, res) => {
    res.send("<h1>This is HOMEPAGE</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});