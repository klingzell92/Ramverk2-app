var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var request = require('supertest');
var app = require('../../app.js');



describe('Check database routes', function() {
    it('Test db get route', function(done) {
        request(app).get("/db")
            .expect(200, done);
    });
});
