var assert = require('assert');//link in assertion library
// var app = require('../server/server.js');
var chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const serverAddress = "http://localhost:3000";

    describe('API Product Tests', () => {
        let storedProductId = "";

        describe('/POST products', () => {
            it('it should POST create a new product', (done) => {
                chai.request(serverAddress)
                    .post('/api/products/')
                    .type('form')
                    .send({ name: "Test Product", description: "This is a test product", price: 10.99, units: 100 })
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name').equal('Test Product');
                            res.body.should.have.property('description').equal('This is a test product');
                            res.body.should.have.property('price').equal('10.99');
                            res.body.should.have.property('units').equal('100');
                            storedProductId = res.body._id; // Store the ID for future use
                            // console.log('Stored Product ID:', storedProductId);
                            done();
                        }
                    });
            });
            it("it should not PORT a new product without any data", (done) => {
                chai.request(serverAddress)
                    .post('/api/products/')
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });

        // Test the /GET route
        describe('/GET products', () => {
            it('it should GET all the products', (done) => {
                chai.request(serverAddress)
                    .get('/api/products')
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            });

            it('it should GET the created product ' + storedProductId, (done) => {
                chai.request(serverAddress)
                    .get('/api/products/' + storedProductId)
                    // .get('/api/products/66fa7af0b12d34eeeaba43fd')
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name').equal('Test Product');
                    res.body.should.have.property('description').equal('This is a test product');
                    res.body.should.have.property('price').equal('10.99');
                    res.body.should.have.property('units').equal('100');
                    done();
                });
            });

            
        });

        // Test the /PATCH route
        describe('/PATCH products', () => {

          // Update the created product
            it('it should PATCH the created product ' + storedProductId, (done) => {
                chai.request(serverAddress)
                    .patch('/api/products/' + storedProductId)
                    .send({ name: "Test Product Updated", description: "This is a test product", price: 10.99, units: 100 })
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').equal('Item updated successfully'); // Added assertion
                    done();
                });
            });

            // Attempt to update a product that does not exist
            it('it should not PATCH a product that does not exist', (done) => {
                chai.request(serverAddress)
                    .patch('/api/products/-1')
                    .send({ name: "Test Product Updated", description: "This is a test product", price: 10.99, units: 100 })
                    .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });

        // Test the /DELETE route
        describe('/DELETE products', () => {

            // Delete the created product
            it('it should DELETE the created product ' + storedProductId, (done) => {
                chai.request(serverAddress)
                    .delete('/api/products/' + storedProductId)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });

            // Attempt to delete an item does does not exist
            it('it should not DELETE a product that does not exist', (done) => {
                chai.request(serverAddress)
                    .delete('/api/products/-1')
                    .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });

        });

});
