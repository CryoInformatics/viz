const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');

const app = express()

// express.static("../client")

app.use(express.static(__dirname + '/client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => 

res.sendFile(path.join(__dirname + '/client/login.html')));


app.listen(3000, () => console.log('Example app listening on port 3000!'))