
// set up
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
let currentUser = null;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "WebProgramming",
  port: 5432,
});
db.connect();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  { user_id: "elite001", password: "12345", name: "Elite"},
  { user_id: "ink002", password: "321", name: "Ink"},
  { user_id: "sate003", password: "2468", name: "Sate"}
];

let blogs = [
  { blog_id: "1", creator_name: "Elite", title: "Crazy", body: "Crazy? I was crazy once. They locked me in a room. A rubber room. A room filled with rats. The rats made me crazy. Crazy?", date_created:new Date(), creator_user_id:"elite001"},
  { blog_id: "2", creator_name: "Ink", title: "Devil May Cry", body: "Best game ever lol", date_created:new Date(), creator_user_id:"ink002"},
  { blog_id: "3", creator_name: "Sate", title: "Game Dev", body: "Making a game about autism woahhhh", date_created:new Date(), creator_user_id:"sate003"},
  { blog_id: "4", creator_name: "Elite", title: "Worst thing about being the class clown is thinking everyone hates you", date_created:new Date(), creator_user_id:"elite001"},
  { blog_id: "5", creator_name: "Ink", title: "Percy Jackson", body: "The show was ok. The movies are good if you don’t compare them to the books but trash if you do. The books are amazing.", date_created:new Date(), creator_user_id:"ink002"},
];



// start page
app.get("/", (req, res) => {
  res.render("index");
});
// Routes for Sign In
app.get("/signin", (req, res) => {
  res.render("signin"); 
});

app.post("/signin", async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE user_id = $1 AND password = $2",
      [user_id, password]
    );

    if (result.rows.length > 0) {
      
      const user = result.rows[0];
      currentUser = user;
      const blogResult = await db.query("SELECT * FROM blogs ORDER BY date_created DESC");
      res.render("blogPage", { blogs: blogResult.rows, user: user });
    } else {
      res.redirect("/signin?error=1");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/signin?error=2");
  }
});

// routs for sign up
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { user_id, password, name } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);

    if (result.rows.length > 0) {
      res.redirect("/signup?error=1"); // User already exists
      return;
    }

    await db.query(
      "INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)",
      [user_id, password, name]
    );

    res.redirect("/signin"); // Success
  } catch (err) {
    console.error(err);
    res.redirect("/signup?error=2"); // Server error
  }
});

app.get("/blogPage", async (req, res) => {
  if (!currentUser) {
    return res.redirect("/signin");
  }
  try {
    const blogResult = await db.query("SELECT * FROM blogs ORDER BY date_created DESC");
    res.render("blogPage", { blogs: blogResult.rows, user: currentUser });
  } catch (err) {
    console.error(err);
    res.send("Error loading blogs.");
  }
});

app.get("/edit/:id", async (req, res) => {
  if (!currentUser) return res.redirect("/signin");

  const blog_id = req.params.id;

  try {
    // Load all blogs ordered
    const blogResult = await db.query("SELECT * FROM blogs ORDER BY date_created DESC");
    const blogs = blogResult.rows;

    // Find blog to edit
    const editIndex = blogs.findIndex(blog => String(blog.blog_id) === String(blog_id));

    if (editIndex === -1) return res.send("Blog not found.");

    // Check ownership
    if (currentUser.user_id !== blogs[editIndex].creator_user_id) {
      return res.send("Unauthorized to edit this blog.");
    }

    // Render blogPage with editIndex set
    res.render("blogPage", { blogs, user: currentUser, editIndex });
  } catch (err) {
    console.error(err);
    res.send("Server error.");
  }
});

app.post("/edit/:id", async (req, res) => {
  const blog_id = req.params.id;
  const { title, body } = req.body;

  try {
    // Check blog ownership first
    const result = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [blog_id]);
    const blog = result.rows[0];

    if (!currentUser || currentUser.user_id !== blog.creator_user_id) {
      return res.send("Unauthorized.");
    }

    await db.query(
      "UPDATE blogs SET title = $1, body = $2, date_created = $3 WHERE blog_id = $4",
      [title, body, new Date(), blog_id]
    );

    res.redirect("/blogPage"); 
  } catch (err) {
    console.error(err);
    res.send("Server error.");
  }
});

app.post("/submit", async (req, res) => {
  const { newTitle, newText, creator_name, creator_user_id } = req.body;

  if (!currentUser || currentUser.user_id !== creator_user_id) {
    return res.send("Unauthorized: You must be signed in.");
  }

  try {
    await db.query(
      "INSERT INTO blogs (title, body, creator_name, creator_user_id, date_created) VALUES ($1, $2, $3, $4, $5)",
      [newTitle, newText, creator_name, creator_user_id, new Date()]
    );

    const blogResult = await db.query("SELECT * FROM blogs ORDER BY date_created DESC");
    res.render("blogPage", { blogs: blogResult.rows, user: currentUser });
  } catch (err) {
    console.error(err);
    res.send("Error saving blog.");
  }
});

app.post("/delete/:id", async (req, res) => {
  const blog_id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [blog_id]);
    const blog = result.rows[0];

    if (!currentUser || currentUser.user_id !== blog.creator_user_id) {
      return res.send("Unauthorized.");
    }

    await db.query("DELETE FROM blogs WHERE blog_id = $1", [blog_id]);
    res.redirect("/blogPage");
  } catch (err) {
    console.error(err);
    res.send("Server error.");
  }
});


// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

