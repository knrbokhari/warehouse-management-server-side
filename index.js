const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// dotenv
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lncme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client.db("inventory").collection("product");
    const serviceCollection = client.db("ourServise").collection("service");

    // loading all product
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // loading all service
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    //
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
