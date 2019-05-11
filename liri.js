var Spotify = require("node-spotify-api");
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdbSrch, bitSrch, spotSrch;

var bitQuery =
  "https://rest.bandsintown.com/artists/" +
  bitSrch +
  "/events?app_id=codingbootcamp";

var inquire = require("inquirer");
var axios = require("axios");

inquire
  .prompt([
    {
      type: "checkbox",
      message: "Search by one of the following.",
      choices: ["Song", "Band", "Movie"],
      name: "dbSelect"
    }
  ])
  .then(function(inquireresponse) {
    var dBase = inquireresponse.dbSelect[0];
    console.log(dBase);
    switch (dBase) {
      case "Song":
      inquire
      .prompt([
        {
          type: "input",
          message: "Enter the song you want Spotify information for.",
          name: "songName"
        }
      ])
      .then(function(inquireresponse){
        spotSrch = inquireresponse.songName;
        spotify.search({type:'track', query: spotSrch})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err){console.log(err);});
      });
        break;
      case "Band":
      inquire
      .prompt([
        {
          type: "input",
          message: "Enter the band you want information for.",
          name: "bandName"
        }
      ])
      .then(function(inquireresponse) {
        if (inquireresponse.bandName === "") {artist = "Rick Astley";}
        else {artist = inquireresponse.bandName;};
        console.log(inquireresponse.bandName);
        console.log(artist);
        var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        console.log(bandQuery);
        axios.get(bandQuery)
        .then(function(response) {
          console.log(response);
        });
      });
        break;
      case "Movie":
        inquire
          .prompt([
            {
              type: "input",
              message: "Enter the movie name you wish to find",
              name: "movieName"
            }
          ])
          .then(function(inquireresponse) {
            if (inquireresponse.movieName === "") {omdbSrch = "Mr. Nobody";}
            else {omdbSrch = inquireresponse.movieName;};
            console.log(inquireresponse.movieName);
            console.log(omdbSrch);
            var omdbQuery = "http://www.omdbapi.com/?i=tt3896198&apikey=3741813d&t=" + omdbSrch;
            console.log(omdbQuery);
            axios.get(omdbQuery)
            .then(function(response) {
              console.log(response.data);
              console.log("The movie title is" + response.data.Title);
              console.log("The movie was released in" + response.data.Year);
              //console.log("The IMDB rating is" + response.data.Ratings[0].Value);
              //console.log(
                //"The Rotten Tomatoes ranking is" + response.data.Ratings[1].Value
             // );
              console.log("The movie was producted in " + response.data.Country);
              console.log(
                "The movie is available in the following languages:" +
                  response.data.Language
              );
              console.log("The movie plot is" + response.data.Plot);
              console.log("The movie cast includes " + response.data.Actors);
            });
          });
        break;
      default:
        console.log("straight through", dBase);
    }
  });
