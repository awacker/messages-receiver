$(document).ready(function() {
  var name = '';
  function go() {
    $.ajax({
      type: "POST",
      url: "/api/echo-at-time",
      data: JSON.stringify({
        "message": $('#message').val(),
        "delay": parseInt($('#delay').val())
      }),
      contentType: "application/json"
    });
  };
  $('.send-message').on('click', function(e) {
    go();
  });
});
