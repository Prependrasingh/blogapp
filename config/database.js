const mongoose = require("mongoose");

const connectwithDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB connected Successfully");
    } catch (error) {
        console.log("DB facing connection Issues");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectwithDB;