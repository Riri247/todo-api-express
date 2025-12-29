//Load Express 
const express = require('express');
//Routes
const taskRoutes = require('./routes/tasks');

//Middleware
const jsonParser = require('./middleware/jsonParser');
const validateJsonSyntax = require('./middleware/validateJson');
const errorHandler = require('./middleware/errorHandler');
/*
So we create a constant variable express and assign it the express library containing middleware functions
*/

//create app
const app = express();
//JOSN parsing middleware
app.use(jsonParser);

//Invalid JSON parsing middleware
app.use(validateJsonSyntax);

app.use('/tasks',taskRoutes);

//GLOBAL ERROR HANDLER - MUST COME AFTER ROUTES
app.use(errorHandler);

//Port 
const PORT = 3000;



/*
then we use the app variable to call the use function from npm, and pass the express.json
function as the parameter, allowing the server to use middleware to parse JSON requests and JSON is JavaScript Object
Notation, a format used to send data between frontend and backend, so without this part the  frontend wouldn't be able
to communicate with the backend.
*/




//Start server
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
/*
Then we use the app.listen to listen to the port and print to console or 
terminal.
*/