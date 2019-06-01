const { getGame, getWinner } = require("../lib/gameStore");

const resultHandler = (req, h) => {
  const { gameId } = req.params;
  const game = getGame(gameId);
  const winnings = getWinner(gameId, req.state.player);
  const isWinner = winnings.winner == req.state.player;
  const currentDeck = winnings.currentDeck;
  const { deck } = winnings;
  const playerId = req.state.player;

  return h.view("result", { isWinner, deck, currentDeck });
};

module.exports = resultHandler;
