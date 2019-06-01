const axios = require("axios");
const { allPlayersJoined, getGame, updateGame } = require("../lib/gameStore");

const chunk = (arr, len) => {
  const chunks = [];
  const n = arr.length;
  let i = 0;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

const gamePlayHandler = async (req, h) => {
  const { gameId } = req.params;
  const game = getGame(gameId);
  const { players } = game;

  if (!allPlayersJoined(game)) {
    return h.redirect(`/games/${gameId}/pending`);
  }

  // All players have joined
  console.error("grabbing deck of cards");
  const deckId = game.deck.id;
  const apiUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${game.numPlayers *
    5}`;
  return axios
    .get(apiUrl)
    .then(res => res.data.cards)
    .then(cards => chunk(cards, 5))
    .then(hands => {
      // Object.keys(players).forEach(
      // (playerId, idx) => (players[playerId].cards = hands[idx])
      // );
      console.error(hands);
      players[req.state.player].cards = hands[0];
      const newGameState = { ...game, players };
      updateGame(gameId, newGameState);
    })
    .then(() => h.view("game", { gameId }));
};

module.exports = gamePlayHandler;
