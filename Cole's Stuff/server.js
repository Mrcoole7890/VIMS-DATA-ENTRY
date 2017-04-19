// A bunch of junk here
var http = require("http");
var os = require("os");
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");


// Data used to allow the client to find the server on a local network over Wi-Fi
// NEEDS TESTED FOR OTHER COMPUTERS ! ! !
var hostData = os.networkInterfaces();
var PORT_DEFAULT = 8000;
var hostDataDefault = hostData["Wi-Fi"][1]["address"] + ":" + PORT_DEFAULT;

// Used To Identify JSON sent from client-side
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

// Used To Allow The Client To access external files
app.use(express.static('public'));

// Used To Locate The .ejs Pages
app.set('view engine', "ejs");
app.set('views', __dirname + '/veiws');

// USED TO DEFINE PORT NUMBER
app.listen(PORT_DEFAULT);

// Sends Client The Index File
app.get("/", function(req, res){ res.render('index', { host: hostDataDefault }); });

// Retrives Input Data From Client with a time stamp
app.post("/newData", jsonParser, function(req, res){
  var timeStamp = new Date();

  console.log(req.body);
  console.log(timeStamp.toTimeString());
  res.send(200);
});


// To Do:
//    Convert JSON from client in to an ordered array
//    Make the Client Page less awful to look at (Add BootStrap to index.ejs file)
//    Provide access to the json files so that client-side can access and modifiy data
