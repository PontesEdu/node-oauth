const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENTE_ID,
  clientSecret: process.env.GITHUB_CLIENTE_SECRETE,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile.id);
  // });
}
));

module.exports = passport