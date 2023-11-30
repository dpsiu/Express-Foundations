const express = require("express");
const app = express();
// Our app is listening on port 3000 for requests

app.set("view engine", "ejs");
app.use(logger);

app.get("/", (req, res) => {
  console.log("Here is /");
  // res.send('Sent') <<< Not super useful, so we put detailed mssg
  // res.sendStatus(500) <<< More useful, but not usable. Just sends err status
  // res.status(500).send('You have an error of status 500') <<< Better, but instead of mssg, send json

  // res.status(500).json({message: "Error"})
  // ^^^ Better, bc it is actual json code, rather than a plain mssg

  // res.json({message: "Error"})
  // ^^^ If u don't want to send status

  // res.download("path file here")
  // ^^^ if u want user to download a file

  res.render("index", { text: "World!" });
  // Most often, u want to render file or json. To render a file like html,
  // use .render() and pass it the path of the file
  // ^^^ Can take 2nd parameter. Pass down text

  // The above and the <%= %> syntax in the ejs file have discussed various ways to render html.
});

app.get("/about", (req, res) => {
  res.render("about", { text: "About Page Here" });
});

app.get("/contact-me", (req, res) => {
  res.render("contact-me", { text: "Contact Page Here" });
});
// Routers below
// app.get('/users', (req, res) => {
//     res.send('User list')
// })

// app.get('/users/new', (req, res) => {
//     res.send('User new form')
// })

// ^^^ This would work, but it makes sense/best practice to organize all related info in their own file.
// Carry on to users.js folder

const userRouter = require("./routes/users");
// here, we assign variable, name, require, and path

app.use("/users", userRouter);
// We remove the /users from the users.js. Why?
// This says, "anything from the path beginning with /users can have userRouter paths added to the end"
// This follows best practice. Define all routes in the respective file, then remove redundancy with app.use

// .param is one example of middlware, something essential to Express
// Middleware is something that runs between start of request and end of request.
// Common type is one for logging out something
//Only ever really see next when used with middlware
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.get("*", (req, res) => {
  res.status(404).json({ message: "Error, 404.html does not exist" });
});

app.listen(8080);
