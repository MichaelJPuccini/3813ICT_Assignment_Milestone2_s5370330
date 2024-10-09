# 3813ICT_Assignment_Milestone2_s5370330

- Author: Michael Puccini s5370330
- Course code: 3813ICT Software Frameworks
- Course Convenor: Kaile Su

## Installation instructions
in the base directory, the /server and /server/app directories run the 'npm install' command to fetch and install the required modules.

### Running Instructions
To run the program enter the server directory and run
```
npm run start
```

### Upload to the server instructions
In the server/app directory run:
```
ng build --prod
```

then upload the following directory into the server's base directory:
- server

## git documentation


### Organisation of the git repository

root directory contains the README.md file and the package.json for the unitTesting.
README.md is the overview of the project.
.gitignore specifies the files that will be ignored by Git.

run 'npm run test' to run tests.

### /server
/server directory contains the server-side code for the application. npm run start to start the server.

### /server/app
/server/app contains the Angular frontend code for the application.

run 'ng build --prod' to build the production version of the application.

### Git policy
Commits were made frequently during development and included clear descriptions when new features or changes to existing code was made.

My approach to version control was something called Atomic commits. This means smaller, more frequent commits, most of which contains one or a related combination of new code or related  changes to existing code.

Since it was a single developer project, branches were not used and not a lot of exprimental code was being attempted.

This made tracking the development history clearer.

### Project File Structure

```
├── server/
│   ├── app/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── main.ts
│   │   │   ├── polyfills.ts
│   │   │   ├── styles.css
│   │   │   └── index.html
│   │   ├── public/
│   │   ├── dist/
│   │   │   └── app/
│   │   │       └── browser/
│   │   ├── README.md
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── chat-server/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Data Structures for Backend and Frontend

### Backend

#### Group
- **_id**: Unique identifier for the group (UUID).
- **name**: Name of the group (string).
- **creatorId**: The userId of the user who created the group (string).
- **userIds**: List of user IDs who are members of the group (array of UUIDs).
- **adminIds**: List of user IDs who are admins of the group (array of UUIDs).
- **channelIds**: List of channel IDs of this group (array of UUIDs).

#### Channel
- **_id**: Unique identifier for the channel (UUID).
- **name**: Name of the channel (string).
- **groupId**: ID of the group to which the channel belongs (UUID).
- **creatorId**: The userId of the user who created the channel (string).
- **userIds**: List of user IDs who are members of the channel (array of UUIDs).
- **adminIds**: List of user IDs who are admins of the channel (array of UUIDs).

#### User
- **_id**: Unique identifier for the user (UUID).
- **name**: Name of the user (string).
- **password**: Password of the user (string).
- **email**: Email address of the user (string).
- **role**: Role of the user (User, SuperUser, Admin) (string).
- **image**: Stringified image of the user.

#### Login
- **name**: Name of the user (string).
- **password**: Password of the user (string).

### Frontend

#### Group
- **_id**: Unique identifier for the group (UUID).
- **name**: Name of the group (string).
- **creatorId**: The userId of the user who created the group (string).
- **userIds**: List of user IDs who are members of the group (array of UUIDs).
- **adminIds**: List of user IDs who are admins of the group (array of UUIDs).
- **channelIds**: List of channel IDs of this group (array of UUIDs).

#### Channel
- **_id**: Unique identifier for the channel (UUID).
- **name**: Name of the channel (string).
- **groupId**: ID of the group to which the channel belongs (UUID).
- **creatorId**: The userId of the user who created the channel (string).
- **userIds**: List of user IDs who are members of the channel (array of UUIDs).
- **adminIds**: List of user IDs who are admins of the channel (array of UUIDs).

#### User
- **_id**: Unique identifier for the user (UUID).
- **name**: Name of the user (string).
- **role**: Role of the user (User, SuperUser, Admin) (string).
- **image**: Stringified image of the user.


## Description of the responsibilities between the client and the server

The client is responsible for presenting the user interface, capturing user input, and making requests to the server. It handles the display of data and user interactions. The server is responsible for processing requests from the client, performing business logic, accessing the database, and returning the appropriate responses. The server also handles authentication, authorization, and data validation.


## REST API List of routes, parameters, return values and purpose

### /api/users

#### GET /api/users
- **Parameters**: None
- **Return Values**: List of all users
- **Purpose**: Retrieve a list of users

#### POST /api/users
- **Parameters**: User data (username, email, password, role, image)
- **Return Values**: Created user object
- **Purpose**: Create a new user

#### GET /api/users/:id
- **Parameters**: User ID
- **Return Values**: User object
- **Purpose**: Retrieve a specific user by ID

#### DELETE /api/users/:id
- **Parameters**: User ID
- **Return Values**: Success message
- **Purpose**: Delete a specific user by ID

#### PATCH /api/users/:id
- **Parameters**: User ID, updated user data
- **Return Values**: Updated user object
- **Purpose**: Update a specific user by ID and return a User object

#### POST /api/users/login
- **Parameters**: User credentials (email, password)
- **Return Values**: User object
- **Purpose**: Authenticate a user and return a User object

### /api/groups

#### GET /api/groups/:id
- **Parameters**: Group ID
- **Return Values**: Group object
- **Purpose**: Retrieve a specific group by ID

#### POST /api/groups/
- **Parameters**: Group data (name, creatorId, userIds, adminIds, channelIds)
- **Return Values**: Created group object
- **Purpose**: Create a new group

#### DELETE /api/groups/:id
- **Parameters**: Group ID
- **Return Values**: Success message
- **Purpose**: Delete a specific group by ID

#### GET /api/groups/mine/:userId
- **Parameters**: User ID
- **Return Values**: List of groups the user is a member of
- **Purpose**: Retrieve groups that the user is a member of

#### GET /api/groups/adduser/:groupId/:userId
- **Parameters**: Group ID, User ID
- **Return Values**: Success message
- **Purpose**: Add a user to a group

#### GET /api/groups/removeuser/:groupId/:userId
- **Parameters**: Group ID, User ID
- **Return Values**: Success message
- **Purpose**: Remove a user from a group

#### GET /api/groups/addadmin/:groupId/:userId
- **Parameters**: Group ID, User ID
- **Return Values**: Success message
- **Purpose**: Add an admin to a group

#### GET /api/groups/removeadmin/:groupId/:userId
- **Parameters**: Group ID, User ID
- **Return Values**: Success message
- **Purpose**: Remove an admin from a group

### /api/channels

#### GET /api/channels/:id
- **Parameters**: Channel ID
- **Return Values**: Channel object
- **Purpose**: Gets a channel by ID

#### POST /api/channels/
- **Parameters**: Channel data (name, groupId)
- **Return Values**: Created channel object
- **Purpose**: Create a new channel

#### DELETE /api/channels/:id
- **Parameters**: Channel ID
- **Return Values**: Success message
- **Purpose**: Delete a channel by ID

#### GET /api/channels/mine/:userId
- **Parameters**: User ID
- **Return Values**: List of channels the user is a member of
- **Purpose**: Retrieve channels that the user is a member of

#### GET /api/channels/adduser/:channelId/:userId
- **Parameters**: Channel ID, User ID
- **Return Values**: Success message
- **Purpose**: Add a user to a channel

#### GET /api/channels/removeuser/:channelId/:userId
- **Parameters**: Channel ID, User ID
- **Return Values**: Success message
- **Purpose**: Remove a user from a channel

#### GET /api/channels/addadmin/:channelId/:userId
- **Parameters**: Channel ID, User ID
- **Return Values**: Success message
- **Purpose**: Add an admin to a channel

#### GET /api/channels/removeadmin/:channelId/:userId
- **Parameters**: Channel ID, User ID
- **Return Values**: Success message
- **Purpose**: Remove an admin from a channel


## Angular architecture

The components are brokwn into three types. Components, Pages and Services.

### Components

- **ChannelAdd**: A component to add a Channel
- **DisplayChannels**: Displays the channels that the user is in
- **DisplayGroups**: Displays the groups that the user is in
- **Toast**: A component to display a toast for X seconds
- **TopMenu**: The menu at the top of the screen. Also checks if a user is logged in.

### Pages / Channels:
- **AddChannel**: Uses the ChannelAdd component to add a channel
- **ManageChannelUsers**: Where an admin/superuser can add/remove users/admins for channels
- **ReadChannel**: Page to display the channel and connect to the chat server's room
- **RemoveChannel**: Confirm deletion of the channel by the SuperUser or group owner.

### Pages / Groups:
- **AddGroup**: Add a group to the site.
- **ManageUsers**: Where an admin/superuser can add/remove users/admins
- **ReadGroup**: Page to dispaly the group details and the channels that the user has access to in the group
- **ReadGroups**: Page to display the groups available to the user.
- **RemoveGroup**: Confirm deletion of the channel by the SuperUser or group owner

### Pages / Users:
- **AddUser**: A Page where the SuperUser can add Users
- **Login**: A page where the user logs in.
- **Logout**: Where the user logs out. Then redirects to /login
- **Profile**: Where the user can upload their image
- **ReadUsers**: Where the SuperUser can list the users and delete/edit users.
- **RemoveUser**: Confirm deletion of user for SuperUser
- **UpdateUser**: Where the SuperUser edits the user.

### Services:
- **GroupService**: The service that interacts with the API for group resources
- **UserService**: The service that interacts with the API for user resources
- **ChannelService**: The service that interacts with the API for channel resources
- **ToastService**: The service where toasts are handled.
- **SocketService**: The service where the chat interacts with the socket on the server.

### Routes

Defined in app.routes.ts:

- **/login** - LoginComponent
- **/logout** - LogoutComponent

- **/users/add** - AddUserComponent
- **/users/update/:id** - UpdateUserComponent
- **/users/remove/:id** - RemoveUserComponent
- **/users** - ReadUsersComponent
- **/users/profile** - ProfileComponent

- **/groups/add** - AddGroupComponent
- **/groups/remove/:id** - RemoveGroupComponent
- **/groups** - ReadGroupsComponent
- **/groups/:id** - ReadGroupComponent
- **/groups/manageusers/:id** - ManageUsersComponent

- **/channels/add/:groupId** - AddChannelComponent
- **/channels/remove/:id** - RemoveChannelComponent
- **/channels/:id** - ReadChannelComponent
- **/channels/manageusers/:id** - ManageChannelUsersComponent


## Interaction between the client and server
```
Describe the details of the interaction between client and server by indicating how the files and global vars in server side will be changed and how the display of each angular component page will be updated.
```

There is very little state used on this site. The three primary bits of state are the username, userId and the role that are stored in the localStorage of the browser.

It was my initial intention to use a jwt token to verify identity for all api calls and no data would be provided without authorization and authority but unfortunately I could not get that working within the time parameters so that was scrapped. This would have secured the api way better than it currently is.

The rest of it is stateless between page to page. I decided that it's better to not cache the site and refresh the site to cut down on potential stale caching. 

When on the same page, data structures are stored in memory and freshed on the screen if the data is changed on the page itself (for instance, if a user is added or removed from a group or a new chat message is sent to a channel the user is in.)
