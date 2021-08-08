// Express Module
const express = require("express");

// Date Module
const date = require(__dirname + "/date.js");

// Initialized express to app variable
const app = express();

// Use for body-parser or getting the input in form
app.use(express.urlencoded({extended: true}));

// Use for public files or connecting the public files to server
app.use(express.static("public"));

// Use for declaring the ejs files
app.set('view engine', 'ejs');


const items = ["Play Valorant", "Eat", "Netflix", "Code"]; // Home Route array
const workItems = ["Code", "Program", "Study", "Grind"];   // Work Route array

// Home Route
app.get("/", (req, res) => {

    const day = date.getDate(); // Use the module date
    
    // Render the ejs file in the view directory for the home route
    res.render("index", {
        listItems: day, 
        newItems: items,
    });
    
})

// Home Route Post
app.post("/", (req, res) => {
    let item = req.body.newItem; // Use to get the value of input
    
    // Logic for the Home Route and Work Route
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

// Work Route
app.get("/work", (req, res)=> {

    // Render the ejs file in the view directory for the work route
    res.render("index", {
        listItems: "Work List",
        newItems: workItems,
    })
})

// About Me Route
app.get("/aboutme", (req,res) => {
    // Render the ejs file in the view directory for the aboutme route
    res.render("aboutme");
})


app.listen(process.env.PORT || 1000, ()=>{
    console.log("Server is running at port 1000");
})