import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

class Post {
    constructor(title, content, tags){
        this.title = title;
        this.content = content;
        this.tags = tags;
    }
}

const existingPost = new Post("Welcome To My Blog", 
"Hello! Welcome to my brand new blog! I haven't sorted out the database, so the posts don't stick around. Feel free to create posts and see how everything works, though!", 
["first", "welcome", "short", "database", "blog"])

var posts = [existingPost];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/editPost/:id", (req, res) => {
    res.render("editPost.ejs", { editPost: posts[req.params.id], index: req.params.id });
});

app.post("/submit", (req, res) => {
    let newTags = req.body.tags.split(" ");
    let newPost = new Post(req.body.title, req.body.content, newTags);
    posts.unshift(newPost);
    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    let editTags = req.body.tags.split(" ");
    let editPost = new Post(req.body.title, req.body.content, editTags);
    posts[req.params.id] = editPost;
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });