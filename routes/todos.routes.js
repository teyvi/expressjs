import { Router } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local"] });

const router = Router();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const todoDb = "todo-db";
const todoCollection = "todos";

//define routes
router.post("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  // Get access to todo database
  const db = client.db("todoDb");

  // Get access to todos collection
  const collection = db.collection("todoCollection");

  // Add to do document to todos collection
  const result = await collection.insertOne({
    ...req.body,
    isCompleted: false,
    createdAt: new Date(),
  });

  // Disconnect mongodb client
  await client.close();

  // Return response
  res.json(result);
});

router.get("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  // Get access to todo database
  const db = client.db("todoDb");

  // Find all todos collection
  const collection = db.collection("todoCollection");

  // Find to do document at todos collection
  const limit = parseInt(req.query.limit) || 10;
  const findResult = await collection.find({}).limit(limit).toArray();
  console.log("Found documents =>", findResult);

  // Disconnect mongodb client
  await client.close();

  // Return response
  res.json(findResult);
});

router.delete("/todos", async (req, res) => {
  //connect mongodb client
  await client.connect();

  // Get access to todo database
  const db = client.db("todoDb");

  // Get access to todos collection
  const collection = db.collection("todoCollection");

  // delete todo collection
  const deleteResult = await collection.deleteMany({});
  console.log("Deleted documents =>", deleteResult);

  // Disconnect mongodb client
  await client.close(deleteResult);

  // Return response
  res.json();
});

router.get("/todos/:id", (req, res) => {
  res.send(`Get todo with id:${req.params.id}`);
});

router.patch("/todos/:id", (req, res) => {
  res.send(`Update todo with id:${req.params.id}`);
});

router.delete("/todos/:id", (req, res) => {
  res.send(`Remove todo with id:${req.params.id}`);
});
//export router
export default router;
