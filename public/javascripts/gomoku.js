/**
 * To setup a websocket connection, and nothing more.
 */
(function () {
    "use strict";

    let websocket;
    let nickname;
    let players;
    let turn        = document.getElementById("turn");
    let nick        = document.getElementById("nick");
    let url         = "ws://localhost:1338/";
    let game        = document.getElementById("game");
    let main        = document.getElementById("main");
    let start       = document.getElementById("start");
    //let close       = document.getElementById("close");



    function addText(text, id) {
        console.log("adding");
        var para = document.createElement("p");
        var node = document.createTextNode(text);
        para.appendChild(node);
        para.setAttribute("id", id);
        main.appendChild(para);
    }

    function removeObject(id) {
        console.log("deleting");
        var element = document.getElementById(id);
        element.remove();
    }

    function updateBoard(takenSquares) {
        console.log("updating");
        for (var square in takenSquares) {
            console.log(takenSquares);
            var squareElement = document.getElementById(square);
            squareElement.classList.add("disableSquare");
            if (squareElement.childNodes.length < 1) {
                var para = document.createElement("p");
                var marker = document.createTextNode(takenSquares[square]);
                para.appendChild(marker);
                squareElement.appendChild(para);
            }
        }
    }

    /**
     * What to do when user clicks Connect
     */
    start.addEventListener("click", function(/*event*/) {
        console.log("Connecting to: " + url);
        nickname = nick.value;
        websocket = new WebSocket(url);

        start.className += " hidden";
        nick.className += " hidden";
        //close.style.display = "block";

        websocket.onopen = function() {
            console.log("The websocket is now open.");
            console.log(nickname);
            let object = {
                type: "connect",
                player: nickname
            };
            websocket.send(JSON.stringify(object));

        };

        websocket.onmessage = function(event) {
            //console.log("Receiving message: " + event.data);
            let msg = JSON.parse(event.data);
            players = msg.players;
            console.log(msg);
            if (msg.size <= 1) {
                addText("Väntar på motståndare", "wait");
            } else {
                if (msg.size < 3) {
                    if (document.getElementById("wait")) {
                        removeObject("wait");
                    }
                    game.style.visibility = "visible";
                    updateBoard(msg.taken);
                    if (!players[nickname]["turn"]) {
                        game.classList.add("disableBoard");
                    } else {
                        game.classList.remove("disableBoard");
                    }
                }
            }
        };

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
            console.log(websocket);
        };
    }, false);


    /**
     * What to do when user clicks to send a message.
     */
    game.addEventListener("click", function(event) {
        if (!websocket || websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            console.log("Changed turn");
            console.log(event.target.id);
            let object = {
                type: "place",
                player: nickname,
                placeId: event.target.id
            };
            websocket.send(JSON.stringify(object));

        }
    });
})();
