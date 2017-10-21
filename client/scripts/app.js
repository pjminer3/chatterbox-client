// YOUR CODE HERE:

var app = {
  messageArray: [], 
  
  init: function() {
  
  }, 
  
  send: function(message) {
    // ajax POST request returns object
    responseObject = $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: message, // mess with this later
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        //console.log('this is data', data);
        return data;
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  
  }, 
  
  fetch: function() {
  
  },
  
  clearMessage: function() {
  
  },
   
  renderMessage: function() {
  
  },
  
  renderRoom: function() {
  
  },
  
  handleUsernameClick: function() {
  
  },
  
  handleSubmit: function() {
    
  }
};


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
      
      app.send(message);
        
      // return false -- stops propogation and all that jaz
      return false;
    }
    
     
  });
   


});
