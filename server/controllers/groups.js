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

// Create a new item
exports.createNewItem = async (req, res) => {
    let item = req.body;
    // if there is no data in the request body, return an error
    // console.log("New Item: ", item);
    // if item is an empty object, return an error
    if (!item || Object.keys(item).length === 0) {
        // console.log("No data in the request body");
        return res.status(400).json({ error: "Failed to create item: No data in the request body" });
    }
    // if the name is missing or empty, return an error
    if (!item.name || item.name.trim() === "") {
        // console.log("Missing name");
        return res.status(400).json({ error: "Failed to create item: Missing name" });
    }

    // If there is no creatorId, return an error
    if (!item.creatorId) {
        return res.status(400).json({ error: "Failed to create item: Missing creatorId" });
    }

    // If there is no userIds array, add an empty array
    if (!item.userIds) {
        item.userIds = [];
    }

    // If there is no adminIds array, add an empty array
    if (!item.adminIds) {
        item.adminIds = [];
    }

    // If there are no channelIds, add an empty array
    if (!item.channelIds) {
        item.channelIds = [];
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
// exports.createNewItems = async (req, res) => {
//     const items = req.body;
//     try {
//         const result = await model.createNewItems(items);
//         res.status(201).json(result.ops);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create items" });
//     }
// };

// Get a single item by ID
exports.getById = async (req, res) => {
    const id = req.params.id;

    // If the ID is not a valid ObjectId, return an error
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

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

// Return all groups that the user is a member of
// If the user is a SuperUser, return all groups
exports.getMyGroups = async (req, res) => {
    const userId = req.params.userId;
    // console.log("Getting my groups. User ID: ", userId);

    // If the ID is not a valid ObjectId, return an error
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        // Load the user
        const user = await userModel.getById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is a SuperUser
        if (user.role === 'SuperUser') {
            // Return all groups if the user is a SuperUser
            const allGroups = await model.getAll();
            return res.status(200).json(allGroups);
        } else {
            // Filter groups where the user's userId is in the userIds array
            const allGroups = await model.getAll();
            const userGroups = allGroups.filter(group => group.userIds.includes(userId));
            return res.status(200).json(userGroups);
        }
    } catch (error) {
        console.error("Error fetching groups:", error);
        return res.status(500).json({ error: "Failed to fetch groups" });
    }
};

// Add a user to a group
exports.addUserToGroup = async (req, res) => {
    console.log("Adding user to group");
    const userId = req.params.userId;
    const groupId = req.params.groupId;

    // If the UserID or GroupID is not a valid ObjectId, return an error
    if (!userId.match(/^[0-9a-fA-F]{24}$/) || !groupId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    // const { groupId, userId } = req.body;
    console.log("Adding user to group. Group ID: ", groupId, " User ID: ", userId);

    try {
        // Load the group
        const group = await model.getById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is already in the group
        if (!group.userIds.includes(userId)) {
            // Add the user to the group
            group.userIds.push(userId);

            // Update the group
            await model.updateById(groupId, group);

            return res.status(200).json({ message: "User added to group successfully" });
        } else {
            return res.status(400).json({ error: "User is already in the group" });
        }
    } catch (error) {
        console.error("Error adding user to group:", error);
        return res.status(500).json({ error: "Failed to add user to group" });
    }
};

// Remove a user from a group
exports.removeUserFromGroup = async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    // const { groupId, userId } = req.body;

    // If the UserID or GroupID is not a valid ObjectId, return an error
    if (!userId.match(/^[0-9a-fA-F]{24}$/) || !groupId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        // Load the group
        const group = await model.getById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is in the group
        if (group.userIds.includes(userId)) {
            // Remove the user from the group
            group.userIds = group.userIds.filter(id => id !== userId);

            // Update the group
            await model.updateById(groupId, group);

            return res.status(200).json({ message: "User removed from group successfully" });
        } else {
            return res.status(400).json({ error: "User is not in the group" });
        }
    } catch (error) {
        console.error("Error removing user from group:", error);
        return res.status(500).json({ error: "Failed to remove user from group" });
    }
};

// Add an admin to a group
exports.addAdminToGroup = async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    // const { groupId, userId } = req.body;

    // If the UserID or GroupID is not a valid ObjectId, return an error
    if (!userId.match(/^[0-9a-fA-F]{24}$/) || !groupId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }
    
    try {
        // Load the group
        const group = await model.getById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is already an admin
        if (!group.adminIds.includes(userId)) {
            // Add the user to the group
            group.adminIds.push(userId);

            // Update the group
            await model.updateById(groupId, group);

            return res.status(200).json({ message: "Admin added to group successfully" });
        } else {
            return res.status(400).json({ error: "User is already an admin" });
        }
    } catch (error) {
        console.error("Error adding admin to group:", error);
        return res.status(500).json({ error: "Failed to add admin to group" });
    }
};

// Remove an admin from a group
exports.removeAdminFromGroup = async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    // const { groupId, userId } = req.body;

    // If the UserID or GroupID is not a valid ObjectId, return an error
    if (!userId.match(/^[0-9a-fA-F]{24}$/) || !groupId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        // Load the group
        const group = await model.getById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is an admin
        if (group.adminIds.includes(userId)) {
            // Remove the user from the group
            group.adminIds = group.adminIds.filter(id => id !== userId);

            // Update the group
            await model.updateById(groupId, group);

            return res.status(200).json({ message: "Admin removed from group successfully" });
        } else {
            return res.status(400).json({ error: "User is not an admin" });
        }
    } catch (error) {
        console.error("Error removing admin from group:", error);
        return res.status(500).json({ error: "Failed to remove admin from group" });
    }
};


