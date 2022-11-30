const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vdellefave:admin@mycluster.ed48vnx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const MongoAgent = {
    insertOne: async function insertOne(data) {
      await client.connect();
      try {
        const budget = client.db("budget_management").collection("budget");
        const result = await budget.insertOne(data);
        console.log(`A document was inserted with the _id: ${result}`);
      } finally {
        await client.close();
      }
    }
}

module.exports = MongoAgent;
