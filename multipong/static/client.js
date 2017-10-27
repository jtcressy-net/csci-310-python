var Client = {};

Client.namespace = window.location.href + "/";
Client.connect = function() {
    Client.socket = io(Client.namespace, { path: '/socket.io'});
    Client.registerEvents()
};
Client.reconnect = function() {
    Client.socket.disconnect();
    Client.socket = io(Client.namespace, { path: '/socket.io'});
};

// outgoing events
Client.requestNewPlayer = function(username) {
    Client.socket.emit('newplayer', {"username": username});
};

// incoming event handlers
Client.playerReady = function(data) {
    console.log("player ready");
};
Client.roomJoin = function(data) {
    console.log(data.username + " joined the room");
};
Client.roomUpdate = function(data) {
    console.log(data);
};
Client.roomLeave = function(data) {
    console.log(data.username + " left the room");
};
Client.roomDelete = function() { //Reconnect to find a new room
    Client.socket.disconnect();
    Client.socket = io.connect();
};
Client.tick = function() {
    Client.socket.emit('roomupdate', {}); // FUTURE: Send player data
};
Client.askUsername = function() {
    console.log("gimme a username");
};

// Event registration
Client.registerEvents = function() {
    Client.socket.on('connect', function () {
        console.log("connected");
    });
    Client.socket.on('tick', Client.tick);
    Client.socket.on('askusername', Client.askUsername);
    Client.socket.on('playerready', Client.playerReady);
    Client.socket.on('roomjoin', Client.roomJoin);
    Client.socket.on('roomupdate', Client.roomUpdate);
    Client.socket.on('roomleave', Client.roomLeave);
    Client.socket.on('roomdelete', Client.roomDelete);
};