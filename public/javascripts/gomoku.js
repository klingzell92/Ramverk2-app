/**
 * To setup a websocket connection, and nothing more.
 */
(function () {
    "use strict";

    let websocket;
    let nickname;
    let players;
    let nick        = document.getElementById("nick");
    let url         = "ws://localhost:1338/";
    let game        = document.getElementById("game");
    let main        = document.getElementById("main");
    let start       = document.getElementById("start");
    let taken;
    //let close       = document.getElementById("close");



    function addText(text, id) {
        var para = document.createElement("p");
        var node = document.createTextNode(text);

        para.appendChild(node);
        para.setAttribute("id", id);
        main.appendChild(para);
    }

    function removeObject(id) {
        var element = document.getElementById(id);

        element.remove();
    }

    function updateBoard() {
        for (var square in taken) {
            var squareElement = document.getElementById(square);

            squareElement.classList.add("disableSquare");
            if (squareElement.childNodes.length < 1) {
                //var para = document.createElement("p");
                var marker = document.createTextNode(taken[square]);

                squareElement.appendChild(marker);
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

        websocket.onopen = function() {
            console.log("The websocket is now open.");
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
            taken = msg.taken;
            console.log(msg);
            if (msg.size <= 1) {
                addText("Väntar på motståndare", "wait");
            } else {
                if (msg.size < 3) {
                    if (document.getElementById("wait")) {
                        removeObject("wait");
                    }
                    game.style.visibility = "visible";
                    updateBoard();
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
        };
    }, false);


    /**
     * What to do when user clicks to send a message.
     */
    game.addEventListener("click", function(event) {
        if (!websocket || websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            let object = {
                type: "place",
                player: nickname,
                placeId: event.target.id
            };

            websocket.send(JSON.stringify(object));
        }
    });
})();
