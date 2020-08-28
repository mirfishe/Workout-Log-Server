const express = require('express');
const router = express.Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* ***********************************
 *** User Register ***
*********************************** */
router.post('/register', function(req, res) {

    User.create({
        username:   req.body.user.username,
        passwordhash:   bcrypt.hashSync(req.body.user.passwordhash)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.json({
                user:   user,
                message:    'User successfully created!',
                sessionToken:   token
            });
        },
        createError = (err) => res.status(500).json(err)
    )
    .catch(err => res.status(500).json({error: err}))
});

/* ***********************************
 *** User Login ***
*********************************** */
router.post('/login', function(req, res) {

    User.findOne({where: {username: req.body.user.username}})
    .then(
        loginSuccess = (user) => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                        res.status(200).json({
                            user:   user,
                            message:    'Successfully authenticated user.',
                            sessionToken:   token
                        });
                    } else {
                        res.status(502).json({error: 'Login failed.'});
                    };
                })
            } else {
                res.status(500).json({error: 'Failed to authenticate.'});
            };
        },
        err => res.status(501).send({error: 'Failed to process.'})
    )
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;