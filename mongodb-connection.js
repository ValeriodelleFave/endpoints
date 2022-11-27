const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vdellefave:admin@mycluster.ed48vnx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://vdellefave:<password>@mycluster.ed48vnx.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


class MongoAgent {

    // Create a MongoDB connection
    static async connect() {
        try {
            await client.connect();
            console.log("Connected to MongoDB")
        } catch (error) {
            console.error(error);
        }
        
    }
    
    //Delete a MongoDB connection
    static async disconnect() {
        try {
            await client.close();
            console.log("Closed MongoDB connection")
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Insert data into MongoDB database
     * @param database string
     * @param collection string
     * @param data any
     */
    static async insert(database, collection, data) {
        await this.connect();
        try {
            const db = client.db(database);
            const col = db.collection(collection);
            col.insertOne(data);
        } catch (error) {
            console.log(error);
        } finally {
            await this.disconnect();
        }
    }

}

MongoAgent.connect()