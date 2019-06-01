const uuidv4 = require("uuid/v4");

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
    throw new Error("That game is already full");
  }
  // const exchanged = (allPlayersJoined(game)) ? true : false;
  // console.log('exchanged' , exchanged);
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

module.exports = {
  saveNewGame,
  getGame,
  updateGame,
  addPlayer,
  allPlayersJoined,
  allPlayersExchanged,
  playerExchange
};
