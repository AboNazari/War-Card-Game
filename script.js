import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const playerDeckElement = document.querySelector(".player-deck");
const computerDeckElement = document.querySelector(".computer-deck");
const text = document.querySelector(".text");
const startButton = document.querySelector(".start");
let playerDeck, computerDeck, inRound, stop;

startButton.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }
  if (inRound) {
    clearBeforeGame();
    startButton.innerText = "Start";
    startButton.style.backgroundColor = "red";
  } else {
    flipCard();
    startButton.innerText = "Collect";
    startButton.style.backgroundColor = "green";
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.Shuffle();
  const midpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, 10));
  computerDeck = new Deck(deck.cards.slice(midpoint, 36));
  inRound = false;

  clearBeforeGame();
}

function clearBeforeGame() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "Get Ready";

  updateDeckCount();
}

function flipCard() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win!";
    text.style.backgroundColor = "green";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "lose!";
    text.style.backgroundColor = "red";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "draw!";
    text.style.backgroundColor = "yellowgreen";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (gameIsOver(playerDeck)) {
    text.innerText = "You Lost the Game!";
    stop = true;
  } else if (gameIsOver(computerDeck)) {
    text.innerText = "Congrates, You Won the Game!";
    stop = true;
  }
}

function updateDeckCount() {
  playerDeckElement.innerText = playerDeck.numberOfCards;
  computerDeckElement.innerText = computerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function gameIsOver(deck) {
  return deck.numberOfCards === 0;
}
