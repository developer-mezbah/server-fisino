require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// middleware
app.use(cors());

app.use(express.json());
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("Fisino");
    const servicesCollection = database.collection("Services");

    app.get("/services", async (req, res) => {
      const query = {};
      const services = await servicesCollection.find(query).toArray();
      res.send(services);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);

// app.post("/example", (req, res) => {
//   const dataFromClient = req.body;
//   res.send("Data received and processed successfully");
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
