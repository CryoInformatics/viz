Vue.prototype.$http = axios
var index = new Vue({
    el: '#index',
    data: {
        language: '',
        translateTo: '',
        untranslatedText: '',
        translatedText: '',
        profile: {},
        userApiKey: ''
    },
    methods: {
        /*The six methods below are directly linked to their relevant boxes on the "main" page (index),
        when clicked they will change the language to their relevant language which you can then use to determine
        which language to translate from
        YOU MUST CLICK THE BUTTON TO SELECT A LANGUAGE BEFORE TRANSLATION WILL WORK
        */
        french: function () {
            this.language = "fr"
        },
        spanish: function () {
            this.language = "es"
        },
        english: function () {
            this.language = "en"
        },
        englishTranslation: function () {
            this.translateTo = "en"
        },
        arabicTranslation: function () {
            this.translateTo = "ar"
        },
        spanishTranslation: function () {
            this.translateTo = "es"
        },
        translate: function (file) {
            /* 
            This translate function is the heart of the app, I reccomend not changing it
            The first post request is to a google vision API, this will return a promise that takes text out of a picture - 
                This text is not translated in the first API request, it simply is gathered in its native language from the picture
            Then result of the promise will be a gigantic object, we have set untranslated text to the native language text from the picture
            We post to /translate (handled on the server side) -- find Comments about that specific function in the server side
            The response from the request handler will be Watson translated text, which we then set to translatedtext
            translatedText is the text that is rendered to the page that the user will see when the translation is finished
            */
            encodedFileString = file.replace("data:image/jpeg;base64,", "");
            //vm allows you to keep the this binding
            var vm = this
            console.log(this.userApiKey, "this is the user api key124151252")
            console.log(vm.userApiKey, "this is the vm user api key124151252")
            this.$http.post('/pictureText', {fileString: encodedFileString})
                .then((response) => {
                    vm.untranslatedText = response.data
                    textToTranslate = response.data
                    axios.post('/translate', { "foreign": textToTranslate, "language": vm.language, "targetLanguage": vm.translateTo })
                        .then((res) => {
                            
                            vm.translatedText = res.data.translations[0].translation;
                        })
                })
        },
        saveTranslation: function () {
            axios.post('/saveTranslation', { "translatedText": this.translatedText, "userProfile": profile })
        },
        profileSet: function (profile) {
            this.profile = profile;
        }
    }
})
