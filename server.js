const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    next();
});

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});



// TODO: MongoDB Connection
/**
const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {

    const uri = "mongodb+srv://vdellefave:<dellefave>@cluster0-test.bqnwg.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    //await client.connect(err => {
    //    const collection = client.db("test").collection("devices");
    //    // perform actions on the collection object
    //    client.close();
    //});

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 */