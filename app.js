const express = require('express');
const bodyparser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


const mockUser = {
    username: 'chandio',
    password: 'chandio123'
};

app.get('/info', (request, response) => {
    response.send('Info')
});

app.post('/login', passport.authenticate('localvalidation', {
    session: false,
    failureFlash: true 
}), (request, response) => {
    response.json({ status: 'Login Successful' })
}

);


passport.use('localvalidation', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        if (username !== mockUser.username) {
            return done(null, false, {message: 'Incorrect Username'})
        }

        if (password !== mockUser.password) {
            return done(null, false, {message: 'Incorrect Password'})
        }

        return done(null, username);
    }
));

app.listen(5000, () => console.log('server started on port 5000'));