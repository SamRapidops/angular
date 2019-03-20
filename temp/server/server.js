const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const api = require('./routes/api');

app.use(cors());


app.use(bodyParser.json());
app.use('/api' , api)

app.get('/' , (req,res)=>{
	res.send('hellow from server');
})

app.listen(3006 , ()=>{
	console.log('server is running on port 3006 ');
})