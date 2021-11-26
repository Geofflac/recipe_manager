# Recipe Manager Life

#### URL : https://recipemanagerlife.herokuapp.com/

#### Video Demo:  https://youtu.be/zy2LF7-J85w

#### Description:

Every week, the same question arises at home, what are we eating the next few days?? To answer this question, usually, we try to remember what recipes we can cook, try to recall each ingredient for each recipe, check what we already have in the fridge, while at the same time, trying to add each ingredient to the online basket... Not a nice procedure that remains the same every week...

This project is a full-stack web app that tackles this pain point and eases this process.

what has been implemented is one page with a monthly calendar where for every day we can add a recipe for each day. The recipe selectable is from a personal list of recipes filled by the user.

Once the calendar is filled, we can generate a list of all the required ingredients.

This makes it is easier to check what ingredients are already stocked are no longer needed to purchase, it eases also the online purchase by providing support to refer to.

To manage the recipe, the app can store them, and allow to add/delete and edit the recipe as needed.

The app has been deployed onto Heroku platform. Heroku was chosen due to its popularity, stability, free of usage, and easy to use for novices.

To develop this app, it was chosen a language that seems to gain in popularity and is common between front end and back end - JavaScript.

Therefore, the back end was built on Node.js with the Express framework.

To store the data, we used MySQL Database by using an add-on from Heroku - ClearDB MySQL. MySQL was chosen as I was familiar with the queries structures.

To write the code it was used VScode.

The structure code of the file is as follow :

>data

>>database.js

This file is to connect to the database. The .env parameters are used here to set the connection.
To maintain the connection, it used constant dummy requests every 5s (ClearDB shutdown connection after 1mn without query). To help this matter as well, the method "createPool" for the database connection provides better stability.

>>recipedb.js

This file contains all the functions that send queries to the database to request, add, edit and delete the data.
ASYNC / AWAIT functions are used to let the code wait for the server reply.

>node modules

Contain all the modules for the dependencies used for this project

>Other docs

A ppt file that contains the source image for this app

>Views

Contain the public files

>>Images

List if images used for the app

>>>404.png

>>>Full logo.png

>>>Logo.ico

>>js

>>>edit_recipe.js

File sent with the page edit_recipe.ejs
Generate the form with the given information from the server ( ejs parameters ). It will prefill the input value by the value found in the database. The submit button will send a  POST request to the server to edit the recipe.
There is a function defined to delete a particular ingredient ( POST request sent to the server)
There is a function to add an ingredient.

>>>index.js

Generate the calendar (table) with the recipe list received by the server (GET request).
ASYNC / AWAIT functions are used to let the code wait for the server reply.
A function is set to generate the list of ingredients from the recipes selected in the calendar. It goes through the table to detect each recipe.

>>>recipe.js

Generate the list of recipes (form) with the recipe and the ingredient list received from the server.
ASYNC / AWAIT functions are used to let the code wait for the server reply.
There is a function to add a recipe to the database. This function will generate a new form at the bottom of the page that can be posted to the server.
There is a function to delete the recipe from the server by sending a POST request.

>>Stylesheet

CSS style used for this app

>>>index.css

>>404.html

page created to be rendered if the get request received as no given route in the server.

>>edit_recipe.ejs

It was chosen for the edit recipe page to use an HTML template framework with ejs. The properties are given by the server and rendered on the page. It helps to provide a more dynamic response as all information to the client is sent at once. In that case from the recipe ID sent from the client in the URI, the recipe and its ingredient are given in the ejs parameters.

>>index.html

The main page that contains the calendar with the recipe selection

>>recipe.html

Recipe page that contains all the recipes declared in the database

>.env

Contains the credentials to connect to the database

>.gitignore

The common file for git to not commit unwanted files such as the node modules or the .env

>package-lock.json

The common file for node.js to list the dependencies for this project.

>package.json

The common file for node.js that define the project,

>Procfile

This file is here to start the server automatically once the app is deployed on Heroku by running the command "node server.js".

>server.js

The main file for the back-end, that creates the server and handles the different routes.
ASYNC / AWAIT functions are used to let the code wait for the database to reply. It also helps to catch an error and send it back to the client.

```
