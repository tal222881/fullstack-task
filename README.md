![](cymptom_logo.svg)
&nbsp;

# Cymptom Fullstack Candidate Task

## On-demand autocomplete using Angular 8 & NodeJS
In the following task you are going to build a simple web-page containing an autocomplete component. This component will fetch it's data using your NodeJS backend.


## Shopping cart task summary

You are going to build a simple "shopping" page where user can enter names of products he wishes to buy in an "autocomplete" component. When the user selected an item, that item will be added to the table dynamically.

Note that whenever the user types something in the autocomplete component, all data will be filtered and fetches on the NodeJS server.


### Frontend Requirements

The framework we are going to use on the frontend will be Angular 8+.

You are required to build a webpage containing the following:

- An autocomplete component which fetches data from NodeJS server. On each keystroke, new data will be fetched from the server (containing at least 20 products), the data must be filtered on the server sent, and for each change in the autocomplete, new data will be fetched from the server.

When the user hits enter to select an item, the selected product from the autocomplete will be added to a table.

- The table will be a simple HTML table which renders only the items added to the list from the autocomplete. It must show the following rows: "Name, Price, Picture".


### Backend Requirements

You are going to use NodeJS with Express in order to build the server side.

We have provided a file called 'products.json' in the repository, use it to load all of the products list into your NodeJS server.

On the server site, simply create an API which allows fetching all of the products which fit the filtered keyword.

For example, if the user searches for the query: "yo" all of the products suitable for this phrase will (for example: yo-yo, yoga ball) be returned with their data.

### General guidelines and flow of work
- You should work with GitHub repository to store and manage your code.
- You should be using Angular 8+ and NodeJS typescript.
- You are required to write your code using OOP concepts
- Document your code as much as needed

### Before starting this task
- Fork this repository ([https://github.com/shynet-cymptom/fullstack-candidate-task](https://github.com/shynet-cymptom/fullstack-candidate-task)).
- Send a link to the forked github repository to: itamar@cymptom.com .

**Good luck!**
