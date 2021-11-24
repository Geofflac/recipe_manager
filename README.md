# Recipe Manager Life

#### Video Demo:  <URL >

#### Description:

Every week, the same question arises at home, what are we eating the next days?? To answer this question, usually we try to remember what recipes we can cook, try to recall each ingredient for each recipes, check what we already have in the fridge, while at the same time, trying to add each ingredient in the online basket... Not a nice procedure that remain the same every week...

This project is a full stack web app that tackle this pain point and ease this process.

what has been implemented is one page with a monthly calendar where for every day we can add a recipe for each day. The recipe selectable are from a personal list of recipes filled by the user.

Once the calendar is filled, we are able to generate a list of all the required ingredients.

This make it is easier to check what ingredients are already stocked are no longer needed to purchase, it eases also the online purchase by providing a support to refer to.

To manage the recipe, the app can store them, and allow to add / delete and edit the recipe as needed.

The app has been deployed onto Heroku platform. Heroku was choose due to its popularity, stability, free of usage and ease to use for novices.

To develop this app, it was chosen a language that seems to gain in popularity and is common between front end and back end - JavaScript.

Therefore, the back end was built on Node.js with the Express framework.

To store the data, we used MySQL Database by using an add-on from Heroku - ClearDB MySQL. MySQL was choose as I was familiar with the queries structures.

To write the code it was used VScode.

The structure code of the file is as follow :

>data

>>database.js

This file is to connect to the database. The .env parameters are used here to set the connection.
To maintain the connection, it was used  constant dummy request every 5s (ClearDB shutdown connection after 1mn without query). To help this matter as well, the method "createPool" for the database connection provide better stability.

>>recipedb.js

This file contain all the function that send query to the database to request, add, edit and delete the data.
ASYNC / AWAIT function are used to let the code wait for the server reply.

>node modules

Contain all the modules for the dependancies used for this project

>Other docs

A ppt file that containes the source image for this app

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
Generate the form with the given information from the server ( ejs parameters ). It will prefill the input value by the value found in the database. The submit button will sent  POST reaqest to the server to edit the recipe.
There is a function defined to delete a particular ingredient ( POST request sent to the server)
There is a function to add an ingredient.

>>>index.js

Generate a the calendar (table) with the recipe list recived by the server (GET request).
ASYNC / AWAIT function are used to let the code wait for the server reply.
A function is set to generate the list of ingredient from the recipes selected in the calendar. It goes through all the table to detect each recipe.

>>>recipe.js

Generate the list of recipe (form) witht the recipe and the ingredient list received from the server.
ASYNC / AWAIT function are used to let the code wait for the server reply.
There is a function to add a recipe to the database. This function will generate a new form at the botton of the page that can be posted to the server.
There is a function to delete the recipe fron the server by sending a POST request.

>>Stylesheet

CSS style used for this app

>>>index.css

>>404.html

page created to be rendered if the get request received as no given route in the server.

>>edit_recipe.ejs

It was chosen for the edit recipe page to use a HTML template framework with ejs. The properties are given by the server and rendered in the page. It helps to provide a more dynamic response as all information to the client are sent at once. In that case from the recipe ID sent from the client in the URI, the recipe and its ingredient are given in the ejs paramaters.

>>index.html

Main page that contains the calendar with the recipe selection

>>recipe.html

Recipe page that contains all the recipe declared in the database

>.env

Contains the credentials to connect to the database

>.gitignore

Common file for git to not commit unwanted files such as the node modules or the .env

>package-lock.json

Common file for node.js to list the dependencies for this project.

>package.json

Common file for node.js that define the project,

>Procfile

This file is here to start the server automatically once the app is deployed on heroku by running the command "node server.js".

>server.js

The main file for the back-end, it create the server and handles the different routes.
ASYNC / AWAIT function are used to let the code wait for the database to reply. It also help to catch error and send it back to the client.

```
