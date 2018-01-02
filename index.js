/*this is watson api set up, do not change the URL, require statement, or version number
However, you will want to sign up to watson developer network and change the username and password
*/
var axios = require('axios');
const Translations = require('./database/postgres');
const Users = require('./database/postgres');
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
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json())
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname + '/client/index.html')));

app.post('/user', (req, res) => {
    var client = new auth.OAuth2(req.body.idtoken, '', '');
    var ClientID = `85882324100-0t2klmlhjpm9roctu4r95rg1jk7hp308.apps.googleusercontent.com`;
    client.verifyIdToken(
        req.body.idtoken,
        ClientID,
        function (err, login) {
            if(err){
                console.error(err)
            }else{
                var payload = login.getPayload();
                var userid = payload['sub'];
            }
        });
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
    const profile_name = req.body.userProfile.ig;
    Translations.sync().then(function () {
        return Translations.create({
            email: userEmail,
            translation: userTranslation,
            user_id: userId
        });
    }).catch((err) => {
        console.log(err);
    });
    Users.sync().then(function () {
        return Users.create({
            id: userId,
            email: userEmail,
            profile_name: profile_name,
        });
    }).catch((err) => {
        console.log(err);
    });
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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Viz app listening on port ${port}!`))
