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
    it('Test the gomoku route', function(done) {
        request(app).get("/gomoku")
            .expect(200, done);
    });
});
