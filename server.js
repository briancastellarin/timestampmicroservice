// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



const checkTime = (req, res) => {

  // CHECK TYPE OF DATE 
  const isNumeric = /^\d*$/.test(req.params.date);

  // GENERATE DATE
  let date = (isNumeric) ? new Date() : (!req.params.date) ? new Date() : new Date(req.params.date);

  if (isNumeric) {
    date.setTime(req.params.date);
  }

  // INVALID DATE
  if (date.toString() === 'Invalid Date') {
    res.json({ error: date.toString() });
  }
  else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
};


app.get("/api/:date?", checkTime);




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
