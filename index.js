const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;
app.set('views', path.join(__dirname, 'private'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
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

app.get("/", (req, res) => {
  res.render("index", { blogs });
});


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

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  blogs = blogs.filter(blog => blog.id !== id);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const editIndex = blogs.findIndex(blog => blog.id === id);
  res.render("index", { blogs, editIndex });
});


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

