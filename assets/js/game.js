let deck = [];
const cardsTypes = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

let playerPoints = 0;
let computerPoints = 0;

//HTML
const btnAskCard = document.querySelector("#btnAskCard");
const showPointsSmalls = document.querySelectorAll("small");
const divPlayerCards = document.querySelector("#player-cards");

// crear nueva baraja
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of cardsTypes) {
      deck.push(i + type);
    }
  }
  for (let type of cardsTypes) {
    for (let special of specialCards) {
      deck.push(special + type);
    }
  }
  deck = _.shuffle(deck); //libreria para hacer una especie de random con las cartas
  console.log(deck);
};

createDeck();

// Tomar una carta
const askCard = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en el deck"; //chequeo si no hay más cartas en el deck
  }
  const card = deck.pop(); //si hay cartas extraigo la última del array
  return card;
};

//askCard();

// saber el valor de una carta
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const valor = cardValue(askCard());

// Listeners
//Necesito poder "Escuchar" cuando se presiona un botón
btnAskCard.addEventListener("click", () => {
  const card = askCard();

  //MOSTRAR PUNTOS HTML
  playerPoints = playerPoints + cardValue(card); //modifico los puntos del jugador a medida que va pidiendo más cartas
  showPointsSmalls[0].innerText = playerPoints; //muestro los puntos en el html

  //MOSTRAR LA IMG HTML
  const cardImg = document.createElement("img");
  cardImg.src = `./assets/cards/${card}.png `; //muestro la carta en el html
  cardImg.classList.add("cards"); // le agrego la clase dinámicamente
  divPlayerCards.append(cardImg); //muestro la img dentro del div
});
