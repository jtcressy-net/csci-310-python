//App class to control the flow of the game and overall game components
function App(){
  //initialize public variables
  size = 2000;
  pongBalls = new Array();

  //Initial state of the game... not logged in
  this.init = function(){
    //initialize game state
    ui.init(this);
  }

  //The game loop
  loop = function(){
    for(var a = 0; a < pongBalls.length; a++){
      pongBalls[a].x += pongBalls[a].xDir;
      pongBalls[a].y += pongBalls[a].yDir;
      if(pongBalls[a].x >= 2000 || pongBalls[a].x < 0){
        pongBalls[a].xDir *= -1;
      }
      if(pongBalls[a].y >= 2000 || pongBalls[a].y < 0){
        pongBalls[a].yDir *= -1;
      }
    }
  }

  //Happens on login form submission
  this.logInUser = function(){
    ui.logInUser();
    pongBalls.push({type:"normal", x:0, y:0, xDir:Math.sqrt(2), yDir:Math.sqrt(2)});
    LOOP = setInterval(loop, 1000/60);
  }

  //Happens on close button click
  this.logOutUser = function(){
    ui.logOutUser();
    clearInterval(LOOP);
  }

  //Toggles Popup showing framerate keycodes and other usefull info
  this.toggleDebugMode = function(){
    debugMode = !debugMode;
  }
}

//User Interface Class to controll the user interface elements
function Ui(){
  //initialize private ui variables
  loginForm = document.getElementById("login-cmp");
  loginName = document.getElementById("nickname-input");
  loginBtn = document.getElementById("nickname-button");
  closeBtn = document.getElementById("close-cmp");
  username = document.getElementById("username");
  canvas = document.getElementById("canvas");
  leaderboard = document.getElementById("leaderboard");
  leaderboardBtn = document.getElementById("leaderboard-btn");

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  user = "Not Logged In";


  //set up ui event listeners
  this.init = function(app){
    loginBtn.onclick = app.logInUser;
    closeBtn.onclick = app.logOutUser;
    leaderboardBtn.onclick = toggleLeaderboard;
    window.resize = resize;
    username.innerHTML = user;
    window.onkeypress = processAppInput;
  }

  //In the event the user resizes browser
  resize = function(){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    uiCanvas.setAttribute("width", screenWidth.toString());
    uiCanvas.setAttribute("height", screenHeight.toString());
  }

  //Toggles a few ui components and updates info
  this.logOutUser = function(){
    loginForm.classList.toggle("visible");
    user = "Not Logged In";
    username.innerHTML = user;
    closeBtn.classList.toggle('visible');
  }

  //Toggles a few ui components and updates info
  this.logInUser = function(){
    loginForm.classList.toggle("visible");
    user = loginName.value;
    username.innerHTML = user;
    closeBtn.classList.toggle('visible');
  }

  processAppInput = function(event){
    //input if user is logged in
    if(!loginForm.classList.contains("visible")){
      console.log(event.keyCode);
      if(event.keyCode == 113)//Q
        app.logOutUser();
      else if(event.keyCode == 63)//?
        app.toggleDebugMode();
    }
    //input if user is not logged in
    else{
      if(event.keyCode == 13)//ENTER
        app.logInUser();
    }
  }

  toggleLeaderboard = function(){
    leaderboard.classList.toggle('visible');
  }
}

app = new App();
ui = new Ui();

app.init();
ui.init(app);
