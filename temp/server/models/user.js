const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
	email: String,
	password: String
})

// function (argument) {
// 	userSchema.find({},function(err,dataObjs){
// 	  if(err){
// 	  	console.log(err);
// 	  	res.send("Error");
// 	  } else{
// 	  	res.status(200);
// 	  	res.send(JSON.stringify(dataObjs));
// 	  }
// 	});
// }

module.exports = mongoose.model('user' , userSchema , 'Users');

