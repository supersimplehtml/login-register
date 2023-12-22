const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tech:tech123@cluster0.aj6okk5.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

const newUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
}, { timestamps: true });

const collection = new mongoose.model("users", newUserSchema);

module.exports = collection;
