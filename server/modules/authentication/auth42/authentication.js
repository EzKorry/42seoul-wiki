/* global WIKI */

// ------------------------------------
// 42 Account
// ------------------------------------

// const OAuth2Strategy = require('passport-oauth2');

// module.exports = {
//   init (passport, conf) {
//     passport.use('auth42', new OAuth2Strategy({
//       authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
//       tokenURL: 'https://api.intra.42.fr/oauth/token',
//       clientID: conf.clientId,
//       clientSecret: conf.clientSecret,
//       callbackURL: conf.callbackURL,
//       passReqToCallback: true,
//     },
//       async function(accessToken, refreshToken, profile, cb) {
//         console.log(accessToken);
//         console.log(refreshToken);
//         console.log(profile);
//         conosle.log(cb);
//         try {
//           const user = await WIKI.models.users.processProfile({
//             providerKey: req.params.code,
//             profile
//           });
//           console.log(user);
//           cb(null, user)
//         } catch (err) {
//           console.error(err);
//           cb(err, null)
//         }

//         User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//       }
//     ));

//   },
// }

const FortyTwoStrategy = require("passport-42").Strategy;
module.exports = {
  init(passport, conf) {
    WIKI.logger.log('info', JSON.stringify(conf));

    //passport.use('42',
    // passport.serializeUser((user, done) => {
    //   // Strategy 성공 시 호출됨
    //   done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    // });

    // passport.deserializeUser((user, done) => {
    //   // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    //   done(null, user); // 여기의 user가 req.user가 됨
    // });
    try {

      passport.use(
        new FortyTwoStrategy(
          {
            clientID: conf.clientId,
            clientSecret: conf.clientSecret,
            callbackURL: conf.callbackURL,
            scope: 'public',
            passReqToCallback: true,

            // domain: conf.domain,

            // clientID: conf.clientId,
            // clientSecret: conf.clientSecret,
            // callbackURL: conf.callbackURL,
            // passReqToCallback: true,
            // }, (req, accessToken, refreshToken, extraParams, profile, cb) => {
          },
          async (accessToken, refreshToken, profile, cb) => {
            WIKI.logger.log('info', JSON.stringify(req));
            WIKI.logger.log('info', JSON.stringify(accessToken));
            WIKI.logger.log('info', JSON.stringify(refreshToken));
            WIKI.logger.log('info', JSON.stringify(extraParams));
            // WIKI.logger.log(JSON.stringify(req));
            // console.dir(accessToken);
            // console.dir(refreshToken);
            // console.log(extraParams);
            // console.dir(profile);
            // cb(null, profile);
            try {
              const user = await WIKI.models.users.processProfile({
                providerKey: req.params.strategy,
                profile: {
                  ...profile,
                },
              });
              cb(null, user);
            } catch (err) {
              cb(err, null);
            }
          }
        )
      );
      WIKI.logger.log('info', 'passport use clear!');
    } catch (e) {
      WIKI.logger.log('info', JSON.stringify(e));
    }
  },
};

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
