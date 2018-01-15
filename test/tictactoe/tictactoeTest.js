const mocha = require('mocha');
const describe = mocha.describe;
const assert = require("assert");
const before = mocha.before;
const after = mocha.after;
const WebSocket = require("ws");
const it = mocha.it;
const tictactoeServer = require('../../src/tictactoe/tictactoe.js');

describe('Test Web Socket.', function () {
    before(async function() {
        console.log("Opening server");
        await tictactoeServer.listen();
    });

    after(async function() {
        await tictactoeServer.close(function() {
            console.log('Closing test-server.');
        });
    });
    describe('Connect players', () => {
        it('Add players', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:1338");
            ws.onopen = function() {
                let player1 = {
                    type: "connect",
                    player: "player1"
                };
                ws.send(JSON.stringify(player1));
            };
            ws.onmessage = function(event) {
                let data = JSON.parse(event.data);
                console.log(data);
                if (data.size === 1) {
                    assert.equal(data.size, 1)
                }
            };
            done();
        });
    });
});
