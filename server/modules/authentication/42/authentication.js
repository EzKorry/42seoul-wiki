/* global WIKI */

// ------------------------------------
// 42 Account
// ------------------------------------

const OAuth2Strategy = require('passport-oauth2');

module.exports = {
  init (passport, conf) {
    passport.use('42', new OAuth2Strategy({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token', 
      clientID: conf.clientId,
      clientSecret: conf.clientSecret,
      callbackURL: conf.callbackURL,
      passReqToCallback: true,
    },
      async function(accessToken, refreshToken, profile, cb) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        conosle.log(cb);
        try {
          const user = await WIKI.models.users.processProfile({
            providerKey: req.params.code,
            profile
          });
          console.log(user);
          cb(null, user)
        } catch (err) {
          console.error(err);
          cb(err, null)
        }

        User.findOrCreate({ exampleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

  },
}


/*
const FortyTwoStrategy = require('passport-42').Strategy
console.log('42 account loading');
module.exports = {
  init (passport, conf) {
    console.dir(conf);
    //passport.use('42',
      passport.use(
      new FortyTwoStrategy({
    clientID: conf.clientId,
    clientSecret: conf.clientSecret,
    callbackURL: conf.callbackURL,
        // domain: conf.domain,

        // clientID: conf.clientId,
        // clientSecret: conf.clientSecret,
        // callbackURL: conf.callbackURL,
        // passReqToCallback: true,
        // }, (req, accessToken, refreshToken, extraParams, profile, cb) => {
      }, async (accessToken, refreshToken, profile, cb) => {
          console.dir(req);
          console.dir(accessToken);
          console.dir(refreshToken);
          console.log(extraParams);
          console.dir(profile);
      }
      ))
  }
}
*/
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
