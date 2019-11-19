const socket = io();
//const socket = io.connect('http://localhost');
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const content = document.getElementById("content-container");
const messageElement = document.getElementById("ide");
let gammelBrukere = [];

const name = prompt("What is your name");
appendName("You Joined");
socket.emit("new-user", name);

socket.on("ny-bruker", brukere => {
  updateListUsers(brukere);
});

socket.on("chat-message", data => {
  appendMessage(`${data.name} : ${data.message}`);
  let list = document.getElementById("tableUsers").childNodes;
});

socket.on("user-connected", name => {
  appendName(`${name} connected`);
  addUser(name);
});

socket.on("sent_message", temp => {
  let user = document.getElementById(temp).childNodes;
  user[1].style.backgroundColor = "#90EE90";
  user[1].innerHTML = "Ready";
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();

  console.log(messageInput.value);

  const message = messageInput.value;

  //appendMessage(`You : ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function countdown(minutes) {
  var seconds = 60;
  var mins = minutes;
  function tick() {
    var counter = document.getElementById("countdown");
    var current_minutes = mins - 1;
    seconds--;
    counter.innerHTML =
      current_minutes.toString() +
      ":" +
      (seconds < 10 ? "0" : "") +
      String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      if (mins > 1) {
        countdown(mins - 1);
      }
    }
  }
  tick();
}

countdown(4);
function appendMessage(message) {
  //const messageElement = document.createElement("div");
  //messageElement.id = "ide";
  messageElement.innerText = message;
  content.appendChild(messageElement);
  //messageInput.value += messageElement.innerText;
}

function appendName(name) {
  const nameElement = document.createElement("div");
  nameElement.innerText = name;
  messageContainer.append(nameElement);
}

function copyText() {
  console.log(messageElement.value);
  let text = document.getElementById("message-input");
  let tekstbox = document.getElementById("ide");
  text.value = tekstbox.value;
  tekstbox.value = "";
}

function updateListUsers(brukere) {
  if (gammelBrukere[0] == null) {
    for (let x = 0; x < brukere.length; x++) {
      addUser(brukere[x]);
    }
    gammelBrukere = brukere.slice();
  } else {
    for (let i = 0; i < brukere.length; i++) {
      let check = brukere.findIndex(null);
      addUser(brukere[check]);
    }
  }
}

function addUser(name) {
  var table = document.getElementById("tableUsers");
  var row = table.insertRow(-1);
  row.id = name;
  var cell = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  cell.innerHTML = name;
  cell2.innerHTML = "Not ready";
}
