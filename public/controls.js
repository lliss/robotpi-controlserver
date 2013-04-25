var socket = io.connect('/');

socket.on('entrance', function  (data) {
  console.log(data.message);
});

$(document).ready(function () {
  $('a.control').on('mousedown touchstart', function() {
    socket.emit('action', JSON.stringify({"value" : $(this).data('action')}));
    return false;
  });
  $('a.control').on('mouseup touchend', function() {
    socket.emit('action', JSON.stringify({"value" : "stop"}));
    return false;
  });
});
