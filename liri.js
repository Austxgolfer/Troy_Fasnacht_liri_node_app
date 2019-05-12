var Spotify = require("node-spotify-api");
var moment = require("moment");
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
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
          .then(function(inquireresponse) {
            if (inquireresponse.songName === "") {
              spotSrch = "The Sign ace of base";
            } else {
              spotSrch = inquireresponse.songName;
            }
            spotify
              .search({ type: "track", query: spotSrch })
              .then(function(response) {
                var trackInfo = response.tracks.items[0];
                console.log("The Artist is " + trackInfo.artists[0].name);
                console.log("The album name is " + trackInfo.album.name);
                console.log("The Song is " + trackInfo.name);
                console.log("Preview link " + trackInfo.href);
                fs.appendFile(
                  "songlog.txt",
                  trackInfo.artists[0].name,
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                fs.appendFile("songlog.txt", trackInfo.album.name, function(
                  err
                ) {
                  if (err) {
                    console.log(err);
                  }
                });
                fs.appendFile("songlog.txt", trackInfo.name, function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
                fs.appendFile("songlog.txt", trackInfo.href, function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
              })
              .catch(function(err) {
                console.log(err);
              });
          });
        break;
      case "Band":
        inquire
          .prompt([
            {
              type: "input",
              message: "Enter the band you would like to see: ",
              name: "bandName"
            }
          ])
          .then(function(inquireresponse) {
            var artist = inquireresponse.bandName;
            var bandQuery =
              "https://rest.bandsintown.com/artists/" +
              artist +
              "/events?app_id=codingbootcamp";
            console.log(bandQuery);
            axios.get(bandQuery).then(function(response) {
              for (var x = 0; x < 5; x++) {
                console.log("Venue Name: " + response.data[x].venue.name);
                console.log("Venue city: " + response.data[x].venue.city);
                var date = response.data[x].datetime;
                var dateFormat = moment(date).format("LLL");
                console.log("Appearance date is: " + dateFormat);
                fs.appendFile(
                  "bandlog.txt",
                  response.data[x].venue.name,
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                fs.appendFile(
                  "bandlog.txt",
                  response.data[x].venue.city,
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                fs.appendFile("bandlog.txt", dateFormat, function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          });
        break;
      case "Movie":
        inquire
          .prompt([
            {
              type: "input",
              message: "Enter the movie name you wish to find? ",
              name: "movieName"
            }
          ])
          .then(function(inquireresponse) {
            if (inquireresponse.movieName === "") {
              omdbSrch = "Mr. Nobody";
            } else {
              omdbSrch = inquireresponse.movieName;
            }
            console.log(inquireresponse.movieName);
            console.log(omdbSrch);
            var omdbQuery =
              "http://www.omdbapi.com/?i=tt3896198&apikey=3741813d&t=" +
              omdbSrch;
            console.log(omdbQuery);
            axios.get(omdbQuery).then(function(response) {
              console.log("The movie title is " + response.data.Title);
              fs.appendFile("movielog.txt", response.data.Title, function(err) {
                if (err) {
                  console.log(err);
                }
              });
              console.log("The movie was released in " + response.data.Year);
              fs.appendFile("movielog.txt", response.data.Year, function(err) {
                if (err) {
                  console.log(err);
                }
              });
              console.log(
                "The IMDB rating is " + response.data.Ratings[0].Value
              );
              fs.appendFile(
                "movielog.txt",
                response.data.Ratings[0].Value,
                function(err) {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              console.log(
                "The Rotten Tomatoes ranking is " +
                  response.data.Ratings[1].Value
              );
              fs.appendFile(
                "movielog.txt",
                response.data.Ratings[1].Value,
                function(err) {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              console.log(
                "The movie was producted in " + response.data.Country
              );
              fs.appendFile("movielog.txt", response.data.Country, function(
                err
              ) {
                if (err) {
                  console.log(err);
                }
              });
              console.log(
                "The movie is available in the following languages: " +
                  response.data.Language
              );
              fs.appendFile("movielog.txt", response.data.Language, function(
                err
              ) {
                if (err) {
                  console.log(err);
                }
              });
              console.log("The movie plot is " + response.data.Plot);
              fs.appendFile("movielog.txt", response.data.Plot, function(err) {
                if (err) {
                  console.log(err);
                }
              });
              console.log("The movie cast includes " + response.data.Actors);
              fs.appendFile("movielog.txt", response.data.Actors, function(
                err
              ) {
                if (err) {
                  console.log(err);
                }
              });
            });
          });
        break;
    }
  });
