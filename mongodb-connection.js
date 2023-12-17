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
const ObjectId = require('mongodb').ObjectId;

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
  deleteOne: async function deleteOne(data) {
    try {
      await client.connect();
      const response = await db.collection("budget").deleteOne({ "_id" : ObjectId(data) });
      console.log(`Il documento con id ${data} è stato eliminato correttamente.`);
      return 200;
    } catch (error) {
      console.log("Operazione fallita. ", error);
      return 500;
    } finally {
      await client.close();
    }
  },
  getAll: async function getAll() {
    try {
      await client.connect();
      const budget = db.collection("budget");
      return await budget.find({}).sort({ $natural: -1 }).toArray();
    } catch (error) {
      console.log(error)
    } finally {
      await client.close();
    }
  },
  getLastTen: async function getLastTen() {
    try {
      await client.connect();
      const budget = db.collection("budget");
      return await budget.find({}).sort({ $natural: -1 }).limit(10).toArray();
    } catch (error) {
      console.log(error)
    } finally {
      await client.close();
    }
  },
  getAllByMonth: async function () {
    try {
      await client.connect();
      const budget = db.collection("budget");
      const aggCursor = budget.aggregate([
        {
          $group: {
            _id: {
              $month: {
                $toDate: "$date"
              }
            },
            "total": {
              $sum: "$money"
            }
          }
        }
      ]).sort({ _id: 1 })

      let list = [];
      for await (const doc of aggCursor) {
        list.push(doc);
      }

      return list;
    } catch (error) {
      console.log(error)
    } finally {
      await client.close();
    }
  }
}

module.exports = MongoAgent;