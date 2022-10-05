const myModul = (() => {
  ("use strict");

  let deck = [];
  const cardsTypes = ["C", "D", "H", "S"],
    specialCards = ["A", "J", "Q", "K"];

  let playersPoints = [];

  // Referencias del HTML
  const playerNameHTML = document.querySelector(".playerName");
  const btnAskCard = document.querySelector("#btnAskCard");
  const btnStopGame = document.querySelector("#btnStopGame");
  const btnNewGame = document.querySelector("#btnNewGame");
  const btnSendName = document.querySelector(".btnSendName");

  const divPlayersCards = document.querySelectorAll(".divPlayersCards");
  const showPointsSmalls = document.querySelectorAll("small");

  // Esta función inicializa el juego
  const initializeGame = (playersNum = 2) => {
    deck = createDeck();

    playersPoints = [];
    for (let i = 0; i < playersNum; i++) {
      playersPoints.push(0);
    }

    showPointsSmalls.forEach((elem) => (elem.innerText = 0));
    divPlayersCards.forEach((elem) => (elem.innerHTML = ""));

    btnAskCard.disabled = false;
    btnStopGame.disabled = false;
  };

  // Esta función crea un nuevo deck
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of cardsTypes) {
        deck.push(i + type);
      }
    }

    for (let type of cardsTypes) {
      for (let esp of specialCards) {
        deck.push(esp + type);
      }
    }
    return _.shuffle(deck);
  };

  initializeGame();

  // Esta función me permite tomar una card
  const askCard = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  // Turno: 0 = primer jugador y el último será la computadora
  const collectPoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    showPointsSmalls[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cards/${card}.png`; //3H, JD
    cardImg.classList.add("cards");
    divPlayersCards[turn].append(cardImg);
  };

  const determineWinner = () => {
    const [minPoints, computerPoints] = playersPoints;

    setTimeout(() => {
      if (computerPoints === minPoints) {
        Swal.fire({
          title: "EMPATE",
          text: "Nadie Gana",
          imageUrl:
            "https://media4.giphy.com/media/3EiETHgDWzxfAr5JTw/giphy.gif?cid=790b761125647af3eec42f0e7a37c64828a60f4bf5e93038&rid=giphy.gif&ct=g",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image",
        });
      } else if (minPoints > 21) {
        Swal.fire({
          title: "PERDISTE",
          text: "Computadora Gana",
          imageUrl:
            "https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=790b76119303a014478726643a1b2b5b02f2bad39a4c9e96&rid=giphy.gif&ct=g",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image",
        });
      } else if (computerPoints > 21) {
        Swal.fire({
          title: "¡FELICIDADES!",
          text: "Ganaste",
          imageUrl:
            "https://media4.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif?cid=790b76111d094110326ffd85b359d367307e2e845357585d&rid=giphy.gif&ct=g",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image",
        });
      } else {
        Swal.fire({
          title: "PERDISTE",
          text: "Computadora Gana",
          imageUrl:
            "https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=790b76119303a014478726643a1b2b5b02f2bad39a4c9e96&rid=giphy.gif&ct=g",
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Custom image",
        });
      }
    }, 100);
  };

  // turno de la computadora
  const computerTurn = (minPoints) => {
    let computerPoints = 0;

    do {
      const card = askCard();
      computerPoints = collectPoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (computerPoints < minPoints && minPoints <= 21);

    determineWinner();
  };

  // Eventos
  btnSendName.addEventListener("click", () => {
    const playerName = document.querySelector(".playerNameInput").value;
    playerNameHTML.innerHTML =
      playerName.length === 0 ? "Jugador 1" : playerName;
  });

  btnAskCard.addEventListener("click", () => {
    const card = askCard();
    const playerPoints = collectPoints(card, 0);

    createCard(card, 0);

    if (playerPoints > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnAskCard.disabled = true;
      btnStopGame.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      console.warn("21, genial!");
      btnAskCard.disabled = true;
      btnStopGame.disabled = true;
      computerTurn(playerPoints);
    }
  });

  btnStopGame.addEventListener("click", () => {
    btnAskCard.disabled = true;
    btnStopGame.disabled = true;

    computerTurn(playersPoints[0]);
  });

  btnNewGame.addEventListener("click", () => {
    initializeGame();
  });
})();
