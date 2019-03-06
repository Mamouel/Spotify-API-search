let express = require("express");
const path = require("path");
let request = require("request");
let querystring = require("querystring");
let cors = require("cors");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");

let client_id = process.env.SPOTIFY_CLIENT_ID;
let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let backend_uri = process.env.BACKEND_URI || "http://localhost:8888/callback";
let frontend_uri = process.env.FRONTEND_URI || "http://localhost:3000";
let port = process.env.PORT || 8888;


const root = path.join(__dirname, "..", "build/");

const generateRandomString = function(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  };
  return text;
};

const stateKey = "spotify_auth_state";

let app = express();

app.use(express.static(root));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());




// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});



app.get("/login", function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect("https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get("/callback", function(req, res) {
  console.log("yoooooo")
  let code = req.query.code || null
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      "Authorization": "Basic " + (new Buffer(
        client_id + ":" + client_secret
      ).toString("base64"))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    let access_token = body.access_token
    let options = {
      url: "https://api.spotify.com/v1/me",
      headers: { "Authorization": "Bearer " + access_token },
      json: true
    };
    request.get(options, function(error, response, body) {
      return body;
    });
    res.redirect(frontend_uri + "?access_token=" + access_token)
  });
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);