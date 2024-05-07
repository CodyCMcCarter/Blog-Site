import express from "express";

const app = express();
const port = 3000;

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

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/modifyPosts", (req, res) => {
    res.render("modifyPosts.ejs");
});

app.post("/Submit", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });