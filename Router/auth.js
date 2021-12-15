const express = require('express')
const router = express.Router()  // it is a framwork help to create the router handler extend this routing to handle validation, handle 404 or other errors etc
const Apiroute = router
const jwt = require('jsonwebtoken'); //jsonwebtoken it securely transmitting information between parties as a json 
const user = require('./user')
const movie = require('./movies')
const resservation = require('./reservation')
const rating = require('./rating')
const Conf = require('../conf')



const User = new user() //craete user object module 
const Movie = new movie()
const Rating = new rating()
const Reservation = new resservation()


//check the session for user login or not sessiontime out check
var Sessioncheck =async function (req, res, next) {
    // console.log(req)
    var sessionObj = req.session['sessionObj'] ?req.session['sessionObj'] :req.body.token ? req.body :'' //get data from sessionobj it present or not
        if (sessionObj && sessionObj.token) {
            jwt.verify(sessionObj.token, Conf.KEY, function (err, decoded){ //verify the session token its true than execute once session expeired it execute
                if (err){
                    res.status(401).json({
                        status: false,
                        message: 'Token expired'
                    })
                } else {
                    next(); //it is also same as return function 
    
                }
            });
           
        } else {
            res.status(401).json({
                status: false,
                message: 'Unauthorized Access'
            })
        }
};



Apiroute.post('/session',function(req,res){ 
    var sessionObj = req.body  //get data from sessionobj it present or not
    if (sessionObj && sessionObj.token) {
        jwt.verify(sessionObj.token, Conf.KEY, function (err, decoded){ //verify the session token its true than execute once session expeired it execute
            if (err){
                res.status(401).json({
                    status: false,
                    message: 'Token expired'
                })
            } else {
                res.json({
                    status: true,
                    message: ''
                })

            }
        });
       
    } else {
        res.status(401).json({
            status: false,
            message: 'Unauthorized Access'
        })
    }
})


// login user 
Apiroute.post('/login',function(req,res){ 
    User.Login(req,res) //it route the user module login function
})

//logout user
Apiroute.post('/logout',function(req,res){
    User.Logout(req,res)
})

// craete new user 
Apiroute.post('/signup',function(req,res){
    User.Insert(req,res)
})

//perform all the crud option
Apiroute.post('/user/:action',Sessioncheck,function(req,res){ //sessioncheck goto the function check the session true execute the function
    User.perforam(req,res)
})

// Movie crud apis

Apiroute.post('/movie/:action',Sessioncheck,function(req,res){ //sessioncheck goto the function check the session true execute the function
    Movie.perforam(req,res)
})

// ticket Booking api

Apiroute.post('/reservation/:action',Sessioncheck,function(req,res){ //sessioncheck goto the function check the session true execute the function
    Reservation.perforam(req,res)
})

// movie Rating api

Apiroute.post('/rating/:action',Sessioncheck,function(req,res){ //sessioncheck goto the function check the session true execute the function
    Rating.perforam(req,res)
})




module.exports = Apiroute // export modue to access other files inside