require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdbQuery = "http://www.omdbapi.com";
var bitQuery = "http://www.artists.bandsintown.com/bandsintown-api";

var inquire = require("inquirer");

inquire.prompt([
    {
        type:"checkbox",
        message:"Search by one of the following.",
        choices: ["Song","Band","Movie"],
        name: "dbSelect",
    }
]).then(function(inquireresponse) {
    switch (inquireresponse) {
      case "Song":
        console.log("Your answers were:" + inquireresponse.dbSelect);
      break;
      case "Band":
        console.log (inquireresonse);
      break;
      case "Movie":
        console.log (inquireresopnse);
      break;    
    }};
