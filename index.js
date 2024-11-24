const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const {v4: uuidv4} = require('uuid');

// for override the patch request on html file use this package
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true}));

// for use method override, we include this lines
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Tony Stark",
        content: "A long-standing news source that covers entertainment as well as current events. Articles are relevant and accessible, while a free streaming network keeps people in touch with the latest developments."
    },
    {
        id: uuidv4(),
        username: "John Wick",
        content: "The online face of the internationally renowned women’s magazine, offering tried and trusted advice geared towards women for decades. Covers the latest in entertainment as well as beauty tips, fashion trends, relationship advice, and more."
    },
    {
        id: uuidv4(),
        username: "Alex Costa",
        content: "A long trusted resource that keeps up-to-date with the latest in men’s fashion. Includes lifestyle advice along with breaking news covering everything from current events and politics to Hollywood celebrity gossip."
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
    
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`App listen to port: ${port}`);
});
