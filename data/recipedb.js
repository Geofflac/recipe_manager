const database = require("./database.js")
const express = require("express");
const bodyParser = require("body-parser");

let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/test", (response) => {
  database.connection.query("select * from test", (error, result) => {
    if (error) {
      console.log(error);
      response.status(500).send("some internal error");
    } else {
      response.send(result);
    }
  });
});

router.get("/get_recipe", (request, response) => {
    database.connection.query("select * from recipe", (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("some internal error");
      } else {
        // response.status(200).send(result);
        response.send(result);
      }
    });
  });

  router.get("/get_ingredient", (request, response) => {
    database.connection.query("select * from ingredient", (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send("some internal error");
      } else {
        // response.status(200).send(result);
        response.send(result);
      }
    });
  });
  
const add_recipe = (new_recipe) => {
  return new Promise ( async (resolve, reject) => {
    try{
      // 1 - add the recipe to the recipe table
      await add_the_recipe(new_recipe);
      // 2 - retrievd the recipe ID
      the_recipe_id = await get_recipe_id(new_recipe);
      // 3 - Add all the ingredient inside the ingredients table
      await add_the_ingredient(new_recipe, the_recipe_id)
      // 4 - resolve
      resolve()
    }
    catch(error){
      reject(error)
    }
  } )
}

const get_recipe_id = (new_recipe) => {
  return new Promise ( (resolve, reject)=>{
      database.connection.query(`select id from recipe where title = "${new_recipe.title}"`, (error, result) => {
        if (error) {
          console.log(error);
          reject(error)
        } else {
          test = result[0].id;
          console.log(test);
          resolve(test)
        }
      })
  } )
};

const add_the_recipe = (new_recipe) => {
  return new Promise ( (resolve, reject)=>{
      database.connection.query(`INSERT INTO recipe (title, user_id) VALUES ("${new_recipe.title}", 1)`, (error) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        resolve()
      })
  } )
}

const add_the_ingredient = (new_recipe, recipe_id) => {
  return new Promise ( (resolve,reject)=>{
    amount_ingredient = new_recipe.ingredient.length;
    console.log(new_recipe);
    for (let i = 0; i < amount_ingredient; i++) {
      database.connection.query(`INSERT INTO ingredient (recipe_id, item, qty, unit) VALUES (${recipe_id}, "${new_recipe.ingredient[i]}", ${new_recipe.qty[i]}, "${new_recipe.unit[i]}")`, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        };
      });
    }
    resolve();
  } )
};

const delete_recipe = (recipe_id) => {
  return new Promise ( async (resolve, reject)=>{
    try{
      // 1 delete the recipe from the recipe
      await delete_the_recipe(recipe_id);
      // 2 delete all the ingredients fron the ingredient
      await delete_the_ingredient(recipe_id);
      resolve();
    }
    catch(error){
      console.log(error);
      reject(error);
    }
  })
}

const delete_the_recipe = (recipe_id) => {
  return new Promise ( (resolve, reject) => {
    database.connection.query(`DELETE FROM recipe WHERE id = ${recipe_id}`, (error) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      resolve()
    })
  } )
}

const delete_the_ingredient = (recipe_id) => {
  return new Promise ( (resolve, reject) => {
    database.connection.query(`DELETE FROM ingredient WHERE recipe_id = ${recipe_id}`, (error) => {
      if (error) {
        console.log(error);
        reject(error)
      }
      resolve()
    })
  } )
}

const delete_the_one_ingredient = (ingredient_id) => {
  return new Promise ( (resolve, reject) => {
    database.connection.query(`DELETE FROM ingredient WHERE id = ${ingredient_id}`, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  } )
}

const get_the_recipe = (recipe_id) => {
  return new Promise ( (resolve,reject)=> {
    database.connection.query(`select title from recipe where id=${recipe_id}`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0].title);
      }
    });
  } )
}

const get_the_ingredient = (recipe_id) => {
  return new Promise ( (resolve,reject)=> {
    database.connection.query(`select * from ingredient where recipe_id=${recipe_id}`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  } )
}

const edit_the_recipe = (recipe, recipe_id) => {
  return new Promise ( async (resolve, reject) => {
    try{
      origin_recipe = await get_the_ingredient(recipe_id);
      recipe.ingredientID.forEach((element, index) => {
        if (element == "Null") {
          new_ingredient = {
            ingredient: [recipe.ingredient[index]],
            qty: [recipe.qty[index]],
            unit: [recipe.unit[index]]
          };
          add_the_ingredient(new_ingredient, recipe_id);
        }
        else {
          var origin_recipe_index = origin_recipe.findIndex(function(recipe) {
            if(recipe.id == element)
              return true;
          });
          if (origin_recipe_index == -1) {
            reject("ingredient search error");
          }
          else {
            update = "";
            flag = 0;
            if (recipe.ingredient[index] != origin_recipe[origin_recipe_index].item){
              // edit the name
              update += `item = '${recipe.ingredient[index]}'`
              flag = 1;
            };
            if (recipe.qty[index] != origin_recipe[origin_recipe_index].qty) {
              if (flag == 1) {
                update += ', '
              }
              update += `qty = ${recipe.qty[index]}`;
              flag = 1;
            };
            if (recipe.unit[index] != origin_recipe[origin_recipe_index].unit){
              if (flag == 1) {
                update += ', '
              }
              update += `unit = '${recipe.unit[index]}'`;
            };
            if (update != "") {
              update_query = `UPDATE ingredient SET ` + update  + ` WHERE id=${element}`;
              database.connection.query(`UPDATE ingredient SET ` + update + ` WHERE id=${element}`, (error, result) => {
                if (error) {
                  reject(error);
                };
              });
            }
          }
        }
      });
      resolve();
    }
    catch(error){
      reject(error);
    }
  })
}


// const check_recipe = async (new_recipe) => {
//   await database.connection.query(`select * from recipe where title = "${new_recipe.title}"`, async (error, result) => {
//     if (error) {
//       console.log(error);
//       response.status(500).send("some internal error");
//     } else {
//       // console.log(result);
//       if (result.length == 0) {
//         console.log("check recipe return 0")
//         return 0;
//       }
//       else {
//         console.log("check recipe return 1")
//         return 1;
//       }
//       // response.status(200).send(result);
//     }
//   });
// }

module.exports = { router, add_recipe, delete_recipe, get_the_recipe, get_the_ingredient, delete_the_one_ingredient, edit_the_recipe};
