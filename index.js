const FITBIT_CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const FITBIT_CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;
const CALLBACK_URL = process.env.callbackURL;
const express = require('express');
const app = express(); 
var passport = require('passport');
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;;
var port = process.env.PORT || 8080;
var path = require('path');
passport.use(new FitbitStrategy({
    clientID:     FITBIT_CLIENT_ID,
    clientSecret: FITBIT_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("accessToken:" + accessToken);
    console.log("refreshToken:" + refreshToken);
    console.log("profile.id" + profile.id);
  }
));

app.get('/auth/fitbit',
  passport.authenticate('fitbit', { scope: ['settings','sleep','location','profile'] }
));
 
app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
        successRedirect: '/auth/fitbit/success',
        failureRedirect: '/auth/fitbit/failure'
}));

app.get('/',function(req,res){
  console.log("index loaded:" + path.join(__dirname+'/index.html'));
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
