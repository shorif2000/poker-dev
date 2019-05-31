const axios = require("axios");
const { getGame, playerExchange } = require("../lib/gameStore");

const exchangeHandler = async (req, h) => {
  console.error("exchangeHandler");
  if (req.payload == null || req.payload.card === undefined) {
    return h.response("No cards selected").code(202);
  }
  if (req.params.gameId === undefined) {
    return h.response("No gameId passed").code(202);
  }

  //need to swap cards 1st
  const game = getGame(req.params.gameId);
  const deckId = game.deck.id;
  const playerId = req.state.player;
  const cards = req.payload.card;

  const exchangeIds = [];
  console.log("playerid: " + playerId);
  const currentPlayerDeck = game.players[playerId].cards;
  console.error(currentPlayerDeck);
  console.error(`${deckId} : ${Object.keys(cards).length}`);
  const newUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${
    Object.keys(cards).length
  }`;
  console.error("call url");
  await axios
    .get(newUrl)
    .then(res => {
      if (res.data.success) {
        //too many loops i can simplify later
        //res.data.cards.forEach((card, id) => {
        cards.forEach((replacecard, id2) => {
          currentPlayerDeck.forEach((card, id) => {
            if (card.code == replacecard) {
              console.error("match founb");
              console.error(currentPlayerDeck[id2]);
              console.error(card);
              currentPlayerDeck[id] = res.data.cards[id2];
            }
          });
        });
        //});
        return currentPlayerDeck;
      }
    })
    .then(currentPlayerDeck => {
      game.players[playerId].cards = currentPlayerDeck;
      game.players[playerId].exchanged = true;
    });
  //update exchange flag
  /*  if (!playerExchange(req.params.gameId, playerId)) {
    return h.response("Waiting for all players to exchange").code(202);
  }

  return h.response("OK");*/
  return currentPlayerDeck;
};

module.exports = exchangeHandler;
