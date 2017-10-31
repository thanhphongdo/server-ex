/**
 *  Steps handler
 */

$(document).ready(function(){
  $("#login").click(function(){
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  });

  // $('#login-gp').click(function(){
  //   var mockProvider = getMockMyOauthProvider();
  //   Parse.User._registerAuthenticationProvider(mockProvider);
  //   Parse.User._logInWith("google", {
  //     success: function(model) {
  //       alert("OK");
  //     },
  //     error: function(model, error) {
  //       alert("Failed")
  //     }
  //   });
  // });
});