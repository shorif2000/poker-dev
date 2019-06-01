const axios = require("axios");
const { getGame } = require("../lib/gameStore");

const exchangeHandler = async (req, h) => {
  console.error("exchangeHandler");
  console.error(req.payload);
  /* const card = Object.keys(req.payload).map(function(key) {
    return [Number(key), obj[key]];
  }); */
  // console.error(`card: ${card}`);
  if (req.payload == null || req.payload.card === undefined) {
    return h.response("No cards selected").code(202);
  }
  if (req.params.gameId === undefined) {
    return h.response("No gameId passed").code(202);
  }

  // need to swap cards 1st
  const game = getGame(req.params.gameId);
  const deckId = game.deck.id;
  const playerId = req.state.player;
  // @TODO handle arrays
  const cards =
    typeof req.payload.card === "string"
      ? [req.payload.card]
      : req.payload.card;

  console.log(`playerid: ${playerId}`);
  const currentPlayerDeck = game.players[playerId].cards;
  console.error(currentPlayerDeck);
  console.error(`${deckId} : ${Object.keys(cards).length}`);
  const newUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${
    Object.keys(cards).length
  }`;
  await axios
    .get(newUrl)
    .then(res => {
      if (res.data.success) {
        // @TODO too many loops i can simplify later
        console.error(cards);
        cards.forEach((replacecard, id2) => {
          currentPlayerDeck.forEach((card, id) => {
            if (card.code === replacecard) {
              console.error("match founb");
              console.error(currentPlayerDeck[id2]);
              console.error(card);
              currentPlayerDeck[id] = res.data.cards[id2];
            }
          });
        });
      }
      return currentPlayerDeck;
    })
    .then(playerDeck => {
      game.players[playerId].cards = playerDeck;
      game.players[playerId].exchanged = true;
    });

  return currentPlayerDeck;
};

module.exports = exchangeHandler;
