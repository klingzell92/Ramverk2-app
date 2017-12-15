/**
 * To setup a websocket connection, and nothing more.
 */
(function () {
    "use strict";

    let websocket;
    let username;
    let user        = document.getElementById("user");
    let url         = document.getElementById("connect_url");
    let connect     = document.getElementById("connect");
    let protocol    = document.getElementById("protocol");
    let messageContainer =document.getElementById('messageContainer');
    let sendMessage = document.getElementById("send_message");
    let message     = document.getElementById("message");
    let close       = document.getElementById("close");
    let output      = document.getElementById("output");



    /**
     * Log output to web browser.
     *
     * @param  {string} message to output in the browser window.
     *
     * @return {void}
     */
    function outputLog(message) {
        let now = new Date();
        let timestamp = now.toLocaleTimeString();

        output.innerHTML += `${timestamp} ${message}<br>`;
        output.scrollTop = output.scrollHeight;
    }

    /**
     * Select what subprotocol to use for websocekt connection.
     *
     * @return {string} with name of subprotocol.
     */
    function setSubProtocol() {
        return protocol.value;
    }



    /**
     * What to do when user clicks Connect
     */
    connect.addEventListener("click", function(/*event*/) {
        console.log("Connecting to: " + url.value);
        websocket = new WebSocket(url.value);
        username = user.value;
        user.className += " hidden";
        connect.className += " hidden";
        close.style.display = "block";
        messageContainer.style.display ="block";
        protocol.value = "json";
        if (!protocol.value) {
            websocket = new WebSocket(url.value);
        } else {
            websocket = new WebSocket(url.value, setSubProtocol());
        }
        websocket.onopen = function() {
            console.log("The websocket is now open.");
            console.log(websocket);
        };

        websocket.onmessage = function(event) {
            console.log("Receiving message: " + event.data);
            console.log(event);
            console.log(websocket);
            let msg = JSON.parse(event.data);

            console.log(typeof(msg.data));
            if (typeof msg.data === 'object') {
                outputLog(msg.data.user + ": " + msg.data.message);
            } else {
                outputLog(msg.data);
            }
        };

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
            console.log(websocket);
            outputLog("Websocket is now closed.");
        };
    }, false);




    /**
     * What to do when user clicks to send a message.
     */
    sendMessage.addEventListener("click", function(/*event*/) {
        let messageText = message.value;

        var sender = {message: messageText, user: username};

        if (!websocket || websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            console.log(sender);
            websocket.send(JSON.stringify(sender));
            console.log("Sending message: " + messageText);
            outputLog(username + ": " + messageText);
        }
    });



    /**
     * What to do when user clicks Close connection.
     */
    close.addEventListener("click", function(/*event*/) {
        console.log("Closing websocket.");
        user.classList.remove("hidden");
        connect.classList.remove("hidden");
        close.style.display = "none";
        messageContainer.style.display ="none";
        websocket.send("Client closing connection by intention.");
        websocket.close();
        console.log(websocket);
        outputLog(username + " lämnade chatten");
    });
})();
