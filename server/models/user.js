const path = require("path");
// Set the table name in the database to the filename with an s appended
const TABLE_NAME = path.basename(__filename, path.extname(__filename)) + "s";
// const TABLE_NAME = "items"; // Uncomment this line if you want to hardcode the table name
const AUTH_TABLE_NAME = 'auth';
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

const jwt = require('jsonwebtoken');
// const tokenExpireTime = '12h';

const { connectToDatabase } = require("../db/conn");
const { ObjectId } = require("mongodb");

// Get all items
exports.getAll = async function getAll() {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);

    // Filter out the password and email fields
    const projection = { password: 0, email: 0 };

    return collection.find({}, { projection }).toArray();
    // return collection.find({}).toArray();
}

// Get all items with a filter applied
exports.getAllByFilter = async function getAllByFilter(filter) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.find(filter).toArray();
};

// Get the last x items
// exports.getLatest = async function getLatest(x) {
//     const db = await connectToDatabase();
//     const collection = db.collection(TABLE_NAME);
//     return collection.aggregate([
//         { "$sort": { "_id": 1 } },  // Sort by _id in ascending order (insertion order)
//         { "$limit": x }             // Limit the results to the last x items
//     ]).toArray();
// }

// Create a new item
exports.createNewItem = async function createNewItem(item) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);
    return collection.insertOne(item);
}

// Create multiple new items
// exports.createNewItems = async function createNewItems(items) {
//     const db = await connectToDatabase();
//     const collection = db.collection(TABLE_NAME);
//     return collection.insertMany(items);
// }

// Get a single item by ID
exports.getById = async function getById(id) {
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);

    // Filter out the password and email fields
    const projection = { password: 0, email: 0 };

    return collection.findOne({ _id: new ObjectId(id) }, { projection });
    // return collection.findOne({ _id: new ObjectId(id) });
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

// Attempt Login
// exports.attemptLogin = async function attemptLogin(name, password) {
//     const db = await connectToDatabase();
//     const collection = db.collection(TABLE_NAME);

//     // Find the user with the matching username and password
//     const user = await collection.findOne({ name, password });

//     console.log("User: ", user);

//     if (user) {
//         // Generate an auth token
//         const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: tokenExpireTime });

//         // Store the token in the auth table
//         const authCollection = db.collection(AUTH_TABLE_NAME);
//         await authCollection.insertOne({ userId: user._id, token, createdAt: new Date() });

//         // Return the token
//         return token;
//     } else {
//         // Return null or an appropriate response if the login fails
//         return null;
//     }
// };

// Attempt Login
exports.attemptLogin = async function attemptLogin(name, password) {
    // console.log("Attempting to login: ", name, password);
    const db = await connectToDatabase();
    const collection = db.collection(TABLE_NAME);

    // Find the user with the matching username and password
    const user = await collection.findOne({ name, password });

    // console.log("User: ", user);

    if (user) {
        // console.log("User found: ", user);
        return user;
    } else {
        // Return null or an appropriate response if the login fails
        return null;
    }
};


// Logout
exports.logout = async function logout(token) {
    console.log("Attempting to logout: ", token);

    const db = await connectToDatabase();
    const collection = db.collection(AUTH_TABLE_NAME);

    // Delete the token from the auth table
    return collection.deleteOne({ token });
};

// AuthToId function
exports.authToId = async function authToId(token) {
    console.log("AuthToId in Model: ", token);
    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Connect to the database
        const db = await connectToDatabase();
        const authCollection = db.collection(AUTH_TABLE_NAME);

        // Check if the token exists in the auth table
        const authRecord = await authCollection.findOne({ token });

        if (authRecord) {
            // Return the user ID
            return decoded.userId;
        } else {
            // Token not found in the auth table
            throw new Error('Invalid token');
        }
    } catch (error) {
        // Handle token verification errors or other errors
        console.error('Error in authToId:', error);
        throw new Error('Authentication failed');
    }
};
