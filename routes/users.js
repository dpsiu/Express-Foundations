const express = require("express");
const router = express.Router();
// .Router() is similar to .App(), meaning we can utilize router.get, router.put, etc

router.get("/users", (req, res) => {
  res.send("User list");
});

router.get("/users/new", (req, res) => {
  res.send("User new form");
});
// Notice above, routes start with users. Redundant.
// Can cut that off, knowing all paths in the users.js file begin with /users

// Below - Advanced Routing. We achieve this in the files where our routes are
// Here we get our users, and get a form for new users, and also create new users
router.post("/", (req, res) => {
  res.send("New user!");
});

// We prob want to access individual users. How? When we don't know their paths? We want to make it dynamic
// router.get('/:id', (req, res) => {
//     req.params.id  <<< Only .id bc we named the dynamic parameter id. Match them.
//     res.send(`Get user with id ${req.params.id}`)
// })
// ^^^ / as normal, but also include colon and id. "get any route that starts with /users and has any code afterwards"
// Ie, localhost:5000/users/124 page says, "Get user with id 124" Pulls number directly with url.
// HOWEVER. Reads from top to bot. Put static above dynamic routes always.

// router.put('/:id', (req, res) => {
//     req.params.id
//     res.send(`Get user with id ${req.params.id}`)
// })

// router.delete('/:id', (req, res) => {
//     req.params.id
//     res.send(`Get user with id ${req.params.id}`)
// })

// These usually compliment a .get, bc you'd likely want to compliment it with .put and .delete.
// Express is aware and has built something for this as follows below, by chaining them below

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Get user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Get user with id ${req.params.id}`);
  });

const users = [{name: "Giorno"}, {name: "Johnny"}, {name: "Jolyne"}]
// .param() is a middlware, something that runs between the request to the server and the request being sent back
router.param("id", (req, res, next, id) => {
    req.user = users[id] //user is a random variable. Could be named anything. Get the id (index) for that user
                        // Anytime we have an id, get it from users
    next()
})

module.exports = router;
// to export this to be used in our server.js
