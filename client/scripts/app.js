// YOUR CODE HERE:

var app = {
  messageArray: [], 
  
  boardMessages: [],
  
  init: function() {
    this.fetch();
    

  }, 
  
  send: function(message) {
    //debugger;
    // ajax POST request returns object
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message), // mess with this later)
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        //console.log('this is data', data);
        //this.messageArray.push(data);
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
    
  
  }, 
  
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: 'data.results.createdAt',
      success: function (data) {
        console.log(data);
        console.log('messages fetched');
        app.boardMessages = data.results;
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch messages', data);
      }
    });
    
    setTimeout(function() {
      for (var i = 0; i < app.boardMessages.length; i++) {
        app.renderMessage(app.boardMessages[i]);
      }
    }, 3000);
  },
  
  clearMessages: function() {
    $('.message').remove();
  },
   
  renderMessage: function(message) {
    var $message = $('<div class="message"></div>');
    var $username = $('<h3 class="username"></h3>');
    var $text = $('<p class="text"></p>');
    $text.text(message.text);
    $username.text(message.username);
    $username.appendTo($message);
    $text.appendTo($message);
    $message.prependTo($('#chats'));
  },
  
  renderRoom: function() {
    
  },
  
  handleUsernameClick: function() {
  
  },
  
  handleSubmit: function() {
    
  },
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};


$(document).ready(function() {
  app.init();
  for (var i = 0; i < app.boardMessages.length; i++) {
    app.renderMessage(app.boardMessages[i]);
  }
  var grossUsername = window.location.search;
  var username = grossUsername.slice(grossUsername.indexOf('=') + 1);

  
    
  $('#messageInput').on('keypress', function(e) {
    // If user 'enters' message, creates message object
    if (e.which === 13) {
      var message = {
        username: username,
        text: $('#messageInput').val(),
        roomname: '4chan' // will turn this into dropdown list later
      };
      
      app.send(message);
      app.fetch();
      
      // return false -- stops propogation and all that jaz
      return false;
    }
  });
  
  
   


});
