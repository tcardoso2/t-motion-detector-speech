/*****************************************************
 * Internal tests
 * What are internal tests?
 * As this is a npm package, it should be tested from
 * a package context, so I'll use "interal" preffix
 * for tests which are NOT using the npm tarball pack
 * For all others, the test should obviously include
 * something like:
 * var md = require('t-motion-detector');
 *****************************************************/

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var fs = require('fs');
var main = require('../main.js');
var events = require('events');
var md = require('t-motion-detector');

//Chai will use promises for async events
chai.use(chaiAsPromised);

describe("When a new motion detector is created, ", function() {
  it('There should be an environment created', function () {
    //Prepare
    md.Start();
    md.GetEnvironment().should.not.equal(undefined);
  });

  it('there should be a speech voice mentioning a new notification.', function (done) {
    //Prepare

    var n = new main.SpeechNotifier();

    n.on('pushedNotification', function(message, text){
        console.log("A new notification has arrived!", message, text);
        text.should.equal("Started");
        done();
    })

    var result = false;
    md.Start({
      initialNotifier: n,
    });

    md.GetEnvironment().AddChange(10);
  });
});