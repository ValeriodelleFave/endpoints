const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mycluster.ed48vnx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db("budget_management");

const MongoAgent = {
    connect: function connect() {
        client.connect().finally(() => {
            console.log("Connessione Mongo");
        });
    },
    insertOne: async function insertOne(data) {
      try {
        const budget = db.collection("budget");
        const result = await budget.insertOne(data);
      } finally {
        console.log("Operazione di inserimento inviata");
      }
    },
    disconnect: function disconnect() {
        client.close().finally(() => {
            console.log("Disconnessione Mongo");
        });
    }
}

module.exports = MongoAgent;
