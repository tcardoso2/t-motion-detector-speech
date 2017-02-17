//Do I need the events library? Seems not
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
class SpeechNotifier extends md.Entities.BaseNotifier{

  constructor()
  {
    super();
    this.name = "Default Base Notifier";
  }
  //events.EventEmitter.call(this);

  notify(text){
    voice.message = text;
    voice.start();
    this.emit('pushedNotification', this.name, text);
  }
}
SpeechNotifier.prototype.__proto__ = md.Entities.BaseNotifier.prototype;
exports.SpeechNotifier = SpeechNotifier;