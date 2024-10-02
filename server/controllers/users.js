// Set the table name in the database to the filename with the trailing s trimmed
const path = require("path");
let modelName = path.basename(__filename, path.extname(__filename));
if (modelName.endsWith("s")) {          // Convention: If the filename ends with an s, remove the trailing s
    modelName = modelName.slice(0, -1);
}
const MODEL_FILENAME = path.join(__dirname, "../models", modelName);
const model = require(MODEL_FILENAME);
// const model = require("../models/product"); // Use this line instead if you want to manually set the name of the model file

// Get all items
exports.getAll = async (req, res) => {
    try {
        const items = await model.getAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

// Get all items with a filter applied
exports.getAllByFilter = async (req, res) => {
    const filter = req.query;
    try {
        const items = await model.getAllWithFilter(filter);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items with filter" });
    }
};

// Get the last x items
exports.getLatest = async (req, res) => {
    const x = parseInt(req.params.x, 10);
    try {
        const items = await model.getLatest(x);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest items" });
    }
};

// Create a new item
// exports.createNewItem = async (req, res) => {
//     const item = req.body;
//     try {
//         const result = await model.createNewItem(item);
//         res.status(201).json(result.ops[0]);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create item" });
//     }
// };

// Create a new item
exports.createNewItem = async (req, res) => {
    const item = req.body;
    // if there is no data in the request body, return an error
    // console.log("New Item: ", item);
    // if item is an empty object, return an error
    if (!item || Object.keys(item).length === 0) {
        // console.log("No data in the request body");
        return res.status(400).json({ error: "Failed to create item: No data in the request body" });
    }
    try {
        const result = await model.createNewItem(item);
        // console.log('Insert result:', result); // Debugging information
        if (result && result.acknowledged) {
            // const _id = result.insertedId.valueOf();
            // const responseItem = Object.assign({ _id }, item);
            // console.log("item: ", item); // Debugging information
            // console.log('Response Item:', responseItem); // Debugging information
            res.status(201).json(item);
        } else {
            res.status(500).json({ error: "Failed to create item" });
        }
    } catch (error) {
        console.error('Error creating item:', error); // Debugging information
        res.status(500).json({ error: "Failed to create item" });
    }
};

// Create multiple new items
exports.createNewItems = async (req, res) => {
    const items = req.body;
    try {
        const result = await model.createNewItems(items);
        res.status(201).json(result.ops);
    } catch (error) {
        res.status(500).json({ error: "Failed to create items" });
    }
};

// Get a single item by ID
exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await model.getById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item" });
    }
};

// Delete a post by ID
exports.deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await model.deleteById(id);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Item deleted successfully" });
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Failed to delete item" });
    }
};

// Update a post by ID
exports.updateById = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    // Remove _id from the updateData object - For some reason it won't update if the _id is present
    delete updateData._id;

    try {
        const result = await model.updateById(id, updateData);
        // console.log("Result: ", result); // Debugging information
        if (result.matchedCount === 1) {
            res.status(200).json({ message: "Item updated successfully" });
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Failed to update item" });
    }
};

// // Login using attemptLogin
// exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     console.log("Login: ", username, password);
//     try {
//         const token = await model.attemptLogin(username, password);
//         if (token) {
//             res.status(200).json({ token }); // Returns a jwt token if the login is successful
//         } else {
//             res.status(401).json({ error: "Invalid username or password" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Failed to login" });
//     }
// };

// Login using attemptLogin
exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login: ", username, password);
    try {
        const user = await model.attemptLogin(username, password);
        if (user) {
            res.status(200).json({ user }); // Returns the user object if the login is successful
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
};

// Logout using logout
exports.logout = async (req, res) => {
    const token = req.headers.authorization;
    try {
        const result = await model.logout(token);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Logout successful" });
        } else {
            res.status(404).json({ error: "Token not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to logout" });
    }
};

// Convert an auth token to an ID
exports.authToId = async (req, res) => {
    console.log("AuthToId in Controller");

    const token = req.headers.authorization;
    try {
        const id = await model.authToId(token);
        if (id) {
            res.status(200).json({ id });
        } else {
            res.status(404).json({ error: "Token not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to convert token to ID" });
    }
};
