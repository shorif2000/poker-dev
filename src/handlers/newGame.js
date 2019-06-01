const axios = require("axios");
const { saveNewGame } = require("../lib/gameStore");

const newGameHandler = async (req, h) => {
  //server.plugins.crumb.generate(req, h)
  return axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => {
      const { deck_id, remaining } = res.data;
      return { id: deck_id, remaining };
    })
    .then(deck => saveNewGame(deck, req.payload.numPlayers, req.state.player))
    .then(gameId => h.redirect(`/games/${gameId}`));
};

module.exports = newGameHandler;
