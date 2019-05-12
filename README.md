# Troy_Fasnacht_liri_node_app
Node JS 
This app will return search results from a database depending on the type of input selected.
Initially the user will need to select whether they want to search for a song, a band, or a movie.
   -A song will use the spotify API and return the artist name, song name, album the song was on, and a preview link.
   
   -A band search will return the first 5 concert dates from the bandsintown API and return the venue location, venue name, and date of the concert.

   -A movie search will return data from the IMDB API.  Movie name, release date, imdb rating, rotten tomatoes rating, country movie was produced in, available languagaes, a plot summary, and a cast list are all returned.

   All three searches will write their results to a log file