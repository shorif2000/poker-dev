const { getGame, updateGame } = require("../lib/gameStore");

const cardsHandler = (req, h) => {
  const game = getGame(req.params.gameId);
  const { players } = game;
  const playerId = req.state.player;
  const keys = Object.keys(game.players);
  console.log(keys[0].cards);
  console.log(keys[1].cards);

  updateGame(req.params.gameId, { ...game, players });
  return game.players[playerId].cards;
};

module.exports = cardsHandler;
