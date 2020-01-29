# Poker

## Project Setup

- Run `npm install` to grab the dependencies.
- `npm run start` will start the server, and you can view the WIP at http://localhost:3000

## Exercise Tasks

The game is [5 Card drawer poker](https://en.wikipedia.org/wiki/Five-card_draw). Each player receives 5 cards, they are then able to select one or more of those cards to discard, and then these cards are replaced with new ones. Once every player has exchanged their cards then the player with the best poker hand wins.

We are using the [http://deckofcardsapi.com/]() to create a shuffled deck of cards, and then request cards from that deck which are then assigned to each player.

### Features

You can create a new game, or join an existing game, and the server requires all players to have joined before proceeding to fetching cards.


