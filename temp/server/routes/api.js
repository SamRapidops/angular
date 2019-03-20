const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/eventDB';

mongoose.connect(db , err=>{
	if(err) {
		console.error('Error!' + err)
	} else {
		console.log('connected to mongodb')
	}
})

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/' , (req,res)=>{
	res.send('from API route');
})

router.post('/register' , (req,res)=>{
	let userData = req.body;
	let user = new User(userData);

	User.findOne({email: userData.email} , (error , data)=>{
		if(error) {
			console.log(error)
		} else {
			if(!data) {
			
				user.save((error , registerUser)=>{
					if(error) {
						console.log(error);
					} else {
						let payload = { subject: registerUser._id };
						let token = jwt.sign(payload , 'secretKey');
						res.status(200);
						res.send({token});
					}
				})
			} else {
				let payload = { subject: user._id };
				let token = jwt.sign(payload , 'secretKey');
				res.status(200);
				res.send({token});
			}
		}
	})

	
})

router.post('/login' , (req,res)=>{
	let userData = req.body;

	User.findOne({email: userData.email} , (error , user)=>{
		if(error) {
			console.log(error)
		} else {
			if(!user) {
				res.status(401);
				res.send('Invalid email')
			} else if (user.password !== userData.password) {
				res.status(401);
				res.send('Invalid password');
			} else {
				let payload = { subject: user._id };
				let token = jwt.sign(payload , 'secretKey');
				res.status(200);
				res.send({token});
			}
		}
	})
})

router.get('/events' , (req,res)=>{
	let events = [
		// {
		// 	"_id" : "1",
		// 	"name": "rampage" 
		// },
		// {
		// 	"_id" : "2",
		// 	"name": "hackathon" 
		// },
		// {
		// 	"_id" : "3",
		// 	"name": "footloose" 
		// },
		// {
		// 	"_id" : "4",
		// 	"name": "showdown" 
		// },
		// {
		// 	"_id" : "5",
		// 	"name": "raaga" 
		// },
	]

	res.json(events);
})

router.get('/special' , verifyToken , (req,res)=>{
	let events = [
		// {
		// 	"_id" : "1",
		// 	"name": "rampage" 
		// },
		// {
		// 	"_id" : "2",
		// 	"name": "hackathon" 
		// },
		// {
		// 	"_id" : "3",
		// 	"name": "footloose" 
		// },
		// {
		// 	"_id" : "4",
		// 	"name": "showdown" 
		// },
		// {
		// 	"_id" : "5",
		// 	"name": "raaga" 
		// },
	]

	res.json(events);
})

module.exports = router;