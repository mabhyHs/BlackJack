let deck = [];
const cardsTypes = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

let playerPoints = 0;
let computerPoints = 0;

/*HTML*/
const btnAskCard = document.querySelector("#btnAskCard");
const btnStopGame = document.querySelector("#btnStopGame");
const btnNewGame = document.querySelector("#btnNewGame");

const showPointsSmalls = document.querySelectorAll("small");
const divPlayerCards = document.querySelector("#player-cards");
const divComputerCards = document.querySelector("#computer-cards");

/*CREAR BARAJA*/
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

/*LEVANTAR UNA CARTA*/
const askCard = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en el deck"; //chequeo si no hay más cartas en el deck
  }
  const card = deck.pop(); //si hay cartas extraigo la última del array
  return card;
};

/*SABER EL VALOR DE UNA CARTA*/
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const valor = cardValue(askCard());

/*TURNO DE LA COMPUTADORA*/
const computerTurn = (minPoints) => {
  //utilizo do while ya que el ciclo debe ejecutarse al menos una vez
  do {
    const card = askCard();
    computerPoints = computerPoints + cardValue(card);
    showPointsSmalls[1].innerText = computerPoints;

    //MOSTRAR LA IMG HTML
    const cardImg = document.createElement("img");
    cardImg.src = `./assets/cards/${card}.png `;
    cardImg.classList.add("cards");
    divComputerCards.append(cardImg);

    if (minPoints > 21) {
      break;
    }
  } while (computerPoints < minPoints && minPoints <= 21);

  setTimeout(() => {
    if (computerPoints === minPoints) {
      alert("Nadie Gana");
    } else if (minPoints > 21) {
      alert("Computadora Gana!");
    } else if (computerPoints > 21) {
      alert("Jugador Gana!");
    } else {
      alert("computadora gana");
    }
  }, 100);
};

const skipTurn = () => {
  btnAskCard.classList.add("btnDisabled"); //se podría utilizar también btnAskCard.disabled = true
  btnStopGame.classList.add("btnDisabled");
  computerTurn(playerPoints);
};

/*LISTENERS*/
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

  //CONTROLAR PUNTOS
  if (playerPoints > 21) {
    alert("ups perdiste!");
    skipTurn();
  } else if (playerPoints === 21) {
    alert("llegaste a 21!");
    computerTurn(playerPoints);
  }
});

btnStopGame.addEventListener("click", () => {
  skipTurn();
});

btnNewGame.addEventListener("click", () => {
  console.clear();
  deck = []; //reseteo el deck
  createDeck(); //creo uno nuevo

  playerPoints = 0;
  computerPoints = 0;

  showPointsSmalls[1].innerHTML = 0;
  showPointsSmalls[0].innerHTML = 0;

  divComputerCards.innerHTML = "";
  divPlayerCards.innerHTML = "";

  btnAskCard.classList.remove("btnDisabled");
  btnStopGame.classList.remove("btnDisabled");
});

//BORRAR
