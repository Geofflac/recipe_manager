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

// Function to build the table on the recipe,html, use of async/await function to ensure the reponse with the API calles made above
const generate_recipe_list = async () => {
    // Ensure the response of both API is achieved before to go further
    recipes = await get_recipe();
    ingredients = await get_ingredient();
    recipe_list = '';
    recipes.forEach(element => {
        recipe_list += '<div class="list-group-item flex-column align-items-start">' + `<div class="d-flex w-100 justify-content-between">`+ '<h5 class="mb-1">'
        recipe_id = element.id;
        recipe_list += element.title + '</h5>';
        recipe_list += `<small ><a class="btn btn-primary" href="https://recipemanagerlife.herokuapp.com/edit_recipe?id=${element.id}" role="button">Edit</a>`;
        // recipe_list += `<small ><a class="btn btn-primary" href="http://localhost:8080/edit_recipe?id=${element.id}" role="button">Edit</a>`;
        recipe_list += `<button type="submit" name=${element.id} class="btn btn-primary" onclick="delete_recipe(event)">Delete</button>` + `</small>` + `</div>`;
        recipe_list += '<p class="mb-1">Ingredients:</p>';
        const recipe_ingredient = ingredients.filter(function (element) {
            return element.recipe_id == recipe_id;
        });
        recipe_ingredient.forEach(element => {
            recipe_list += '<span>' + '<small>';
            recipe_list += element.item + ' ' + element.qty + ' ' + element.unit + ' / ';
            recipe_list += '</span>' + '</small>';
        });
        recipe_list += '</div>';
    });
    document.getElementById('recipe_list').innerHTML = recipe_list;
}
// Trigger the function when the page is first loaded
generate_recipe_list();

// add a recipe function
const add_recipe = () => {
    empty_form = `<h2>Add your recipe</h2>
                <form method="POST">
                    <div class="form-group">
                        <input type="text" class="form-control" id="RecipeTitle" placeholder="Recipe title"  name="title[]" required>
                    </div>
                    <div id="form_ingredient">`
    empty_form += ingredient_form();
    empty_form +=   
                    `</div>
                    <button type="submit" class="btn btn-primary" onclick="add_ingredient(event)">Add an Ingredient</button>
                    <button type="submit" class="btn btn-primary">Submit your Recipe</button>
                </form>`
    document.getElementById('add_button').innerHTML = empty_form;
}

// Function to add an inside the form an empty template ingredient
const add_ingredient = (event) => {
    event.preventDefault();
    empty_ingredient = ingredient_form()
    document.getElementById('form_ingredient').insertAdjacentHTML('beforeend',empty_ingredient);
}

// Template ingredient
const ingredient_form = () => {
    empty_ingredient = 
    `<div class="row">
        <div class="col">
            <input type="text" class="form-control" placeholder="Ingredient" name="ingredient[]" required>
        </div>
        <div class="col">
            <input type="number" step="0.001" class="form-control" placeholder="Qty" name="qty[]" required>
        </div>
        <div class="col">
            <select class="form-control" name="unit[]" required>
                <option selected>Select unit</option>
                <option value="Kg">Kg</option>
                <option value="L">L</option>
                <option value="Pc">Pc</option>
            </select>
        </div>
    </div>`;
    return empty_ingredient;
}

// Function to delete the recipe from the delte button
const delete_recipe = (event) => {
    // console.log(event.originalTarget.name);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("recipe_id", `${event.originalTarget.name}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://recipemanagerlife.herokuapp.com/delete_recipe", requestOptions)
    // fetch("http://localhost:8080/delete_recipe", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload();
    })
    .catch(error => console.log('error', error));
}