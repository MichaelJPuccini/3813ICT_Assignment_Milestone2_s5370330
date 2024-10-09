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

#### Channel

#### User

### Frontend

#### Group

#### Channel

#### User

## Description of the responsibilities between the client and the server

## REST API List of routes, parameters, return values and purpose

### /api/users

#### GET /api/users
#### POST /api/users
#### GET /api/users/:id
#### DELETE /api/users/:id
#### PATCH /api/users/:id
#### POST /api/users/login

### /api/groups

#### GET /api/groups/:id
#### POST /api/groups/
#### DELETE /api/groups/:id
#### GET /api/groups/mine/:userId
#### GET /api/groups/adduser/:groupId/:userId
#### GET /api/groups/removeuser/:groupId/:userId
#### GET /api/groups/addadmin/:groupId/:userId
#### GET /api/groups/removeadmin/:groupId/:userId

### /api/channels
#### GET /api/channels/:id
#### POST /api/channels/
#### DELETE /api/channels/:id
#### GET /api/channels/mine/:userId
#### GET /api/channels/adduser/:channelId/:userId
#### GET /api/channels/removeuser/:channelId/:userId
#### GET /api/channels/addadmin/:channelId/:userId
#### GET /api/channels/removeadmin/:channelId/:userId


## Angular architecture

### Components
### Services
### Models
### Routes

## Interaction between the client and server
```
Describe the details of the interaction between client and server by indicating how the files and global vars in server side will be changed and how the display of each angular component page will be updated.
```

