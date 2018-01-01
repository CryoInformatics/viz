/*this is watson api set up, do not change the URL, require statement, or version number
However, you will want to sign up to watson developer network and change the username and password
*/
//added by devin
//named translations because of the name of database table

var axios = require('axios')
const Translations = require('./database/postgres')
var watson = require('watson-developer-cloud');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var language_translator = watson.language_translator({
    "url": "https://gateway.watsonplatform.net/language-translator/api",
    "username": "309cb34f-5e1a-40f6-b206-8f24210a1feb",
    "password": "J7Wn4KLrbgpK",
    version: 'v2'
});
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');
const app = express()
app.use(express.static('keys.js'))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//serves files in client folder, Don't delete - paul
app.use(express.static(__dirname + '/client'));
// app.use(express.static(__dirname + '/../node_modules'));
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
app.use(bodyParser.json())
//when client sends a get request to the main page, login html is rendered - paul
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname + '/client/index.html')));
// put this route to allow myself to see the fileSubmit page, can change as needed - paul
app.get('/main', (req, res) =>
    res.sendFile(path.join(__dirname + '/client/fileSubmit.html')));
//
// THE FOLLOWING POST REQUEST HANDLES THE USER DATA WHEN USER HAS SUCCESSFULLY SIGNED IN
//
//
app.post('/user', (req, res) => {
    console.log('user successfully posted to server');
    //THIS IS THE USER EMAIL
    //THE USER EMAIL CAN BE STORED INTO THE DATABASE
    //***************************************************** */
    console.log(req.body.email, "this is email in post to user");
    //***************************************************** */
    // var client = new auth.OAuth2(req.body.idtoken, '', '');
    //THIS IS FOR TOKEN IDENTIFICATION, WE WILL DEVELOP THIS OUT LATER
    //RIGHT NOW THE USER PROFILE WILL BE PASSED INTO THE SERVER
    // client.verifyIdToken(
    //     token,
    //     CLIENT_ID,
    //     // Or, if multiple clients access the backend:
    //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
    //     function (e, login) {
    //         var payload = login.getPayload();
    //         var userid = payload['sub'];
    //         // If request specified a G Suite domain:
    //         //var domain = payload['hd'];
    //     });
    //added by devin
    Translations.email = req.body.email;
    res.send(req.body.email);
})
app.post('/translate', (req, res) => {
    language_translator.translate({
        "text": [
            req.body.foreign
        ],
        "source": req.body.language,
        "target": req.body.targetLanguage
    }, function (err, translation) {
        if (err)
            console.log(err)
        else {
            res.send(translation);
        }
    });
}
),
app.post('/saveTranslation', (req, res) => {
    const userEmail = req.body.userProfile.U3;
    const userTranslation = req.body.translatedText;
    const userId = JSON.parse(req.body.userProfile.Eea.slice(-6));
    Translations.sync().then(function () {
        return Translations.create({
            id: userId,
            email: userEmail,
            translation: userTranslation
        });
    }).catch((err) => {
        console.log(err);
    })
}),
app.post('/pictureText', (req, res) => {
    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.MYAPIKEY}`, {
                "requests": [
                    {
                        "image": {
                            "content": req.body.fileString
                        },
                        "features": [
                            {
                                "type": "DOCUMENT_TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            }).then((result) => {
                res.send(result.data.responses[0].textAnnotations[0].description)
            })
            .catch((err)=> {
                console.log(err);
            })
})
//this function will also give us all translations 
//require Translations from the database file wherever this is called
// Translations.findAll({}).then((data) => {
//     console.log(data);
//  }).catch((err) => {
//     console.log(err);
//  });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Viz app listening on port ${port}!`))
