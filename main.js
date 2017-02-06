var events = require("events");
var md = require('t-motion-detector');
var Cylon = require("cylon");

var voice = Cylon.robot({
  message: "You have not set anything for me to say.",
  
  connections: {
    speech: { adaptor: "speech" }
  },

  devices: {
    voice1: { driver: "speech", language: "american", gender: "f", speed: 120 },
    voice2: { driver: "speech", language: "english", gender: "m", speed: 130 }
  },

  work: function(my) {
    my.voice1.say(this.message, function() {
      //my.voice2.say("What did you say?", function() {
      //});
    });
  }
});

//A Speech Notifier object for sending notifications, which speaks also the message being sent
function SpeechNotifier(){

  this.name = "Default Base Notifier";

  //events.EventEmitter.call(this);

  this.Notify = function(text){
    voice.message = text;
    voice.start();
    this.emit('pushedNotification', this.name, text);
  }
}
SpeechNotifier.prototype.__proto__ = md.BaseNotifier.prototype;
exports.SpeechNotifier = SpeechNotifier;