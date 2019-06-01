const { isGame, addPlayer } = require("../lib/gameStore");

const joinGameHandler = async (req, h) => {
  console.error(`playerid: ${req.state.player}`);
  const gameId = req.payload.gameId.replace(/\s/g, "");
  if (!isGame(gameId)) {
    // @TODO return error
    return h.view(`error`, { message: `GameId does not exist ${gameId}` });
  }
  const game = addPlayer(gameId, req.state.player);
  console.error(game);
  return h.redirect(`/games/${gameId}`);
};

module.exports = joinGameHandler;
