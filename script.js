//all the selectors
const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScore = document.querySelector("[data-computer-score]");
const YourScore = document.querySelector("[data-your-score]");

//an array of stored data
const SELECTIONS = [
  {
    name: "rock", //ROCK BEATS SCISSORS IN GAME
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper", //PAPER BEATS ROCK IN GAME
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors", //SCISSORS BEAT PAPER IN GAME
    emoji: "✌",
    beats: "paper",
  },
];

// adding click event on buttons-
selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    //gives the name of selection which is rock/paper/scissors
    // defined in html page.
    const selectionName = selectionButton.dataset.selection;

    //loops into all the selections and finding
    // the one that has the exact same name.
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );

    makeSelection(selection);
  });
});

//main function contains all functions
function makeSelection(selection) {
  const computerSelection = randomSelection();

  const yourWinner = winner(selection, computerSelection);
  const computerWinner = winner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(YourScore);
  if (computerWinner) incrementScore(computerScore);
}

//increment score
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

// show results on page
function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

//for winner if selection beats  is equal to opponent name
function winner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

//for computer
function randomSelection() {
  const RandomIndex = Math.floor(Math.random() * SELECTIONS.length); //gives random numbers between 0 to length of SELECTIONS array which is 0 , 1,2.
  return SELECTIONS[RandomIndex];
}
