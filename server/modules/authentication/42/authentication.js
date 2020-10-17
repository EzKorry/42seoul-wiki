/* global WIKI */

// ------------------------------------
// 42 Account
// ------------------------------------

const FortyTwoStrategy = require('passport-42').Strategy

module.exports = {
  init (passport, conf) {
    passport.use('42',
      new FortyTwoStrategy({
        clientID: conf.clientId,
        clientSecret: onf.clientSecret,
        callbackURL: conf.callbackURL,
        // domain: conf.domain,
        // clientID: conf.clientId,
        // clientSecret: conf.clientSecret,
        // callbackURL: conf.callbackURL,
        passReqToCallback: true,
      }, async (req, accessToken, refreshToken, extraParams, profile, cb) => {
        try {
          const user = await WIKI.models.users.processProfile({
            providerKey: req.params.strategy,
            profile
          })
          cb(null, user)
        } catch (err) {
          cb(err, null)
        }
      }
      ))
  }
}

// var FortyTwoStrategy = require('passport-42').Strategy;

// passport.use(new FortyTwoStrategy({
//     clientID: FORTYTWO_APP_ID,
//     clientSecret: FORTYTWO_APP_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/42/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));