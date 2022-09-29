let deck = [];
const cardsTypes = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

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
  deck = _.shuffle(deck);
  console.log(deck);
};

createDeck();

// Tomar una carta
const askCard = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en el deck";
  }
  const card = deck.pop();
  console.log(card);
  return card;
};

//askCard();

// saber el valor de una carta

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const valor = cardValue("KD");
console.log({ valor });
