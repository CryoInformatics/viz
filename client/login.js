new Vue({
    el: '#login',
    data: {
        message: 'Hello from login!',
    },
    methods: {
        fbAuth: function () {
            alert("This will be the fbAuth function");
        },
        logout: function() {
            alert("this will log the user out and redirect to login page")
        }
    }
})