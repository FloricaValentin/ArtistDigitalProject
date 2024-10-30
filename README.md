This is a web application to manage a Digital Portfolio.

This app is built with Nest.js for the backend and React.js for the front end with bootstrap for styling and PostgreSQL as database.

Steps to run it :

-Clone the repo 

- Go to server folder and install dependencies using  npm install 

-Set your database with a .env file  

- Go to client folder and install dependencies using npm install 

API Endpoints : 

Get : 'http://localhost:5000/portfolio'

Post: 'http://localhost:5000/portfolio/:id'

Put: 'http://localhost:5000/portfolio/:id'

Delete : 'http://localhost:5000/portfolio/:id'

For hidding projects: http://localhost:5000/portfolio/:id/toggle-visibility

Showing hidden projects: http://localhost:5000/portfolio/show-hidden
