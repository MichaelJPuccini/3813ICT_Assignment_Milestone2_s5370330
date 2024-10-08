var assert = require('assert');//link in assertion library
var chai = require('chai');
let chaiHttp = require('chai-http');
const { describe } = require('node:test');
// const { it } = require('node:test');
let should = chai.should();
chai.use(chaiHttp);
const serverAddress = "http://localhost:3000";


    describe('API User Tests: /api/users', () => {
        let storedUserId = "";

        describe('/POST users', () => {

            it('it should not POST a new user without any data', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/')
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    
            it('it should not POST a new user without a name', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/')
                    .set('Content-Type', 'application/json')
                    .send({ password: "password" })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    
            it('it should not POST a new user without a password', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/')
                    .set('Content-Type', 'application/json')
                    .send({ name: "Test User" })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('it should POST create a new user', (done) => {
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

        });

        describe('/POST users/login', () => {

            it('it should not POST a login without any data', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/login')
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('it should not POST a login without a name', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/login')
                    .set('Content-Type', 'application/json')
                    .send({ password: "password" })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('it should not POST a login without a password', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/login')
                    .set('Content-Type', 'application/json')
                    .send({ username: "Test User" })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('it should POST login with the created user', (done) => {
                chai.request(serverAddress)
                    .post('/api/users/login')
                    .set('Content-Type', 'application/json')
                    .send({ username: "Test User", password: "password" })
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('user');
                            res.body.user.should.have.property('name').eql('Test User');
                            res.body.user.should.have.property('role').eql('User');
                            done();
                        }
                    });
            });

        });

        describe('/GET users', () => {

            it('it should GET all the users', (done) => {
                chai.request(serverAddress)
                    .get('/api/users')
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });

        });

        describe('/GET users/:id', () => {

            it('it should not GET a user that does not exist', (done) => {
                chai.request(serverAddress)
                    .get('/api/users/-1')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });

            it('it should GET the created user ' + storedUserId, (done) => {
                chai.request(serverAddress)
                    .get('/api/users/' + storedUserId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').equal('Test User');
                        res.body.should.have.property('role').equal('User');
                        done();
                    });
            });

        });


        describe('/PATCH users', () => {

            it('it should not PATCH a user that does not exist', (done) => {
                chai.request(serverAddress)
                    .patch('/api/users/-1')
                    .send({ name: "Test User Updated", password: "password", role: "User" })
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });

            it('it should PATCH the created user ' + storedUserId, (done) => {
                chai.request(serverAddress)
                    .patch('/api/users/' + storedUserId)
                    .send({ name: "Test User Updated", password: "password", role: "User" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').equal('Item updated successfully');
                        done();
                    });
            });

        });

        describe('/DELETE users', () => {

            it('it should not DELETE a user that does not exist', (done) => {
                chai.request(serverAddress)
                    .post('/api/delete/-1')
                    .end((err, res) => {
                        res.should.have.status(404);
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


        // Test the /GET route
        // describe('/GET users', () => {
        //     it('it should GET all the users', (done) => {
        //         chai.request(serverAddress)
        //             .get('/api/users')
        //             .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('array');
        //             done();
        //         });
        //     });

        //     it('it should GET the created user ' + storedUserId, (done) => {
        //         chai.request(serverAddress)
        //             .get('/api/users/' + storedUserId)
        //             // .get('/api/users/66fa7af0b12d34eeeaba43fd')
        //             .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('name').equal('Test User');
        //             res.body.should.have.property('password').equal('password');
        //             done();
        //         });
        //     });
        // });

    });
