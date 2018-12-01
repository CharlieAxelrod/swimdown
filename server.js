var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/swimdown');

var Schema = mongoose.Schema;
var Bets = mongoose.model('swimdowns', new Schema({ competitor: String, wager: String }));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.post('/bets', (req, res) => {
  var wager = new Bets({ competitor: `${req.body.competitor}`, wager: `${req.body.wager}` });
  wager.save(function (err, bet) {
    if (err) res.send('Sorry, but there was an error placing your bet. Please go back and try again.');
    else res.send(`IMPORTANT! Note down your confirmation number: ${bet._id}. You will need this number to claim your winnings. <br><br> To confirm your bet, please Venmo $${req.body.wager} to @CAxelrod before Wednesday, December 5th at 12:30 P.M. or your bet will be cancelled.`);
  });
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});