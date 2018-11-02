const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('./config/keys');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/audioRoutes')(app);

mongoose.connect(config.mongoURI);
require('./models/User');
require('./services/passport');


app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
