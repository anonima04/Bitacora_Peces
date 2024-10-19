import { greet } from './module.js';
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;

const uri = "mongodb+srv://dg5380523:<db_password>@bitacorapeces.n0i9p.mongodb.net/?retryWrites=true&w=majority&appName=BitacoraPeces";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("your_db_name").collection("your_collection_name");
    const data = await collection.find({}).toArray();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to the database');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

run().catch(console.dir);
