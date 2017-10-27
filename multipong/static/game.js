var Game = {};
Client.namespace = window.location.href + "/";
Client.connect();

Game.init = function() {
    // recommend tearing down any existing game states
    console.log("Game Init");
    Game.playerMap = {}; // Keep track of other players in room
    //Setup canvas and show username prompt
    //start game loop to display current game data
};

Game.create = function() {
    // recommend first tearing down any existing player states
    //Setup player object and controls event handlers

};

