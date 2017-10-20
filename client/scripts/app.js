// YOUR CODE HERE:



$(document).ready(function() {
  var grossUsername = window.location.search;
  var username = grossUsername.slice(grossUsername.indexOf('=') + 1);

    
    
  $('#messageInput').on('keypress', function(e) {
    // If user 'enters' message, creates message object
    if (e.which === 13) {
      var message = {
        username: username,
        text: $('#messageInput').val(),
        //roomname: '4chan'
      };

      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message), // mess with this later
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
        
      // return false -- stops propogation and all that jaz
      return false;
    }
    
     
  });
   


});
