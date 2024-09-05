$('#submit').click(function (event) {
  event.preventDefault(); // prevent PageReLoad
  var ValidEmail = $('#inputEmail').val() === 'admin'; // User validate
  if (ValidEmail == '' || ValidEmail === 'admin') {
    $('.coruser').show();
  } else {
    $('.coruser').hide();
  }
  var ValidPassword = $('#inputPassword').val() === '123'; // Password validate
  if (ValidPassword == '' || ValidPassword === '123') {
    $('.corpwd').show();
  } else {
    $('.corpwd').hide();
  }
  if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
    $('.error').hide();
    window.location = "index.html"; // go to index.html
  } else {
    $('.error').show(); // show error msg
  }
});