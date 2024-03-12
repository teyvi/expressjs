import { Router } from "express";
import { MongoClient } from "mongodb";


const router = Router();
const url ='mongodb+srv://todo-api:VWktQFGDYXvsYMjY@todo-app-api.3icpqut.mongodb.net/?retryWrites=true&w=majority&appName=Todo-APP-APi';

const client = new MongoClient(url);

//define routes 
router.post('/todos', async (req,res) => {
    //connect mongodb client
    await client.connect();

    // Get access to todo database
    const db = client.db('todo-db');

    // Get access to todos collection
    const collection = db.collection('todos');

    // Add to do document to todos collection
    const result = await collection.insertOne(req.body);

    // Disconnect mongodb client
    await client.close();

    // Return response
    res.json(result);
});

router.get('/todos', (req,res) => {
    res.send('Get all todos!')
});

router.delete('/todos', (req,res) => {
    res.send('Delete all todos!')
});
router.get('/todos/:id', (req,res) => {
    res.send(`Get todo with id:${req.params.id}`)
});

router.patch('/todos/:id', (req,res) => {
    res.send(`Update todo with id:${req.params.id}`)
});

router.delete('/todos/:id', (req,res) => {
    res.send(`Remove todo with id:${req.params.id}`)
});
//export router
export default router;