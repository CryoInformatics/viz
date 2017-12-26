var fileSubmit = new Vue({
    el: '#fileSubmit',
    data: {
        language: '',
        translatedText: 'This is where translated text will go'
    },
    //all these methods are directly linked to their relevant boxes on the "main" page (filesubmit),
    //when clicked they will change the language to their relevant language which you can then use to determine
    //which language to translate from
    methods: {
        french: function () {
            this.language = "french"
        },
        spanish: function () {
            this.language = "spanish"
        },
        german : function () {
            this.language = "german"
        },
        translate: function() {
            //here whould be where the function detects the above language (this.language), and translates using the google api accordingly
            //the response should become translated text, which will be rendered to the page when filled
        },
        saveTranslation: function () {
            //here the translation text would be added to the database under user.. not sure how to do this as of yet.. We will figure that out. 
        }
    }
})