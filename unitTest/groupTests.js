var assert = require('assert');//link in assertion library
var chai = require('chai');
let chaiHttp = require('chai-http');
const { describe } = require('node:test');
// const { it } = require('node:test');
let should = chai.should();
chai.use(chaiHttp);
const serverAddress = "http://localhost:3000";

describe('API Group Tests: /api/groups', () => {
    let storedId = "";

    let storedUserId = "";

    describe('/POST groups', () => {

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

        it('it should not POST a new group without any data', (done) => {
            chai.request(serverAddress)
                .post('/api/groups/')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should not POST a new group without a name', (done) => {
            chai.request(serverAddress)
                .post('/api/groups/')
                .set('Content-Type', 'application/json')
                .send({ creatorId: storedUserId })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should not POST a new group without a creatorId', (done) => {
            chai.request(serverAddress)
                .post('/api/groups/')
                .set('Content-Type', 'application/json')
                .send({ description: "This is a test group" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
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
                        storedId = res.body._id; // Store the ID for future use
                        done();
                    }
                });
        });
    });

    describe('/GET groups/:id', () => {

        it('it should not GET a group without a valid ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET the created group ' + storedId, (done) => {
            chai.request(serverAddress)
                .get('/api/groups/' + storedId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').equal('Test Group');
                    done();
                });
        });

    });

    describe('/GET groups/mine/:userId', () => {

        it('it should not GET groups without a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/mine/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET my groups with a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/mine/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    });

    describe('/GET groups/adduser/:groupId/:userId', () => {

        it('it should not GET groups without a valid group ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/adduser/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not GET groups without a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/adduser/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET add a user to a group', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/adduser/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET groups/removeuser/:groupId/:userId', () => {

        it('it should not GET groups without a valid group ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeuser/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not GET groups without a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeuser/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET remove a user from a group', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeuser/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET groups/addadmin/:groupId/:userId', () => {

        it('it should not GET groups without a valid group ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/addadmin/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    
        it('it should not GET groups without a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/addadmin/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET add an admin to a group', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/addadmin/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET groups/removeadmin/:groupId/:userId', () => {

        it('it should not GET groups without a valid group ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeadmin/-1/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not GET groups without a valid user ID', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeadmin/' + storedId + '/-1')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should GET remove an admin from a group', (done) => {
            chai.request(serverAddress)
                .get('/api/groups/removeadmin/' + storedId + '/' + storedUserId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DELETE groups', () => {

        it('it should not DELETE a group without an ID', (done) => {
            chai.request(serverAddress)
                .delete('/api/groups/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should DELETE the created group ' + storedId, (done) => {
            chai.request(serverAddress)
                .delete('/api/groups/' + storedId)
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
