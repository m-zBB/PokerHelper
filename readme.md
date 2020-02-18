# PokerHelper (Poker Texas Hold'Em)

## Assumptions

1. All poker hands from best to worst
2. The chance for the best hand cards before the flop (requires the number of opponents)
3. Calculation of the possible hands with a percentage chance of a hand after 3 and 4 cards from the table (flop + turn)
4. The best hand after river (plus percentage chance)

## Development

### Build poker-odds-calc.js

npx browserify node_modules\poker-odds-calc\dist\index.js -o src\js_lib\poker-odds-calc.js
npx browserify node_modules\hutchison\dist\index.js -o src\js_lib\hutchison.js