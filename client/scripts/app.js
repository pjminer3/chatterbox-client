// YOUR CODE HERE:

var app = { 
  
  boardMessages: [],
  
  currentRoom: null,
  
  init: function() {
    this.getRooms();
  }, 
  
  send: function(message) {
    // ajax POST request returns object
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message), // mess with this later)
      contentType: /*'script', // passing a JavaScript object notation instead of JSON //*/'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.clearMessages();
        app.fetch(app.currentRoom);
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }, 
  
  fetch: function() {
    var dataObj;
    if (arguments.length === 1) {
      dataObj = {
        "order": "-createdAt",
        "limit": "15",
        "where": '{"roomname":"' + arguments[0] + '"}'
        // room specific data
      };
    } else {
      dataObj = {
        "order": "-createdAt",
        "limit": "15",
      };
    }
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: dataObj,
      //data: 'data.results.createdAt',
      success: function (data) {
        console.log(data);
        console.log('messages fetched');
        app.boardMessages = data.results;
        for (var i = data.results.length - 1; i >= 0; i--) {
          app.renderMessage(data.results[i]); 
        }
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch messages', data);
      }
    });
  },
  
  clearMessages: function() {
    var node = $('#chats')[0]; // Saving parent node from jQuery object
    while (node.firstChild) {
      node.removeChild(node.firstChild);  
    }
  },
   
  renderMessage: function(message) {
    var $message = $('<div class="message"></div>');
    var $username = $('<h4 class="username"></h4>');
    var $text = $('<p class="text"></p>');
    var $timestamp = $('<p class="timestamp"></p>');
    $text.text(message.text);
    $username.text(message.username);
    $timestamp.text(message.createdAt);
    $username.appendTo($message);
    $text.appendTo($message);
    $timestamp.appendTo($message);
    $message.prependTo($('#chats'));
  },
  
  getRooms: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: {
        "order": "-createdAt",
        "limit": "50"
      }, 
      //data: 'data.results.createdAt',
      success: function (data) {
        console.log(data);
        console.log('rooms fetched');
        var roomObj = {};
        for (var i = data.results.length - 1; i >= 0; i--) {
          roomObj[data.results[i].roomname] = data.results[i];
      
        }
        for (var room in roomObj) {
          console.log('new room rendered');
          app.renderRoom(roomObj[room]['roomname']); 
        }
        
        currentRoom = roomObj[Object.keys(roomObj)[0]]['roomname'];
        app.fetch(currentRoom);
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch rooms', data);
      }
    });
  },
  
  renderRoom: function(roomName) {
    var $newRoom = $('<option></option>');
    $newRoom.text(roomName);
    $newRoom.val(roomName);
    $newRoom.prependTo($('#roomSelect'));
  },
  
  handleUsernameClick: function() {
  
  },
  
  handleSubmit: function(message) {
    app.send(message); 
  },
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};


$(document).ready(function() {
  app.init();
  for (var i = 0; i < app.boardMessages.length; i++) {
    app.renderMessage(app.boardMessages[i]);
  }
  var grossUsername = window.location.search;
  var username = decodeURIComponent(grossUsername.slice(grossUsername.indexOf('=') + 1)); // decode URIComponent to get all required HTML notation out
  
  // when people submit a new message by pressing 'enter'
  // $('#messageInput').on('keypress', function(e) {
  //   // If user 'enters' message, creates message object
  //   if (e.which === 13) {
  //     var message = {
  //       username: username,
  //       text: $('#messageInput').val(),
  //       roomname: app.currentRoom // will turn this into dropdown list later
  //     };
      
  //     app.send(message);
  //     // app.fetch(currentRoom);
      
  //     // return false -- stops propogation and all that jaz
  //     return false;
  //   }
  // });
  
  $('#send .submit').on('click', function() {
    var message = {
      username: username,
      text: $('#messageInput').val(),
      roomname: app.currentRoom // will turn this into dropdown list later
    };
    // app.send(message);
    app.handleSubmit(message);
  });
  
  //when people select a specific room with the dropdown
  $('#roomSelect').on('change', function() {
    var selected = $('#roomSelect').val();
    app.currentRoom = selected;
    app.clearMessages();
    app.fetch(selected);
  });
  
  $('#roomInput').on('keypress', function(e) {
    if (e.which === 13) {
      var value = $('#roomInput').val(); // roomname
      app.renderRoom(value); // create new roomname option
      $('[value="' + app.currentRoom + '"]')[0].selected = false; // deselect old one
      $('[value="' + value + '"]')[0].selected = true; // select new one
      app.currentRoom = value;
      //app.fetch(value);
    }
  });
  
  $('body').on('click', '#chats .message', function() {
    // get the value
    var username = $(this).find('h4').text();
    
    // get all of the div with the same username
    $('h4:contains("' + username + '")').css('color', 'red');
    // change the background
    //var nameVal = $(this).data('val');
    //console.log(value);
  });  
  
   


});
