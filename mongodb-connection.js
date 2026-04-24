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

function randomId(existingIds) {
  let id = Math.floor(Math.random() * 1000000);
  while (existingIds.includes(id)) {
    id = Math.floor(Math.random() * 1000000);
  }
  return id;
}

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
      const response = await db.collection("budget").deleteOne({ "_id": ObjectId(data) });
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
          $match: {
            date: {
              $gte: new Date(new Date().getFullYear(), 0, 1).getTime(),
              $lt: new Date(new Date().getFullYear() + 1, 0, 1).getTime()
            }
          }
        },
        {
          $group: {
            _id: {
              $month: {
                $toDate: "$date"
              }
            },
            "total": {
              $sum: "$money"
            },
            "income": {
              $sum: { 
                $cond: [{ $gt: ["$money", 0] }, "$money", 0]
              }
            },
            "expenditure": {
              $sum: {
                $cond: [{ $lt: ["$money", 0] }, "$money", 0]
              }
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
  },

  // ---------- Vehicles ----------
  getAllVehicles: async function () {
    try {
      await client.connect();
      return await db.collection("vehicles").find({}).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  getVehicle: async function (id) {
    try {
      await client.connect();
      return await db.collection("vehicles").findOne({ id: Number(id) });
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  insertVehicle: async function (data) {
    try {
      await client.connect();
      const vehicles = db.collection("vehicles");
      const existing = await vehicles.find({}, { projection: { id: 1 } }).toArray();
      const vehicle = {
        id: randomId(existing.map(v => v.id)),
        targa: data.targa,
        marca: data.marca,
        modello: data.modello,
        specifica: data.specifica,
        km: Number(data.km) || 0,
        notifications: []
      };
      await vehicles.insertOne(vehicle);
      return vehicle;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  deleteVehicle: async function (id) {
    try {
      await client.connect();
      const response = await db.collection("vehicles").deleteOne({ id: Number(id) });
      return response.deletedCount;
    } catch (error) {
      console.log(error);
      return 0;
    } finally {
      await client.close();
    }
  },
  updateVehicleKm: async function (id, km) {
    try {
      await client.connect();
      const vehicles = db.collection("vehicles");
      const result = await vehicles.findOneAndUpdate(
        { id: Number(id) },
        { $set: { km: Number(km) } },
        { returnDocument: 'after' }
      );
      return result.value;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  addNotification: async function (vehicleId, notification) {
    try {
      await client.connect();
      const vehicles = db.collection("vehicles");
      const vehicle = await vehicles.findOne({ id: Number(vehicleId) });
      if (!vehicle) return null;
      const existingIds = (vehicle.notifications || []).map(n => n.id);
      const notif = { id: randomId(existingIds), ...notification };
      await vehicles.updateOne(
        { id: Number(vehicleId) },
        { $push: { notifications: notif } }
      );
      return notif;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  getNotification: async function (vehicleId, notifId) {
    try {
      await client.connect();
      const vehicle = await db.collection("vehicles").findOne({ id: Number(vehicleId) });
      if (!vehicle) return { vehicle: null, notification: null };
      const notification = (vehicle.notifications || []).find(n => n.id === Number(notifId)) || null;
      return { vehicle, notification };
    } catch (error) {
      console.log(error);
      return { vehicle: null, notification: null };
    } finally {
      await client.close();
    }
  },
  updateNotification: async function (vehicleId, notifId, notification) {
    try {
      await client.connect();
      const vehicles = db.collection("vehicles");
      const updated = { id: Number(notifId), ...notification };
      const result = await vehicles.updateOne(
        { id: Number(vehicleId), "notifications.id": Number(notifId) },
        { $set: { "notifications.$": updated } }
      );
      if (result.matchedCount === 0) return null;
      return updated;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  },
  deleteNotification: async function (vehicleId, notifId) {
    try {
      await client.connect();
      const result = await db.collection("vehicles").updateOne(
        { id: Number(vehicleId) },
        { $pull: { notifications: { id: Number(notifId) } } }
      );
      return result.modifiedCount;
    } catch (error) {
      console.log(error);
      return 0;
    } finally {
      await client.close();
    }
  },
  markNotificationDone: async function (vehicleId, notifId, km, data) {
    try {
      await client.connect();
      const vehicles = db.collection("vehicles");
      const set = {};
      if (km !== undefined) set["notifications.$.ultimaRegistrazioneKm"] = Number(km);
      if (data !== undefined && data !== null) set["notifications.$.ultimaRegistrazioneData"] = data;
      if (Object.keys(set).length === 0) {
        const vehicle = await vehicles.findOne({ id: Number(vehicleId) });
        if (!vehicle) return null;
        return (vehicle.notifications || []).find(n => n.id === Number(notifId)) || null;
      }
      const result = await vehicles.findOneAndUpdate(
        { id: Number(vehicleId), "notifications.id": Number(notifId) },
        { $set: set },
        { returnDocument: 'after' }
      );
      if (!result.value) return null;
      return (result.value.notifications || []).find(n => n.id === Number(notifId)) || null;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  }
}

module.exports = MongoAgent;
