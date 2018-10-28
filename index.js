const express = require('express');
require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);


const mediaserver = require('mediaserver');

const Downloader = require("./youtube/downloader");
const dl = new Downloader();
let i = 0;


app.get('/download/:videoId', (req, res) => {
  try {
    // youtubeStream(req.params.videoId).pipe(res);
    console.log('videoId', req.params.videoId);
    dl.getMP3({videoId: req.params.videoId, name: req.params.videoId}, function(err,res){
      i++;
      if(err)
        throw err;
      else{
        console.log("Song "+ i + " was downloaded: " + res.file);
      }
    });
  } catch (exception) {
    res.status(500).send(exception)
  }
});

app.get('/track/:trackId', (req, res) => {
  console.log("./media/tracks/" + req.params.trackId);
  mediaserver.pipe(req, res, "./media/tracks/" + req.params.trackId);
});

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
