// Set the table name in the database to the filename with the trailing s trimmed
const path = require("path");
let modelName = path.basename(__filename, path.extname(__filename));
if (modelName.endsWith("s")) {          // Convention: If the filename ends with an s, remove the trailing s
    modelName = modelName.slice(0, -1);
}
const MODEL_FILENAME = path.join(__dirname, "../models", modelName);
const model = require(MODEL_FILENAME);
// const model = require("../models/product"); // Use this line instead if you want to manually set the name of the model file

// Load the user model
const userModel = require('../models/user'); // Adjust the path as necessary

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
    console.log("New Channel: ", item);
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

// Returns all channels in the group that the user is a member of
// If the user is a SuperUser, returns all channels

exports.getMyChannels = async (req, res) => {
    const { userId, groupId } = req.params;
    console.log("Getting My Channels: User ID: ", userId, " Group ID: ", groupId);
    try {
        // Load the user
        const user = await userModel.getById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is a SuperUser
        if (user.role === 'SuperUser') {
            // Return all channels in the group if the user is a SuperUser
            const allChannels = await model.getAll();
            const allGroupChannels = allChannels.filter(channel => channel.groupId === groupId);
            return res.status(200).json(allGroupChannels);
        } else {
            // Filter channels where the user's userId is in the userIds array and groupId matches
            const allChannels = await model.getAll();
            const allGroupChannels = allChannels.filter(channel => channel.groupId === groupId);
            const userChannels = allGroupChannels.filter(channel => channel.userIds.includes(userId));
            return res.status(200).json(userChannels);
        }
    } catch (error) {
        console.error("Error fetching channels:", error);
        return res.status(500).json({ error: "Failed to fetch channels" });
    }
};

// Add a user to a group
exports.addUser = async (req, res) => {
    console.log("Adding user to channel");
    const userId = req.params.userId;
    const channelId = req.params.channelId;
    // const { groupId, userId } = req.body;
    console.log("Adding user to channel. channelId: ", channelId, " User ID: ", userId);

    try {
        // Load the group
        const channel = await model.getById(channelId);

        if (!channel) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is already in the group
        if (!channel.userIds.includes(userId)) {
            // Add the user to the channel
            channel.userIds.push(userId);

            // Update the channel
            await model.updateById(channelId, channel);

            return res.status(200).json({ message: "User added to channel successfully" });
        } else {
            return res.status(400).json({ error: "User is already in the channel" });
        }
    } catch (error) {
        console.error("Error adding user to channel:", error);
        return res.status(500).json({ error: "Failed to add user to channel" });
    }
};

// Remove a user from a group
exports.removeUser = async (req, res) => {
    const userId = req.params.userId;
    const channelId = req.params.channelId;
    // const { groupId, userId } = req.body;

    try {
        // Load the group
        const channel = await model.getById(channelId);

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        // Check if the user is in the group
        if (channel.userIds.includes(userId)) {
            // Remove the user from the channel
            channel.userIds = channel.userIds.filter(id => id !== userId);

            // Update the channel
            await model.updateById(channelId, channel);

            return res.status(200).json({ message: "User removed from channel successfully" });
        } else {
            return res.status(400).json({ error: "User is not in the channel" });
        }
    } catch (error) {
        console.error("Error removing user from channel:", error);
        return res.status(500).json({ error: "Failed to remove user from channel" });
    }
};

// Add an admin to a group
exports.addAdmin = async (req, res) => {
    const userId = req.params.userId;
    const channelId = req.params.channelId;
    // const { groupId, userId } = req.body;

    try {
        // Load the group
        const channel = await model.getById(channelId);

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        // Check if the user is already an admin
        if (!channel.adminIds.includes(userId)) {
            // Add the user to the channel
            channel.adminIds.push(userId);

            // Update the channel
            await model.updateById(channelId, channel);

            return res.status(200).json({ message: "Admin added to channel successfully" });
        } else {
            return res.status(400).json({ error: "User is already an admin" });
        }
    } catch (error) {
        console.error("Error adding admin to channel:", error);
        return res.status(500).json({ error: "Failed to add admin to channel." });
    }
};

// Remove an admin from a group
exports.removeAdmin = async (req, res) => {
    const userId = req.params.userId;
    const channelId = req.params.channelId;
    // const { groupId, userId } = req.body;

    try {
        // Load the group
        const channel = await model.getById(channelId);

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        // Check if the user is an admin
        if (channel.adminIds.includes(userId)) {
            // Remove the user from the channel
            channel.adminIds = channel.adminIds.filter(id => id !== userId);

            // Update the channel
            await model.updateById(channelId, channel);

            return res.status(200).json({ message: "Admin removed from channel successfully" });
        } else {
            return res.status(400).json({ error: "User is not an admin" });
        }
    } catch (error) {
        console.error("Error removing admin from channel:", error);
        return res.status(500).json({ error: "Failed to remove admin from channel" });
    }
};
