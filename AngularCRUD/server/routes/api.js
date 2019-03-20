const express = require('express');
const router = express.Router();
const Users = require('../models/user');

router.get('/read' , (req,res ,next)=>{
	Users.find({}, (err , details)=>{
		if(err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: details });
	});
});

router.post('/create' , (req,res ,next)=>{
	
	let newUsers = new Users({
		email : req.body.email,
		username : req.body.username,
		password : req.body.password
	});

	newUsers.save((err,data)=>{
		if(err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: data });
	});

});

router.put('/update' , (req,res ,next)=>{
	Users.findById(req.body._id , (err , data)=>{
		if(err) {
			res.status(500).json({ errmsg: err });
		}
		data.email = req.body.email;
		data.username = req.body.username;
		data.password = req.body.password;
		data.save((err,data)=>{
			if(err) {
				res.status(500).json({ errmsg: err });
			}
			res.status(200).json({ msg: data });
		})
	})
});

router.delete('/delete/:id' , (req,res ,next)=>{
	Users.findOneAndRemove({_id: req.params.id} , (err , data)=>{
		if(err) {
			res.status(500).json({ errmsg: err });
		}
		res.status(200).json({ msg: data });
	})
});

module.exports = router;
