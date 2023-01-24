/* TODO
  - Seperate the logic from the UI
  - Seperate currentDeck and sortDeck, only want to sort the display, not the deck order
*/

/*LOGIC SECTION

  GLOBAL VARIABLES:
   currentHand;
   currentDeck;
   deckDisplayed = false;
   discardPile = [];
   currentHandSize = 5;
   jokersChecked = false;

  INPUTS: 

  BUTTONS:  
  For each button inclue the following:
  1. Button getElementById
  2. Button Handler
  3. Button addEventListener  

  Button Handler is made up of helper functions. 
  
  1. New Deck (id: button-new-deck)
      functions: 
        - resetDeck
        - makeDeck
        - shuffleDeck


  2. New Hand (id: button-new-hand)
      functions:
        - resetHand
        - makeHand(currentHandSize)
        - renderHand

  3. Shuffle Deck
      functions:
        - shuffleDeck()
        - renderDeck()

  4. Draw Card (id: button-draw-card)
      functions:
        - drawCard(1)
        - renderHand
        
  6. Sort Hand (id: button-sort-hand)
      functions:
        - sortHand
        - renderHand


  7. Sort Deck (id: button-sort-deck)
      functions:
        - sortDeck
        - renderDeck


  8. Show Deck (id: button-show-deck)
      functions:
        - showDeck
        - renderDeck



  HELPER FUNCTIONS:
    1. makeDeck
    2. shuffleDeck
    3. sortDeck
    4. showDeck
    5. drawCard
    6. sortHand
    7. resetHand
    8. resetDeck
    9. hideDeck
    10. showDiscard

  */

// Global Variables
let currentHand;
let currentDeck;
let deckDisplayed = false;
const discardPile = [];
let currentHandSize = 5;
let jokersChecked = false;

// New Deck
const buttonNewDeck = document.getElementById("button-new-deck");
const buttonNewDeckHandler = () => {
  console.log("BUTTON: New Deck");
  resetDeck();
  makeDeck();
  shuffleDeck();
};
buttonNewDeck.addEventListener("click", buttonNewDeckHandler);

// New Hand
const buttonNewHand = document.getElementById("button-new-hand");
const buttonNewHandHandler = () => {
  console.log("BUTTON: New Hand");
  resetHand();
  makeHand(currentHandSize);
  renderHand();
};
buttonNewHand.addEventListener("click", buttonNewHandHandler);

// Shuffle Deck
const buttonShuffleDeck = document.getElementById("button-shuffle-deck");
const buttonShuffleDeckHandler = () => {
  console.log("BUTTON: Shuffle Deck");
  shuffleDeck();
  renderDeck();
};
buttonShuffleDeck.addEventListener("click", buttonShuffleDeckHandler);

// Draw Card
const buttonDrawCard = document.getElementById("button-draw-card");
const buttonDrawCardHandler = () => {
  console.log("BUTTON: Draw Card");
  drawCard(1);
  renderHand();
};
buttonDrawCard.addEventListener("click", buttonDrawCardHandler);

// Sort Hand
const buttonSortHand = document.getElementById("button-sort-hand");
const buttonSortHandHandler = () => {
  console.log("BUTTON: Sort Hand");
  sortHand();
  renderHand();
};
buttonSortHand.addEventListener("click", buttonSortHandHandler);

// Sort Deck
const buttonSortDeck = document.getElementById("button-sort-deck");
const buttonSortDeckHandler = () => {
  console.log("BUTTON: Sort Deck");
  sortDeck();
  renderDeck();
};
buttonSortDeck.addEventListener("click", buttonSortDeckHandler);

// Show Deck
const buttonShowDeck = document.getElementById("button-show-deck");
const buttonShowDeckHandler = () => {
  deckDisplayed = !deckDisplayed;
  deckDisplayed ? hideDeck() : showDeck();
  console.log("BUTTON: Show Deck");
};
buttonShowDeck.addEventListener("click", buttonShowDeckHandler);

const refreshDeck = () => {
  const cardsInDeck = displayDeck.getElementsByClassName("card-container");
  renderDeck();
};

const buttonShowDiscard = document.getElementById("button-show-discard");
const buttonShowDiscardHandler = () => {
  console.log("BUTTON: Show Discard");
  showDiscard();
};
buttonShowDiscard.addEventListener("click", buttonShowDiscardHandler);

// Helper Functions
function makeDeck(includeJokers) {
  const suits = [
    ["hearts", "H", "♥", 1],
    ["diamonds", "D", "♦", 2],
    ["clubs", "C", "♣", 3],
    ["spades", "S", "♠", 4],
  ];
  const values = [
    ["ace", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["10", 10],
    ["jack", 10],
    ["queen", 10],
    ["king", 10],
  ];
  const jokers = ["red_joker", "black_joker"];

  let deck = [];
  for (let suit in suits) {
    for (let value in values) {
      const card = {
        suitName: suits[suit][0],
        suitLetter: suits[suit][1],
        suitSort: suits[suit][3],
        suitSymbol: suits[suit][2],
        valueName: values[value][0],
        valueNumber: values[value][1],
        cardName: `${values[value][0]}_of_${suits[suit][0]}`,
        cardCode: `${values[value][0]}${suits[suit][2]}`,
      };
      deck.push(card);
    }
  }
  //include jokers if true
  includeJokers ? deck.push(...jokers) : deck;
  console.log(`deck created, jokers: ${includeJokers} @makeDeck`);
  return deck;
}

function shuffleDeck() {
  for (card in currentDeck) {
    let randomIndex = Math.floor(Math.random() * currentDeck.length);
    let temp = currentDeck[card];
    currentDeck[card] = currentDeck[randomIndex];
    currentDeck[randomIndex] = temp;
  }
  console.log("deck shuffled. @shuffleDeck");
}

function sortDeck() {
  const tempDeck = currentDeck;
  currentDeck.sort((a, b) => {
    if (a.suitSort < b.suitSort) {
      return -1;
    }
    if (a.suitSort > b.suitSort) {
      return 1;
    }
    if (a.suitSort === b.suitSort) {
      if (a.valueNumber < b.valueNumber) {
        return -1;
      }
      if (a.valueNumber > b.valueNumber) {
        return 1;
      }
    }
  });

  console.log("deck sorted. @sortDeck");
}

function showDeck() {
  renderDeck();
  console.log("deck shown. @showDeck");
}

function drawCard() {
  const card = currentDeck.pop();
  currentHand.push(card);
  console.log(`card drawn: ${card.cardName} @drawCard`);
}

function makeHand(numberOfCards) {
  for (let i = 0; i < numberOfCards; i++) {
    drawCard();
  }
  console.log("hand created. @makeHand");
}

function sortHand() {
  currentHand.sort((a, b) => {
    if (a.suitSort < b.suitSort) {
      return -1;
    }
    if (a.suitSort > b.suitSort) {
      return 1;
    }
    if (a.suitSort === b.suitSort) {
      if (a.valueNumber < b.valueNumber) {
        return -1;
      }
      if (a.valueNumber > b.valueNumber) {
        return 1;
      }
    }
  });
  console.log("hand sorted. @sortHand");
}

function resetHand() {
  currentHand.forEach((card) => {
    discardPile.push(card);
  });
  currentHand = [];
  console.log("hand reset. @resetHand");
}

function resetDeck() {
  currentDeck = makeDeck(jokersChecked);
  currentHand = [];
  console.log("deck reset. @resetDeck");
}

function hideDeck() {
  displayDeck.innerHTML = "";
  console.log("deck hidden. @hideDeck");
}

function showDiscard() {
  displayDiscard.innerHTML = "";
  for (let card of discardPile) {
    displayDiscard.appendChild(renderCard(card));
  }
}

/* DISPLAY SECTION
  RENDER FUNCTIONS

  
  1. renderCard
      returns a card container with front and back images
      adds tilt effect to each card

  2. renderHand
      appends all cards in currentHand to displayHand

  3. renderDeck
      appends all cards in currentDeck to displayDeck

  4. renderDiscard
      appends all cards in discardPile to displayDiscard



  HELPER FUNCTIONS
  
  1. addTiltToCardContainer(card)
      adds tilt effect to card container


*/
const displayDeck = document.getElementById("deck-display-container");
const displayHand = document.getElementById("hand-display-container");
const displayDiscard = document.getElementById("discard-display-container");

const renderCard = (card) => {
  const cardContainer = document.createElement("div");

  cardContainer.classList.add("card-container");

  const cardImageContainer = document.createElement("div");
  cardImageContainer.classList.add("card-image-container");

  const cardImageFront = document.createElement("img");
  cardImageFront.classList.add("card-image-front", "card-image");
  cardImageFront.src = `./card-images/${card.cardName}.svg`;
  cardImageFront.alt = `${card.cardCode}`;

  const cardImageBack = document.createElement("img");
  cardImageBack.classList.add("card-image-back", "card-image", "flipped");
  cardImageBack.src = `./card-images/card-back-1.png`;
  cardImageBack.alt = `card_back`;

  cardImageContainer.appendChild(cardImageFront);
  cardImageContainer.appendChild(cardImageBack);
  cardContainer.appendChild(cardImageContainer);

  addTiltToCardContainer(cardContainer);

  cardContainer.classList.add("show-card");

  cardContainer.addEventListener("click", () => {
    cardImageFront.classList.toggle("flipped");
    cardImageBack.classList.toggle("flipped");
  });
  console.log(`card rendered: ${card.cardName} @renderCard`);
  return cardContainer;
};

const renderHand = () => {
  displayHand.innerHTML = "";
  for (let card of currentHand) {
    displayHand.appendChild(renderCard(card));
  }
};

function renderDeck() {
  displayDeck.innerHTML = "";
  for (let card of currentDeck) {
    displayDeck.appendChild(renderCard(card));
  }
}

function addTiltToCardContainer(tiltMe) {
  tiltMe.setAttribute("data-tilt", "");
  tiltMe.setAttribute("data-tilt-reset", "false");
  VanillaTilt.init(tiltMe, {
    max: 10,
    speed: 400,
    perspective: 1000,
    glare: true,
    tiltReset: false,
    "max-glare": 0.5,
  });
}

function toggleShowHideCard(card) {
  card.classList.toggle("hide-card");
}

/* INFO SECTION
  displays info about the deck and hand

  For each info item there is a function that updates the value.
  all info funcitons are included in updateInfo(), which is called
  each time a menu button is pressed.
*/

//Add upadteinfo to each button.
const menuButtons = document.querySelectorAll(".menu-button");
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateInfo();
  });
});

const infoNextCard = document.getElementById("info-next-card");
const infoDeckSize = document.getElementById("info-deck-size");
const infoHandSize = document.getElementById("info-hand-size");
const infoDeckValue = document.getElementById("info-deck-value");
const infoHandValue = document.getElementById("info-hand-value");
const infoDiscardSize = document.getElementById("info-discard-size");

const getNextCard = () => {
  nextCard = currentDeck[currentDeck.length - 1];
  infoNextCard.innerHTML = nextCard.cardCode;
  console.log(`next card: ${nextCard.cardCode} @getNextCard`);
};

const getDeckSize = () => {
  deckSize = currentDeck.length;
  infoDeckSize.innerHTML = deckSize;
  console.log(`deck size: ${deckSize} @getDeckSize`);
};

const getHandSize = () => {
  handSize = currentHand.length;
  infoHandSize.innerHTML = handSize;
  console.log(`hand size: ${handSize} @getHandSize`);
};

const getDeckValue = () => {
  deckValue = 0;
  for (card of currentDeck) {
    deckValue += card.valueNumber;
  }
  infoDeckValue.innerHTML = deckValue;
  console.log(`deck value: ${deckValue} @getDeckValue`);
};

const getHandValue = () => {
  handValue = 0;
  for (card of currentHand) {
    handValue += card.valueNumber;
  }
  infoHandValue.innerHTML = handValue;
  console.log(`hand value: ${handValue} @getHandValue`);
};

const getDiscardSize = () => {
  discardSize = discardPile.length;
  infoDiscardSize.innerHTML = discardSize;
  console.log(`discard size: ${discardSize} @getDiscardSize`);
};

//Updates all info, called each time a menu button is pressed.
const updateInfo = () => {
  getNextCard();
  getDeckValue();
  getHandValue();
  getDeckSize();
  getHandSize();
  getDiscardSize();
};
