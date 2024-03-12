import express from "express";
import bodyParser from "body-parser";
import todosRoutes from "./routes/todos.routes.js";

//Create express App
const app = express();

//Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//Use routes
app.use(todosRoutes);

//Listen for incoming requests
app.listen(4000, () => {
    console.log ("Express App is running!")
});