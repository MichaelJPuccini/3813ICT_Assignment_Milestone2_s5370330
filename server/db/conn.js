const { MongoClient } = require("mongodb");

const databaseName = process.env.DB_NAME || "";
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      // db = client.db("sample_training");
      db = client.db(databaseName);
      console.log("Connected to database");
    } catch (e) {
      console.error(e);
    }
  }
  return db;
}

module.exports = { connectToDatabase };
