/**
 * Test the test-environment
 */
"use strict";

/* global describe it */

var assert = require("assert");


describe("Test to show that unittests work", function() {
    it("should be true", function() {
        let one = 1;
        let two = 1;

        assert.equal(one, two);
    });
});
