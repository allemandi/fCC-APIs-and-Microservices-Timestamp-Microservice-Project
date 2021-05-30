// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/:date?", (req, res) => {

  //if there is an empty date parameter, should return json object with current time with unix and utc key
  if(!req.params.date) {

    // Date.now() for UTC in milliseconds
    // new Date().toUTCString() to date to string in UTC timezone
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
  };

  const INVALID_STRING = "Invalid Date"
  let testDate;

  //if isNaN of parameter is false, then is number (possible unix value)
  if(!isNaN(req.params.date)) {
    //multiply number by 1 (assuming unix), in order to parse type to number instead of string, then to date
    testDate = new Date(req.params.date * 1)
  }
  else {
    //assuming string value, possible valid date value, convert to date 
    testDate = new Date(req.params.date)
    
  }

  //if the testDate that was parsed to date value returns "Invalid Date", then return json error message
  if(testDate == INVALID_STRING)
  {
    res.json({
      error: INVALID_STRING
      })
  }
  // otherwise, assume that the date parse returns valid date values, therefore returning unix and utc format of testDate
  else {
    res.json({
      //since testDate should already be formatted, return getTime for unix value  
      unix: testDate.getTime(),
      utc: testDate.toUTCString()
    })

  }

});

//set default port to 3000, unless  preconfigured
let defaultport = process.env.PORT || 3000;

// listen for requests
var listener = app.listen(defaultport, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
