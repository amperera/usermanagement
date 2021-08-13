
const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
var fs = require('fs');

const signToken = username =>{
    return JWT.sign({
        sub : username
    },"testUser");
}

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { username, role } = req.user;
        const token = signToken(username);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.get('/users',passport.authenticate('jwt',{session : false}),(req,res)=>{
    fs.readFile('config.json', (err, data) => {
        const users = JSON.parse(data);
        const selectedusers = users.filter(user => user.role !== 'admin' )
        res.status(200).json({users : selectedusers, authenticated : true});
    });
});

userRouter.get('/user',passport.authenticate('jwt',{session : false}),(req,res)=>{

    fs.readFile('config.json', (err, data) => {
        const users = JSON.parse(data);
        const selecteduser = users.find(user => user.id === Number(req.query.id) )
       
        if(selecteduser && selecteduser.username){
            res.status(200).json({user : selecteduser, authenticated : true});
        }else{
            res.status(404);
        }
       
    });
});

userRouter.put('/user',passport.authenticate('jwt',{session : false}),(req,res)=>{

    fs.readFile('config.json', (err, data) => {
        const users = JSON.parse(data);
        const selectedusers = users.map((user) => {
            if(user.id === req.body.id){
                return req.body
            }
            return user
        })
        var newUsers = JSON.stringify(selectedusers)
        fs.writeFile('./config.json', newUsers, function (err) {
            if (err) {
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            }
            res.status(200).json({message : {msgBody : "Successfully created user", msgError : false}});
        });
    });
});

userRouter.post('/user', (req,res)=>{
    fs.readFile('config.json', (err, data) => {
        const users = JSON.parse(data);
        const selectedusers = users.find(user => user.username === req.body.username )
       
        if(selectedusers && selectedusers.username){
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        }else{
            var newUsers = JSON.stringify([...users, Object.assign({},req.body, {id : users.length})]);
            fs.writeFile('./config.json', newUsers, function (err) {
                if (err) {
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                }
                res.status(200).json({message : {msgBody : "Successfully created user", msgError : false}});
            });
        }
       
    });
});

module.exports = userRouter;
