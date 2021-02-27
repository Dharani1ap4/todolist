const express = require("express");
const app = express();
let ejs = require('ejs');
const bodyParser = require("body-parser");
const { response } = require("express");



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let commonlist = [];
let worklist = [];
let contactme = "Hello everyone! I am a Software Engineer, currently persuing third year BTech. Welcome to your Todo List, you can add your daily tasks here, Enjoy! "




app.get("/", function(request, response) {


    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"

    }
    var today = new Date();
    var dayforrender = today.toLocaleDateString("en-US", options);

    response.render("list", {
        listTitle: dayforrender,
        task: commonlist
    });
})
app.get("/contact", function(request, response) {
    response.render("contact", { content: contactme })
})

app.get("/work", function(request, response) {
    response.render("list", {
        listTitle: "Worklist",
        task: worklist
    });
})
app.post("/", function(request, response) {

    let taskOfUser = request.body.inputOfUser;


    if (request.body.button === "Worklist") {
        worklist.push(taskOfUser);
        response.redirect("/work");

    } else {
        commonlist.push(taskOfUser);
        response.redirect("/");
    }



})



app.post("/delete", function(request, response) {
    commonlist.pop();
    response.redirect("/");
})





app.listen(3001, function(require, response) {
    console.log("The sever has started at port 3001");
})
