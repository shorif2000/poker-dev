const { playerExchange } = require("../lib/gameStore");

const exchangeHandler = async (req, h) => {
  console.error("exchangeHandler");
  if (req.payload.card === undefined) {
    return h.response("No cards selected").code(202);
  }
  if (req.params.gameId === undefined) {
    return h.response("No gameId passed").code(202);
  }
  if (!playerExchange(req.params.gameId, req.state.player)) {
    return h.response("Waiting for all players to exchange").code(202);
  }

  return h.response("OK");
};

module.exports = exchangeHandler;
