const candies = ["Green", "Red", "White", "Yellow", "Purple", "Orange"];
var board = [];
const rows = 9;
const colums = 9;
var score = 0;

var currTile;
var otherTile;

//new variables for the win condition//
var winScore = 500;   //how many points you need to win//
var gameOver = false; //this becomes true when the player wins//
var gameLoop;         //here we save the timer so we can stop it after winning//


window.onload = function () {

  startGame();
  document.getElementById("winScore").innerText = winScore;
  //1/10th of a second
  gameLoop = window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
}
//generating rendom candies//
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)]; //Here we are going to get a random candy each time and we also want to get rid of decimal number, all of that is connected to the color candies at the beginning of the code//
  //return candies[0]
}




function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < colums; c++) {
      //<img id = "0-0" src = "./images/Red.png">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      //here is the part of the code that will make us understand where is each candy located on the board//
      tile.src = "./images/" + randomCandy() + ".png";


      //Drag Funcionality//
      tile.addEventListener("dragstart", dragStart); //clicking on a candy, initializes the drag proceess//
      tile.addEventListener("dragover", dragOver); //clicking the candy, moving the mouse to drag the candy//
      tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy//
      tile.addEventListener("dragleave", dragLeave); //leave candy on another candy//
      tile.addEventListener("drop", dragDrop);// droping a candy over another candy//
      tile.addEventListener("dragend", dragEnd);// after drag process compleated we swap canieds//





      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  //this refers to tile taht was clicked on for dragging//
  currTile = this;

}

function dragOver(e) {

  e.preventDefault();
}

function dragEnter(e) {

  e.preventDefault();
}

function dragLeave() {


}

function dragDrop() {
  //that refers to the target tile that was dropped on//
  otherTile = this;
}

function dragEnd() {
  if (gameOver) {
    return; //game is finished, so we do not allow moving candies anymore//
  }

  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;

  }

  let currCoords = currTile.id.split("-");//  id = "0-0" -> ["0", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;

  let moveUp = r2 == r - 1 && c == c2;
  let moveDown = r2 == r + 1 && c == c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();
    if (!validMove) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function crushCandy() {
  //crushFive();
  //CrushFour();
  crushThree();
  document.getElementById("score").innerText = score;
  checkWin(); //every score update we check if the player won//
}

function crushThree() {

  //check rows
  for (let r = 0; r < rows; r++) {
    for (c = 0; c < colums - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }

    }
  }

  //check colums
  for (let c = 0; c < colums; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }

    }
  }
}


function checkValid() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (c = 0; c < colums - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        return true;
      }

    }
  }

  //check colums
  for (let c = 0; c < colums; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        return true;
      }

    }
  }
  return false;
}

function slideCandy() {
  for (let c = 0; c < colums; c++) {
    let ind = rows - 1;
    for (let r = colums - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }
    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "./images/blank.png";
    }
  }
}

function generateCandy() {
  for (let c = 0; c < colums; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}


//----- WIN CONDITION -----//

function checkWin() {
  //if the score is big enough and we did not already win//
  if (score >= winScore && gameOver == false) {
    gameOver = true;
    clearInterval(gameLoop); //stop the game so the board freezes//
    document.getElementById("finalScore").innerText = score;
    document.getElementById("winPopup").style.display = "flex"; //show the pop-up//
  }
}

function restartGame() {
  location.reload(); //just reload the whole page to start again//
}


//----- SETTINGS MODAL -----//

function openSettings() {
  document.getElementById("settingsPopup").style.display = "flex"; //show the modal//
}

function closeSettings() {
  document.getElementById("settingsPopup").style.display = "none"; //hide the modal//
}


//----- THEMES -----//

function setTheme(name) {
  //the class on the body decides which background and colors the CSS uses//
  document.body.className = name;
  showActiveButton(name);
}

function showActiveButton(name) {
  //first take the mark off every button//
  let buttons = document.getElementById("themeBar").children;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
  }
  //then mark the one the player is using//
  document.getElementById("theme-" + name).className = "activeTheme";
}
