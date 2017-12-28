const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');

const app = express()

//serves files in client folder, Don't delete - paul
app.use(express.static(__dirname + '/client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//when client sends a get request to the main page, login html is rendered - paul
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname + '/client/index.html')));

// put this route to allow myself to see the fileSubmit page, can change as needed - paul
app.get('/main', (req, res) => 
res.sendFile(path.join(__dirname + '/client/fileSubmit.html')));


app.listen(3000, () => console.log('Example app listening on port 3000!'))
