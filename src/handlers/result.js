const { getGame, getWinner } = require("../lib/gameStore");

const resultHandler = (req, h) => {
  const { gameId } = req.params;
  const game = getGame(gameId);
  getWinner(gameId);
  return h.view("result", { game, gameId });
};

module.exports = resultHandler;
