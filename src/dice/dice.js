/**
 * A module for a dice.
 *
 * @module
 */
"use strict";

class Dice {
    /**
     * @constructor
     *
     */
    constructor() {
        this.sides   = [1, 2, 3, 4, 5, 6];
    }



    /**
     * Get a card to display based on the id of the card.
     *
     * @returns {int} An int representing the side of the dice
     */
    rollDice() {
        var side;


        side    = this.sides[Math.floor(Math.random()*this.sides.length)];
        return side;
    }
}



// Export module
module.exports = Dice;
