# Poker

## Project Setup

- Run `npm install` to grab the dependencies.
- `npm run start` will start the server, and you can view the WIP at http://localhost:3000

## Exercise Tasks

The game is [5 Card drawer poker](https://en.wikipedia.org/wiki/Five-card_draw). Each player receives 5 cards, they are then able to select one or more of those cards to discard, and then these cards are replaced with new ones. Once every player has exchanged their cards then the player with the best poker hand wins.

We are using the [http://deckofcardsapi.com/]() to create a shuffled deck of cards, and then request cards from that deck which are then assigned to each player.

### Features

You can create a new game, or join an existing game, and the server requires all players to have joined before proceeding to fetching cards.

_To do:_ From the client side, make an AJAX request to ``/games/${gameId}/cards``, adding the javascript required to the [game view page](https://github.com/spacebetween/poker-dev-exercise/blob/master/src/views/game.ejs).  Jquery has been loaded in the head of the page so this can be used to make the request. This will return the current users cards in this format:
```
[
  {
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/4H.svg",
      "png": "https://deckofcardsapi.com/static/img/4H.png"
    },
    "code": "4H",
    "value": "4",
    "suit": "HEARTS",
    "image": "https://deckofcardsapi.com/static/img/4H.png"
  },
  {
    "images": {
      "svg": "https://deckofcardsapi.com/static/img/9D.svg",
      "png": "https://deckofcardsapi.com/static/img/9D.png"
    },
    "code": "9D",
    "value": "9",
    "suit": "DIAMONDS",
    "image": "https://deckofcardsapi.com/static/img/9D.png"
  },
  ...
]
```

Render the cards returned from the API on the page, matching the layout of the designs below:

![Layout](https://imgur.com/t4e0HRo.png) ![Layout](https://imgur.com/GFJ2wMY.png)

### Part 2

Add a route and handler which processes the exchange process. It should fetch the number of cards needed from the deckofcards api, then replace the selected cards with the new ones. The player state should also be updated to set the exchanged flag to true. The cards view can be displayed again to show the player their new hand.

![](https://i.imgur.com/k07LPkc.png)

### Part 3

Once all the players have exchanged their cards they will already get directed to the results page. You will need to integrate an existing library to work out which player has the winning hand. On the results page display the current users hand and the winning hand.

![](https://i.imgur.com/Y2awNiQ.png)
