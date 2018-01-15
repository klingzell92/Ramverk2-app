const mocha = require('mocha');
const describe = mocha.describe;
const assert = require("assert");
const before = mocha.before;
const after = mocha.after;
const WebSocket = require("ws");
const it = mocha.it;
const tictactoeServer = require('../../src/tictactoe/tictactoe.js');
let url = "ws://localhost:1338/";
let websocket =  new WebSocket(url);
describe("Testing websocket", function() {
    var websocket;
    before(async function() {
        await tictactoeServer.listen();
        websocket = await new WebSocket(url);
    });

    after(async function() {
        await tictactoeServer.close(function() {
            console.log('Closing the server');
        });
    });
    describe('Test connecting player1.', function () {
        it('Add player1', (done) => {
            console.log(websocket.readyState);
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
                    assert.equal(data.size, 1)
                }
            };
            done();
        });
    });
});
