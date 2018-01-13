var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var request = require('supertest');
var app = require('../app.js');



describe('Check routes', function() {
    it('Test the start route', function(done) {
        request(app).get("/")
            .expect(200, done);
    });
    it('Test the about route', function(done) {
        request(app).get("/gomoku")
            .expect(200, done);
    });
    it('Test error route', function(done) {
        request(app).get("/error")
            .expect(404, done);
    });
});
