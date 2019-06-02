const { getWinner } = require("../lib/gameStore");

const resultHandler = (req, h) => {
  const { gameId } = req.params;
  const winnings = getWinner(gameId, req.state.player);
  const isWinner = winnings.winner === req.state.player;
  const { currentDeck } = winnings;
  const { deck } = winnings;

  return h.view("result", { isWinner, deck, currentDeck });
};

module.exports = resultHandler;
