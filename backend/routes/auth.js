const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    router.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred', error: err });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred', error: err });
                }
                return res.status(200).json({ message: 'Signup successful' });
            });
        })(req, res, next);
    });

    router.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred', error: err });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'An error occurred', error: err });
                }
                return res.status(200).json({ message: 'Signin successful' });
            });
        })(req, res, next);
    });

    router.post('/signout', (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred', error: err });
            }
            res.status(200).json({ message: 'Signout successful' });
        });
    });

    router.get('/user', (req, res) => {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    });

    return router;
};