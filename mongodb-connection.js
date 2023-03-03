const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mycluster.ed48vnx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
const db = client.db("budget_management");

const MongoAgent = {
  insertOne: async function insertOne(data) {
    try {
      await client.connect();
      const response = await db.collection("budget").insertOne(data);
      console.log(`Il documento con id ${response.insertedId} è stato inserito correttamente.`);
    } catch (error) {
      console.log("Operazione fallita. ", error);
    } finally {
      await client.close();
    }
  },
  getAll: async function getAll() {
    try {
      await client.connect();
      const budget = db.collection("budget");
      return await budget.find({}).toArray();
    } catch (error) {
      console.log(error)
    } finally {
      await client.close();
    }
  },
}

module.exports = MongoAgent;