var assert = require('assert');//link in assertion library
// var app = require('../server/server.js');
var chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

const serverAddress = "http://localhost:3000";


describe('Tests for function one', () => {
    describe('Test Case 1 #fnOne()',() => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
    describe('Test Case #fnOne()', () => {
        it('should return 3 as the value is present', () => {
            assert.equal([1,2,3,4,5].indexOf(4), 3);
        });
    });

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
                            console.log('Stored Product ID:', storedProductId);
                            done();
                        }
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

            // Delete the created product
            it('it should DELETE the created product ' + storedProductId, (done) => {
                chai.request(serverAddress)
                    .delete('/api/products/' + storedProductId)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });

        });


    });
});
