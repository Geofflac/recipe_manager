// API call to retrieve the list of recipes, use of async/await function to ensure the reponse
const get_recipe = async () => {
    // Ensure reponse fron the API is achieved before to return it
    response = await fetch("https://recipemanagerlife.herokuapp.com/get_recipe");
    // response = await fetch("http://localhost:8080/get_recipe");
    recipe_response =  await response.json();
    return recipe_response
}

// API call to retrieve the list of ingredients, use of async/await function to ensure the reponse
const get_ingredient = async () => {
    // Ensure reponse fron the API is achieved before to return it
    response = await fetch("https://recipemanagerlife.herokuapp.com/get_ingredient");
    // response = await fetch("http://localhost:8080/get_ingredient");
    ingredient_response =  await response.json();
    return ingredient_response
}

// Seperated as used in 2 diff funtions
const dropdown_default = () => {
    return "Choose recipe"
}

// Function to generated the initial calendar.
const generate_calendar = async () => {
    // Ensure the response of both API is achieved before to go further
    recipes = await get_recipe();
    // Table header week + 7 days Mon to Sun
    calendar = '<thead><tr><th scope="col">Week</th><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thurdsay</th><th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr></thead>';
    for (let i = 0; i < 4; i++) {
        week_id = i + 1;
        calendar += `<tbody><tr><th scope="row">${week_id}</th>`;
        for (let j = 0; j < 7; j++) {
            calendar += '<td>';
            for (let h = 0; h < 2; h++) {
                default_value = dropdown_default();
                calendar += `<select class="form-select" aria-label="Default select example"><option selected>${default_value}</option>`
                // Each selection is build according to the data available in the database
                recipes.forEach( (element, index) => {
                    value_id = index + 1;
                    calendar += `<option value="${element.title}">${element.title}</option>`
                });
                calendar += '</select>'
            }
            calendar += '</td>'
        }
        calendar += '</tr>'
    }
    calendar += '</tbody>'
    document.getElementById('calendar').innerHTML = calendar;
}

// Call the function when the page is loaded
generate_calendar();

// Function to retrieve the selected recipes in the table
async function retrieve_table() {
    // empty recipe list array
    recipes_list = []
    // retrive the recipe list from the DB.
    recipes = await get_recipe();
    var myTab = document.getElementById('calendar');
    // Loop to go through all the cells of the tab
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 1; j < objCells.length; j++) {
            for (let h = 0; h < objCells.item(j).children.length; h++ ){
                // retrieve the element in the cell
                recipe_selected = objCells.item(j).children.item(h).value;
                if ( recipe_selected != dropdown_default() ) {
                    const recipe_details = recipes.filter(function (element) {
                        return element.title == recipe_selected;
                    });
                    flag = 0;
                    recipes_list.forEach( element => {
                        if ( element.title == recipe_details[0].title ) {
                            element.qty += 1;
                            flag = 1;
                        }
                    })
                    if (flag == 0) {
                        recipe_object = {};
                        recipe_object.recipe_id = recipe_details[0].id;
                        recipe_object.title = recipe_details[0].title;
                        recipe_object.qty = 1;
                        recipes_list.push(recipe_object)
                    }
                }
            }
        }
    }
    if (recipes_list.length != 0) {
        return recipes_list
    }
    else {
        return "no selection"
    }
}

// Function to generate the ingredient list according to the selected recipes in the calendar.
async function ingredient_list() {
    // retrieve the recipes selected in the calendar
    retrieved_table = await retrieve_table();
    // return no selection is nothing is selected
    if (retrieved_table == "no selection") {
        return "no selection";
    }
    // empty list of ingredient
    ingredient_list_arr= [];
    // retrieve the list of ingredient from the database
    ingredients = await get_ingredient();
    // loop to go trough all the recipes in the calendar
    retrieved_table.forEach ( each_recipe => {
        qty_recipe = each_recipe.qty;
        // filter the ingredient from the database that have the same id as the recipe
        let ingredients_selected = ingredients.filter(function (ingredient) {
            return ingredient.recipe_id == each_recipe.recipe_id;
        });
        ingredients_selected.forEach(element => {
            element.qty *= qty_recipe;
            // need to check if the ingredient alrd exist in the list.
            index_location = ingredient_list_arr.findIndex( (ingredient) => {
                if (ingredient.item == element.item){
                    return true;
                }
            })
            if (index_location != -1) {
                ingredient_list_arr[index_location].qty += element.qty;
            }
            else {
                ingredient_list_arr.push(element);
            }
        })
    })
    // console.log(ingredient_list_arr);
    return ingredient_list_arr;    
}

async function generate_ingredient_list() {
    text = "<h3>Your ingredients list</h3>";
    ingredients = await ingredient_list();
    if (ingredients == "no selection") {
        document.getElementById('ingredient_list').innerHTML = "Select a recipe";
        return;
    }
    ingredients.forEach( element => {
        text += `<p>${element.item}, ${element.qty} ${element.unit}</p>`
    });
    document.getElementById('ingredient_list').innerHTML = text;
}