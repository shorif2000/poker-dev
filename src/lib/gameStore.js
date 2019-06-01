const uuidv4 = require("uuid/v4");
const { Hand } = require("pokersolver");

let games = {};

const saveNewGame = (deck, numPlayers, firstPlayerId) => {
  const gameId = uuidv4();
  const newGame = {
    deck,
    numPlayers,
    players: { [firstPlayerId]: { cards: [], exchanged: false } }
  };
  games = { ...games, [gameId]: newGame };
  return gameId;
};

const isGame = gameId => {
  if (!games.hasOwnProperty(gameId)) {
    return false;
  }
  return true;
};

const getGame = gameId => {
  if (!games.hasOwnProperty(gameId)) {
    throw new Error(`Could not find game with id ${gameId}`);
  }

  return games[gameId];
};

const updateGame = (gameId, newGameState) => {
  games = { ...games, [gameId]: newGameState };
  return newGameState;
};

const allPlayersJoined = game =>
  Object.keys(game.players).length === game.numPlayers;

const addPlayer = (gameId, playerId) => {
  const game = getGame(gameId);
  if (allPlayersJoined(game)) {
    console.error("That game is already full");
    throw new Error("That game is already full");
  }
  const players = {
    ...game.players,
    [playerId]: { cards: [], exchanged: false }
  };
  return updateGame(gameId, { ...game, players });
};

const allPlayersExchanged = gameId => {
  const { players } = getGame(gameId);
  return (
    Object.keys(players).filter(pk => players[pk].exchanged === true).length ===
    Object.keys(players).length
  );
};

const playerExchange = (gameId, player) => {
  const game = getGame(gameId);
  const { players } = getGame(gameId);
  players[player].exchanged = true;
  if (updateGame(gameId, { ...game, players }) instanceof Object) {
    return true;
  }
  return false;
};

const getWinner = gameId => {
  const { players } = getGame(gameId);
  var hands = [];
  Object.keys(players).forEach(key => {
    console.error(players[key].cards);
    //console.error(
    var playerCards = [];
    playerCards = Object.keys(players[key].cards).map(function(key2) {
      console.error(players[key].cards[key2].code);
      return players[key].cards[key2].code;
    });
    console.log(Hand.solve(playerCards));
    //);
  });
};

module.exports = {
  saveNewGame,
  isGame,
  getGame,
  getWinner,
  updateGame,
  addPlayer,
  allPlayersJoined,
  allPlayersExchanged,
  playerExchange
};
