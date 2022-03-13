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
  const _date = req.params.date;
  let output = { "unix": 0, "utc": "" };

  if (!_date) {
    let current = new Date();
    output = { "unix": current.getTime(), "utc": current.toUTCString() };
  }
  else {
    const i = _date * 1;  // CHECK IF IS A STRING 
    let response = isNaN(i) ? new Date(_date) : new Date(i);

    // CHECK VALID DATE
    if (response instanceof Date) {
      output = { "unix": response.getTime(), "utc": response.toUTCString() };
    }
    else {
      output['utc'] = 'invalid date';
    }
  }
  res.json(output);
};


app.get("/api/:date", checkTime);



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
