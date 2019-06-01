const uuidv4 = require("uuid/v4");
const Joi = require("joi");
const newGameHandler = require("./handlers/newGame");
const joinGameHandler = require("./handlers/joinGame");
const gamePlayHandler = require("./handlers/gamePlay");
const cardsHandler = require("./handlers/cards");
const exchangeCheckHandler = require("./handlers/exchangeCheck");
const exchangeHandler = require("./handlers/exchange");
const resultHandler = require("./handlers/result");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      h.state("player", uuidv4());
      return h.view("index");
    }
  },
  {
    method: "POST",
    path: "/games",
    config: {
      handler: newGameHandler,
      validate: {
        payload: {
          numPlayers: Joi.number().required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/games/join",
    config: {
      handler: joinGameHandler,
      validate: {
        payload: {
          gameId: Joi.string().required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/games/{gameId}/exchange",
    config: {
      handler: exchangeHandler
      // validate: {
      // payload: {
      // gameId: Joi.string().required(),
      // }
      // }
    }
  },
  {
    method: "GET",
    path: "/games/{gameId}",
    handler: gamePlayHandler
  },
  {
    method: "GET",
    path: "/games/{gameId}/pending",
    handler: (req, h) => h.view("pending", { gameId: req.params.gameId })
  },
  {
    method: "GET",
    path: "/games/{gameId}/allExchanged",
    handler: exchangeCheckHandler
  },
  {
    method: "GET",
    path: "/games/{gameId}/cards",
    handler: cardsHandler
  },
  {
    method: "GET",
    path: "/games/{gameId}/result",
    handler: resultHandler
  },
  {
    method: "GET",
    path: "/css/{param*}",
    handler: {
      directory: {
        path: "css"
      }
    }
  },
  {
    method: "GET",
    path: "/js/{param*}",
    handler: {
      directory: {
        path: "js"
      }
    }
  },
  {
    method: "GET",
    path: "/error",
    handler: (req, h) => h.view("error", { message: req.params.message })
  }
];
