const bCrypt = require("bcrypt");

module.exports = function (passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(null, false);
            }
        }).catch(err => {
            done(err, null);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        let generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({ where: { email: email } }).then((user) => {
            if (user) {
                return done(null, false, { message: "Email already taken" });
            } else {
                let userPassword = generateHash(password);
                let data = {
                    email: email,
                    firstName: req.body.firstname,
                    lastName: req.body.lastname,
                    password: userPassword
                };

                User.create(data).then((newUser) => {
                    if (!newUser) {
                        return done(null, false);
                    }
                    return done(null, newUser);
                }).catch(err => {
                    return done(err);
                });
            }
        }).catch(err => {
            return done(err);
        });
    }));

    passport.use("local-signin", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        let isValidPassword = function (userpass, password) {
            return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                return done(null, false, { message: "Email does not exist" });
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user.get());
        }).catch(err => {
            return done(err);
        });
    }));
};