const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const db = 'mongodb://localhost:27017/userDB';

mongoose.connect(db , err=>{
	if(err) {
		console.error('Error!' + err)
	} else {
		console.log('connected to mongodb')
	}
})

app.use(bodyParser.json());
app.use(cors());
app.use('/' , api)

app.listen(3333 , ()=>{
	console.log("server is running on port 3333");
})