require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdbQuery = "http://www.omdbapi.com";
var bitQuery = "http://www.artists.bandsintown.com/bandsintown-api"