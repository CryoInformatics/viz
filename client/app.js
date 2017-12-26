var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        loginStatus: () =>{
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }
    }
})

