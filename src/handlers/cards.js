const { getGame, updateGame } = require("../lib/gameStore");

const cardsHandler = (req, h) => {
  const game = getGame(req.params.gameId);
  const { players } = game;
  const playerId = req.state.player;

  updateGame(req.params.gameId, { ...game, players });
  return game.players[playerId].cards;
};

module.exports = cardsHandler;
