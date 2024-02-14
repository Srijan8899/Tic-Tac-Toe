const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let's create a function to initialise the game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // well well well we this for the new button , when clicked we remove all X and O from boxes and show this on UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //one more thing is missing , initialise box with css properties again
    box.classList = `box box${index+1}`;

  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

//Now I click on box , so X or O will display , we do eventListner in this

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  //check if my box is empty then player can take on this box with X or O
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    //after box filled remove the pointer cursur
    boxes[index].style.pointerEvents = "none";
    //now time to swap turn
    swapTurn();
    //check if anyone win
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    //all three boxes should be non empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is x
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      // disable pointer if already wins
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      //Now we know X or O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // it means we have winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //let's check we have Tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box != "") {
      fillCount++;
    }
  });

  //board is filled , game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied";
    newGameBtn.classList.add("active");
  }
}

newGameBtn.addEventListener("click", initGame);
