const path = require("path");

// Set the table name in the database to the filename with an s appended
const TABLE_NAME = path.basename(__filename, path.extname(__filename)) + "s";
// const TABLE_NAME = "items"; // Uncomment this line if you want to hardcode the table name

const { connectToDatabase } = require("../db/conn");
const { ObjectId } = require("mongodb");

// Get all items
exports.getAll = async function getAll() {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.find({}).toArray();
}

// Get all items with a filter applied
exports.getAllByFilter = async function getAllByFilter(filter) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.find(filter).toArray();
};

// Get the last x items
exports.getLatest = async function getLatest(x) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.aggregate([
        { "$sort": { "_id": 1 } },  // Sort by _id in ascending order (insertion order)
        { "$limit": x }             // Limit the results to the last x items
    ]).toArray();
}

// Create a new item
exports.createNewItem = async function createNewItem(item) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.insertOne(item);
}

// Create multiple new items
exports.createNewItems = async function createNewItems(items) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.insertMany(items);
}

// Get a single item by ID
exports.getById = async function getById(id) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.findOne({ _id: new ObjectId(id) });
}

// Delete a post by ID
exports.deleteById = async function deleteById(id) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.deleteOne({ _id: new ObjectId(id) });
}

// Update a post by ID
exports.updateById = async function updateById(id, updateData) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
};
