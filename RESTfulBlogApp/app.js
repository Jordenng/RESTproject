var express = require("express");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
    res.redirect("/blogs");
});
/// restful routes ///
//index route/
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error");
        }
        else{
            res.render("index", {blogs:blogs});
        }
    });
});
// new route //
app.get("/blog/new", function(req, res){
    res.render("new");
});
//create route//
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

//shows//
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog});
        }
    });
});

// edit//
app.listen(3000, function () {
    console.log("SERVER HAS STARTED")
});
