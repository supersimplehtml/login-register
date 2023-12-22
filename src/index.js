const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb.js");
const { log } = require("console");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    console.log("working");
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

       

        await collection.insertMany([data]);

        res.render("home");
    } catch (error) {
        console.error("Error processing signup:", error.message);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/login", async (req, res) => {
    console.log("working");
    try {
       const check = await collection.findOne({name:req.body.username})
       if (check.password===req.body.password){
        res.render("home")
       }
    } catch (error) {
       res.send("Please Sign up as there is no user with the same details")
    }
});


app.listen(3000, () => {
    console.log("port connected");
});
