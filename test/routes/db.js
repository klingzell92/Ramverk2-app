var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var request = require('supertest');
var app = require('../../app.js');

describe('Check highscore routes', function() {
    it('Main page content', function(done) {
        request(app).get("/highscore")
            .expect(200, done);
    });
});
