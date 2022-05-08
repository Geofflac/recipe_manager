const express = require("express");
const app = express();
const path = require(`path`);
const bodyParser = require("body-parser");
const recipedb = require("./data/recipedb.js");

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//tell express that views is the root of our public web folder
app.use(express.static("views"));

app.set("view engine", "ejs");

app.get("/", (res) => {
  res.sendStatus(200);
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/recipe.html", (res) => {
  res.sendStatus(200);
  res.sendFile(path.join(__dirname, "/views/recipe.html"));
});

app.post("/recipe.html", async (req,res) => {
  try{
    // TRY NEXT TIME TO IMPLEMENT
    // const check_recipe = await recipedb.check_recipe(req.body);
    await recipedb.add_recipe(req.body);
    res.redirect("/recipe.html");
  }
  catch(error){
    console.log(`the error is ${error}`)
    res.status(500).send("some internal error");
  }
});

app.post("/delete_recipe", async (req,res) => {
  try{
    await recipedb.delete_recipe(req.body.recipe_id);
    res.send("Recipe deleted");
  }
  catch(error){
    console.log(`the error is ${error}`)
    res.status(500).send("some internal error");
  }
});

app.get("/edit_recipe", async (req,res) => {
  try{
  console.log(`the recipe id given is ${req.query.id}`);
  recipe_id = req.query.id;
  recipe_title = await recipedb.get_the_recipe(recipe_id);
  recipe_ingredient = await recipedb.get_the_ingredient(recipe_id);
  // console.log(recipe_title);
  // res.send("hello");
  res.render("edit_recipe", {
    id: recipe_id, 
    title: recipe_title,
    ingredient: recipe_ingredient
  });
  }
  catch(error){
    console.log(`the error is ${error}`)
    res.status(500).send("some internal error");
  }
})

app.post("/delete_ingredient", async (req,res) => {
  try{
    await recipedb.delete_the_one_ingredient(req.body.ingredient_id);
    res.send("Recipe deleted");
  }
  catch(error){
    console.log(`the error is ${error}`)
    res.status(500).send("some internal error");
  }
});

app.post("/edit_recipe", async (req,res) => {
  try{
    console.log(req.query.id);
    console.log(req.body);
    await recipedb.edit_the_recipe(req.body, req.query.id);
    // res.send("Recipe edited");
    res.redirect("/recipe.html");
  }
  catch(error){
    console.log(`the error is ${error}`)
    res.status(500).send("some internal error");
  }
});

// Use the recipe database
app.use(recipedb.router);

app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
