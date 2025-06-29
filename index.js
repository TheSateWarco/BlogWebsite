
// set up
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// premasde blogs
/*let blogs = [
  {
    id: Date.now().toString() + "0",  
    title: "Kingdom of Influence - KOI",
    author: "TheSateWarco",
    category: "Technology",
    text: "KOI (Kingdom of Influence) is a multiplayer game using DIR Floortime principles to develop social skills for young adults.\nBuild your kingdom through meaningful social connections and watch your influence grow as you master increasingly complex interactions.",
    recent: new Date()
  },
  {
    id: (Date.now() + 1).toString(), 
    title: "The Rise of Kyoshi - Review",
    author: "TheSateWarco",
    category: "Book Reviews",
    text: "Kyoshi is cool :)",
    recent: new Date()
  }
];



// get all blogs
app.get("/", (req, res) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.recent - a.recent); 
  res.render("index", { blogs: sortedBlogs });
});

// send new data from the form to server
app.post("/submit", (req, res) => {
  const { newTitle, newAuthor, newCategory, newText } = req.body;

    blogs.push({
    id: Date.now().toString(), 
    title: newTitle,
    author: newAuthor,
    category: newCategory,
    text: newText,
    recent: new Date()
    });


  res.redirect("/");
});

// set the deleted data (get rid of data basically) to server
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  blogs = blogs.filter(blog => blog.id !== id);
  res.redirect("/");
});

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// get ingo from the blogs to edit
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const editIndex = blogs.findIndex(blog => blog.id === id);
  res.render("index", { blogs, editIndex });
});

// add the nmew edited data to server
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const i = blogs.findIndex(blog => blog.id === id);
  const { title, author, category, text } = req.body;

  blogs[i] = {
    ...blogs[i],
    title,
    author,
    category,
    text,
    recent: new Date()
  };

  res.redirect("/");
});

*/

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index");
});
// Routes for Sign In and Sign Up
app.get("/signin", (req, res) => {
  res.render("signin"); 
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
