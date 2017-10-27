var Chat = {};
Client.namespace = window.location.href + "/chat";
Client.connect();
Chat.renderMainView = function() {
    var $input_label = $('<label>', {id: "input_label", text: "Message: "});
    var $input = $('<input>', {id: "message_input", type: "text"});
    var $send_btn = $('<input>', {id: "message_send", type: "button", value: "Send"});
    var $logout_btn = $('<input>', {id: "logout_button", type: "button", value: "Logout"});
    $send_btn.click(function(){Chat.sendMessage($input.val());});
    $logout_btn.click(function(){Chat.sendLogout();});
    Chat.$row2.empty();
    Chat.$row2.append($input_label, $input, $send_btn, $logout_btn);
};
Chat.renderInitialView = function() {
    Chat.$container = $("#container");
    Chat.$row1 = $("<div>", {id: "row1", class: "row"});
    Chat.$row2 = $("<div>", {id: "row2", class: "row"});
    Chat.$row3 = $("<div>", {id: "row3", class: "row"});
    Chat.$debug = $('div', {id: "debug", class: "debug col-md-4 pull-right"});
    Chat.$messagebox = $('<div>', {id: "messages"});
    Chat.$container.empty();
    Chat.$row1.append(Chat.$debug);
    Chat.$row3.append(Chat.$messagebox);
    Chat.$container.append(Chat.$row1, Chat.$row2, Chat.$row3);
};
Chat.renderLoginView = function() {
    var $username_label = $('<label>', {id: "username_label", text: "Enter Your Name: "})
    var $username_input = $('<input>', {type: "text", id: "username_input"})
    var $submit_button = $('<input>', {type: "button", id: "submit_button", value: "Set Username"})
    $submit_button.click(function () {
        Client.requestNewPlayer($username_input.val());
    });
    Chat.$row2.empty();
    Chat.$row2.append($username_label, $username_input, $submit_button)

};
Chat.onMessage = function(data) {
    console.log(data);
    var $p = $('<p>');
    $p.append(data.username + ": " + data.message);
    Chat.$messagebox.append($p);
};
Chat.onUserJoin = function(data) {
    var $p = $('<p>');
    $p.append(data.username + " has joined the room.");
   Chat.$messagebox.append($p);
};
Chat.onUserLeave = function(data) {
    var $p = $('<p>');
    $p.append(data.username + " has left the room.");
    Chat.$messagebox.append($p);
};
Chat.sendMessage = function(message) {
    Client.socket.emit('usermessage', {message: message});
};
Chat.sendLogout = function() {
    Client.socket.emit('logout');
};
//catch events
Client.socket.on('usermessage', Chat.onMessage);
Client.socket.on('askusername', Chat.renderLoginView);
Client.socket.on('connect', Chat.renderInitialView);
Client.socket.on('playerready', Chat.renderMainView);
Client.socket.on('roomjoin', Chat.onUserJoin);
Client.socket.on('roomleave', Chat.onUserLeave);