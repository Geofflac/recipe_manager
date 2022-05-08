const generate_recipe_list = () => {
    recipe_list = '';
    recipe_list += '<div class="list-group-item flex-column align-items-start">' + `<div class="d-flex w-100 justify-content-between">`+ '<h5 class="mb-1">'
    recipe_list += title + '</h5></div>';
    recipe_list += '<p class="mb-1">Ingredients:</p>';
    recipe_list += '<div id="form_ingredient">'
    ingredient.forEach(element => {
        recipe_list += 
        `<div class="row">
            <div class="col">
                <input type="text" id="ingredient${element.item}" class="form-control" name="ingredient[]" required>
                <input type="hidden" name="ingredientID[]" value=${element.id}>
            </div>
            <div class="col">
                <input type="number" step="0.001" id="qty${element.item}" class="form-control" name="qty[]" required>
            </div>
            <div class="col">
                <select class="form-control" id="unit${element.item}" name="unit[]" required>
                    <option selected>Select unit</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                    <option value="Pc">Pc</option>
                </select>
            </div>
            <div class="col">
                <button type="button" name=${element.id} class="btn btn-primary" onclick="delete_ingredient(event)">Delete</button>
            </div>
        </div>`;
    });
    recipe_list += '</div>';
    recipe_list +=   
                    `<button type="submit" class="btn btn-primary" onclick="add_ingredient(event)">Add an Ingredient</button>
                    <button type="submit" class="btn btn-primary">Submit your Recipe</button>`
    
    document.getElementById('recipe_list').innerHTML = recipe_list;
    ingredient.forEach(element => {
        document.getElementById(`ingredient${element.item}`).value = `${element.item}`
        document.getElementById(`qty${element.item}`).value = `${element.qty}`
        document.getElementById(`unit${element.item}`).value = `${element.unit}`
    })
}
// Trigger the function when the page is first loaded
generate_recipe_list();


const delete_ingredient = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ingredient_id", `${event.originalTarget.name}`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://recipemanagerlife.herokuapp.com/delete_ingredient", requestOptions)
    // fetch("http://localhost:8080/delete_ingredient", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        location.reload();
    })
    .catch(error => console.log('error', error));
}

const add_ingredient = (event) => {
    event.preventDefault();
    empty_ingredient = ingredient_form()
    document.getElementById('form_ingredient').insertAdjacentHTML('beforeend',empty_ingredient);
}

const ingredient_form = () => {
    empty_ingredient = 
    `<div class="row">
        <div class="col">
            <input type="text" class="form-control" placeholder="Ingredient" name="ingredient[]" required>
            <input type="hidden" name="ingredientID[]" value="Null">
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
    // ' <p>hello</p> '
    return empty_ingredient;
}