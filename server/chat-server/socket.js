const VERBOSE_CONNETIONS = true;    // Set to true to see Connections/disconnections debug, false to hide them
const VERBOSE_CHAT = true;          // Set to true to see Emitted Messages debug, false to hide them

module.exports = {
    connect: function(io, PORT) {
        var channelsName = [];
        var channelUserCount = [];
        var usersId = [];
        var usersChannel = [];

        io.on('connection',(socket) => {
            // When a connection request comes in putout to the server console
            if (VERBOSE_CONNETIONS)
                console.log('User connected on port ' + PORT + ' socket: ' + socket.id);

            socket.on("joinchannel", (channel) => {
                // If the channel doesn't exist, create it and set usercount to 1
                let channelIndex = channelsName.indexOf(channel);
                if (channelIndex == -1) {
                    channelsName.push(channel);
                    channelUserCount.push(1);
                    channelIndex = channelsName.length - 1;
                } else {
                    channelUserCount[channelIndex] += 1; // Increment Usercount by 1
                }

                // Add the user to the socket.io channel
                socket.join(channel);

                // Check if the user is already in the list
                if (usersId.includes(socket.id)) {
                    if (VERBOSE_CONNETIONS) console.log('user is already in the channel: ' + channel);
                    return;
                }

                // Add User to lists
                usersId.push(socket.id);
                usersChannel.push(channel);
                if (VERBOSE_CONNETIONS) console.log('User joined channel: ' + channel);

                io.to(channel).emit('usercount', channelUserCount[channelIndex]); // Emit the user count to all users in the room
                io.to(channel).emit('channelnotice', "User joined channel: ");      // Emit the channel notice to all users in the room (joins, leaves and disconnects)
            }); 

            // A message has been sent to the server, so emit it to all users in the channel
            socket.on("message", (message) => {
                let index = usersId.indexOf(socket.id);
                let channel = usersChannel[index];
                io.to(channel).emit('message', message);
                if (VERBOSE_CHAT) console.log("Message emitted: ", message, " Channel: ", channel, " From: ", socket.id);
            });

            socket.on("leavechannel", (channel) => {
                // Remove the user from the channel
                if (VERBOSE_CONNETIONS) console.log('user left channel: ' + channel);
                
                // Remove the user from the socketRoom list
                let index = usersId.indexOf(socket.id);
                usersId.splice(index, 1);
                usersChannel.splice(index, 1);
                
                // Remove the user from the user count
                let channelIndex = channelsName.indexOf(channel);
                if (channelUserCount[channelIndex] != null){
                    channelUserCount[channelIndex] -= 1;
                }
                io.to(channel).emit('usercount', channelUserCount[channelIndex]); // Emit the user count to all users in the room
                io.to(channel).emit('channelnotice', "User left channel: ");

                socket.leave(channel); // Remove the user from the channel - Do this last so they can still receive the message
            });

            socket.on('disconnect', () => {
                // Remove the user from the channel
                if (VERBOSE_CONNETIONS)
                    console.log('User disconnected on port ' + PORT + ' socket: ' + socket.id);
                
                // Remove the user from the socketRoom list
                let index = usersId.indexOf(socket.id);
                if (index != -1) {
                    let channel = usersChannel[index];
                    usersId.splice(index, 1);
                    usersChannel.splice(index, 1);
                    
                    // Remove the user from the user count
                    let channelIndex = channelsName.indexOf(channel);
                    if (channelUserCount[channelIndex] != null){
                        channelUserCount[channelIndex] -= 1;
                    }
                    io.to(channel).emit('usercount', channelUserCount[channelIndex]); // Emit the user count to all users in the room
                    io.to(channel).emit('channelnotice', "User disconnected: ");
                }
            });
        });
    }
}
