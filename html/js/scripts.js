//Initial state of the game... not logged in
function initGame(){
  //set up event listeners
  uiLoginButton.onclick = logInUser;
  uiCloseBtn.onclick = logOutUser;
  uiLeaderboardBtn.onclick = toggleLeaderboard;
  window.resize = resizeGame;

  //initialize game state
  resizeGame();
  uiUsername.innerHTML = username;
}

//In the event the user resizes browser
function resizeGame(){
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  uiCanvas.setAttribute("width", screenWidth.toString());
  uiCanvas.setAttribute("height", screenHeight.toString());
}

//Happens on close button click
//Toggles a few ui components and triggers user-server disconnect intereaction
function logOutUser(){
  uiLoginForm.classList.toggle("visible");
  username = "Not Logged In";
  uiUsername.innerHTML = username;
  uiCloseBtn.classList.toggle('visible');
}

//Happens on login form submission
//Toggles a few ui components and triggers user-server initial intereaction
function logInUser(){
  uiLoginForm.classList.toggle("visible");
  username = uiLoginName.value;
  uiUsername.innerHTML = username;
  uiCloseBtn.classList.toggle('visible');
}

function toggleLeaderboard(){
  uiLeaderboard.classList.toggle('visible');
}

//initialize variables
screenWidth = window.innerWidth;
screenHeight = window.innerHeight;
username = "Not Logged In";

//initialize ui variables
uiLoginForm = document.getElementById("login-cmp");
uiLoginName = document.getElementById("nickname-input");
uiLoginButton = document.getElementById("nickname-button");
uiCloseBtn = document.getElementById("close-cmp");
uiUsername = document.getElementById("username");
uiCanvas = document.getElementById("canvas");
uiLeaderboard = document.getElementById("leaderboard");
uiLeaderboardBtn = document.getElementById("leaderboard-btn");

initGame();
