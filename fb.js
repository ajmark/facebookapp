          //Used Javascript tutorial @ http://thinkdiff.net/facebook/graph-api-javascript-base-facebook-connect-tutorial/
          window.fbAsyncInit = function() {
            FB.init({appId: '367635140006379', status: true, cookie: true, xfbml: true});
 
            /* All the events registered */
            FB.Event.subscribe('auth.login', function(response) {
            // do something with response
                login();
            });
            FB.Event.subscribe('auth.logout', function(response) {
            // do something with response
                logout();
            });
 
            FB.getLoginStatus(function(response) {
                if (response.session) {
                // logged in and connected user, someone you know
                    login();
                }
            });
        };
        (function() {
            var e = document.createElement('script');
            e.type = 'text/javascript';
            e.src = document.location.protocol +
                '//connect.facebook.net/en_US/all.js';
            e.async = true;
            document.getElementById('fb-root').appendChild(e);
        }());