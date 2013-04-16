var io = require('socket.io'),
    connect = require('connect'),
    http = require('http');
var controls = connect().use(connect.static('public')).listen(8080);

var responder = io.listen(controls);

responder.sockets.on('connection', function (socket) {
  socket.emit('entrance', {message: 'Controller Engaged'});

  socket.on('action', function (data) {
    var requestAction = JSON.parse(data).value;
    console.log(requestAction);
    var options = {
      hostname: 'localhost',
      port: 8888,
      path: '/action',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'close'
      }
    }
    var apiRequest = http.request(options, function(res) {
      console.log('STAT: ' + res.statusCode);
    });
    apiRequest.write(JSON.stringify({fire : requestAction}));
    apiRequest.end();
    apiRequest.on('error', function(e) {
      console.log('hit an error');
    });
  });
});
