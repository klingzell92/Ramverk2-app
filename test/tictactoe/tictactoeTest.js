const mocha = require('mocha');
const describe = mocha.describe;
const assert = require("assert");
const before = mocha.before;
const after = mocha.after;
const WebSocket = require("ws");
const it = mocha.it;
const tictactoeServer = require('../../src/tictactoe/tictactoe.js');
let url = "ws://localhost:1338/";

describe("Testing websocket", function() {
    var websocket;

    before(async function() {
        await tictactoeServer.listen();
    });

    after(async function() {
        await tictactoeServer.close(function() {
            console.log('Closing the server');
        });
    });
    describe('Test connecting player1.', function () {
        it('Add player1', (done) => {
            websocket = new WebSocket(url);
            websocket.onopen = () => {
                console.log("The websocket is now open.");
                let object = {
                    type: "connect",
                    player: "player1"
                };

                websocket.send(JSON.stringify(object));
            };
            websocket.onmessage = (event) => {
                let data = JSON.parse(event.data);

                if (data.size === 1) {
                    assert.equal(data.size, 1);
                }
            };
            done();
        });
    });
});
tictactoeServer.close();
