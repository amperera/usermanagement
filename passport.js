var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "testUser"
},(payload,done)=>{

    fs.readFile('config.json', (err, data) => {
        let users = JSON.parse(data);
        const selecteduser = users.find(user => user.username === payload.sub)
        
        if(!selecteduser.username)
            return done(err,false);
        if(selecteduser.username)
            return done(null,selecteduser);
        else
            return done(null,false);
    });
}));

passport.use(new LocalStrategy(
    function (username, password, done) {

        fs.readFile('config.json', (err, data) => {
            let users = JSON.parse(data);
            const selecteduser = users.find(user => user.username === username)
            if(!selecteduser.username){
                return done(null, false, { message: 'Incorrect username.' });
            }
            if(!selecteduser.pwd){
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, selecteduser);
        });
    }
));