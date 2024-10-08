var assert = require('assert');//link in assertion library
var chai = require('chai');
let chaiHttp = require('chai-http');
const { describe } = require('node:test');
// const { it } = require('node:test');
let should = chai.should();
chai.use(chaiHttp);
const serverAddress = "http://localhost:3000";

describe('API Channel Tests: /api/channels', () => {
    let storedId = "";
    let storedUserId = "";
    let storedGroupId = "";

    describe('/POST channels', () => {

        it('it should POST create a new user to test in groups', (done) => {
            chai.request(serverAddress)
                .post('/api/users/')
                .set('Content-Type', 'application/json')
                .send({ name: "Test User", password: "password", role: "User" })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').equal('Test User');
                        res.body.should.have.property('password').equal('password');
                        storedUserId = res.body._id; // Store the ID for future use
                        // console.log('Stored User ID:', storedUserId);
                        done();
                    }
                });
        });

        it('it should POST create a new group', (done) => {
            chai.request(serverAddress)
                .post('/api/groups/')
                .set('Content-Type', 'application/json')
                .send({ name: "Test Group", creatorId: storedUserId })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').equal('Test Group');
                        storedGroupId = res.body._id; // Store the ID for future use
                        done();
                    }
                });
        });


        it('it should not POST a new channel without any data', (done) => {
            chai.request(serverAddress)
                .post('/api/channels/')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should not POST a new channel without a name', (done) => {
            chai.request(serverAddress)
                .post('/api/channels/')
                .set('Content-Type', 'application/json')
                .send({ creatorId: storedUserId })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should not POST a new channel without a creatorId', (done) => {
            chai.request(serverAddress)
                .post('/api/channels/')
                .set('Content-Type', 'application/json')
                .send({ name: "Test Channel" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should POST create a new channel', (done) => {
            chai.request(serverAddress)
                .post('/api/channels/')
                .set('Content-Type', 'application/json')
                .send({ name: "Test Channel", creatorId: storedUserId })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').equal('Test Channel');
                        storedId = res.body._id; // Store the ID for future use
                        done();
                    }
                });
        });

    });


    describe('/GET channels/mine/:groupId/:userId', () => {

        it('it should GET all the channels for the user', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/mine/' + storedGroupId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should not Get all the channels for the user with an incorrect group ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/mine/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not Get all the channels for the user with an incorrect user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/mine/' + storedGroupId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });

    describe('/GET channels/adduser/:channelId/:userId', () => {

        it('it should not add a user to a channel with an incorrect channel ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/adduser/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not add a user to a channel with an incorrect user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/adduser/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should add a user to a channel', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/adduser/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET channels/removeuser/:channelId/:userId', () => {

        it('it should not remove a user from a channel with an incorrect channel ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeuser/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not remove a user from a channel with an incorrect user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeuser/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should remove a user from a channel', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeuser/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET channels/addadmin/:channelId/:userId', () => {

        it('it should not add an admin to a channel with an incorrect channel ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/addadmin/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not add an admin to a channel with an incorrect user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/addadmin/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should add an admin to a channel', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/addadmin/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET channels/removeadmin/:channelId/:userId', () => {

        it('it should not remove an admin from a channel with an incorrect channel ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeadmin/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not remove an admin from a channel with an incorrect user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeadmin/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should remove an admin from a channel', (done) => {
            chai.request(serverAddress)
                .get('/api/channels/removeadmin/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe(('DELETE channels'), () => {

        it('it should not DELETE a channel with an incorrect ID', (done) => {
            chai.request(serverAddress)
                .delete('/api/channels/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should DELETE the created channel', (done) => {
            chai.request(serverAddress)
            .delete('/api/channels/' + storedId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('it should not DELETE a channel that does not exist', (done) => {
            chai.request(serverAddress)
            .delete('/api/channels/' + storedId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        
        it('it should DELETE the originally created group ' + storedGroupId, (done) => {
            chai.request(serverAddress)
                .delete('/api/groups/' + storedGroupId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should DELETE the originally created user ' + storedUserId, (done) => {
            chai.request(serverAddress)
                .delete('/api/users/' + storedUserId)
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    });


});