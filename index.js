var express = require('express');
var router = express();

var youtubeStream = require('youtube-audio-stream');

router.get('/stream/:videoId', function (req, res) {
  try {
    youtubeStream(req.params.videoId).pipe(res);
  } catch (exception) {
    res.status(500).send(exception)
  }
});

router.listen(3005, () => {
  console.log("App listening on port 3005!");
});
