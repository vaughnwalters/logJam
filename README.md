# logJam // Write Lyrics, Record Audio

Deployed link:  https://vw-logjam.herokuapp.com/
(It's a hosted by a free Heroku account, so takes its sweet old time to load up - be patient padawan). 

LOGJAM is a MEAN stack app that upon login allows users to write and store lyrics in a mongo database on mlabs.  User sessions are stored on redis and hosted on heroku. Users can update and delete songs from the database, and can record audio files, which are compressed to mp3 and stored locally.   I was starting to get into brutalist/minimalist web aesthetic at the time and created the UI to reflect that.  Angular.js on the front end, Node.js for the back end. 

I used a lot of this repo for the audio recording portion https://github.com/logbon72/angular-recorder

todo // refactor UI for better cross-browser and mobile compatibility. 
