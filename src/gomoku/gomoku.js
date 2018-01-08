/**
 * Broadcast server using websockets and express.
 */
"use strict";

const port = 1338;
const express = require("express");
const http = require("http");
//const url = require("url");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({
    server:server,
    clientTracking: true
});

let players = {};
let selected = {};

// Answer on all http requests
app.use(function (req, res) {
    console.log("HTTP request on " + req.url);
    res.send({ msg: "hello" });
});


function sendToClient(ws, numberOfClients) {
    wss.clients.forEach((client) => {
        if (numberOfClients > 1) {
            if (client.readyState === WebSocket.OPEN) {
                let msg = {
                    size: numberOfClients,
                    players:players
                };
                client.send(JSON.stringify(msg));
            }
        } else {
            if (client == ws && client.readyState === WebSocket.OPEN) {
                let msg = {
                    size: numberOfClients
                };
                console.log(msg);
                client.send(JSON.stringify(msg));
            }
        }
    });
}

/*
Funktionen skall lägga till markör för rätt ruta till selected Array
*/
function placeMarker(ws, user, place) {
    wss.clients.forEach((client) => {
        selected[place] = players[user]["marker"];
        let object = {
            size: wss.clients.size,
            players:players,
            taken:selected
        }
        client.send(JSON.stringify(object));
    });
}

function changeTurn(ws, user) {
    wss.clients.forEach((client) => {
        players[user]["turn"] = false;
        for (var player in players) {
            if (player != user) {
                players[player]["turn"] = true;
            }
        }
    });
}

/**
 * Broadcast data to everyone except one self (ws).
 *
 * @param {WebSocket} ws   The current websocket.
 * @param {string}    data The data to send.
 *
 * @return {void}
 */
function broadcastExcept(ws, data) {
    let clients = 0;

    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            clients++;
            console.log(data);
            let msg = {
                data: data
            };
            client.send(JSON.stringify(msg));

        }
    });
    console.log(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
}



// Setup for websocket requests.
// Docs: https://github.com/websockets/ws/blob/master/doc/ws.md
wss.on("connection", (ws) => {
    console.log("Connection received. Adding client.");
    ws.on("message", (message) => {
        let data = JSON.parse(message);
        console.log(data["type"]);
        if (data["type"] == "connect") {
            console.log("Received: %s", data);
            if (wss.clients.size <= 2) {
                if (wss.clients.size <=1) {
                    players[data["player"]] = {};
                    players[data["player"]]["turn"] = true;
                    players[data["player"]]["marker"] = "X";
                } else {
                    players[data["player"]] = {};
                    players[data["player"]]["turn"] = false;
                    players[data["player"]]["marker"] = "O";
                }
                sendToClient(ws, wss.clients.size);
            }
        } else if (data["type"] == "place") {
            changeTurn(ws, data["player"]);
            placeMarker(ws, data["player"], data["placeId"]);
        }
    });

    ws.on("error", (error) => {
        console.log(`Server error: ${error}`);
    });

    ws.on("close", (code, reason) => {
        console.log(`Closing connection: ${code} ${reason}`);
        if (wss.clients.size < 2) {
            console.log("Empty taken array");
            selected = {};
        }
        broadcastExcept(ws, `Client disconnected (${wss.clients.size}).`);
    });
});



// Startup server
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
