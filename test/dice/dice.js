/**
 * Test for class Dice.
 */
"use strict";

/* global describe it */

var expect = require('expect.js');
const Dice = require("../../src/dice/dice");


describe("Get a random side and ckeck if it is a number", function() {
    it("should be a number", function() {
        let dice = new Dice();
        let res = dice.rollDice();

        expect(res).to.be.a('number');
    });
});
