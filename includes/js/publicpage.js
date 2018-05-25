'use strict';

//////////////////////////////////////////////////
/*Sign up functionality check*/
var verifyCallback = function(response) {
  alert(response);
};

var onloadCallback = function() {
  grecaptcha.render('captcha_element', {
    'sitekey' : 'your_site_key'
  });
};

// verify sign up:
$('#sign-up').on('submit', function( event ) {

  // prevent reload
  event.preventDefault();

  // clears appended msg
  clearMsg();

  // data parsing:
  var params = {};
  params['name'] = document.getElementsByName('teamname')[0].value;
  
  params['email'] = document.getElementsByName('email')[0].value;

  params['password'] = document.getElementsByName('password')[0].value;
  




  // insert parameters into database:
  var r = new XMLHttpRequest();
  r.open("POST", "/signup_account", true);
  /*r.responseType = 'text';*/
  r.setRequestHeader("Content-Type", "application/json");
  r.onreadystatechange = function() {
      if (r.readyState === 4 && r.status === 200) {
        var json_resp = JSON.parse(r.responseText);
        if (json_resp["success"] == "true") {
          clearMsg();
          addMsg(json_resp["msg"] + " You can now login.");
          addMsg("Page reload in 5 seconds.")
          setTimeout(function(){
            location.reload();
          }, 5000);
        } else {
          clearMsg();
          addMsg(json_resp["msg"])
        }
        return false;
      }
  };
  r.send(JSON.stringify(params));
});

function validPW(str_in) {
  if (/[0-9]/.test(str_in) && /[a-z]/.test(str_in) && /[A-Z]/.test(str_in) && /^[a-zA-Z0-9]+$/.test(str_in)) {
    return true
  } else {
    return false
  }
}

// function to append div text to sign up:
function addMsg(str_in) {
  var div = document.createElement('div');
  div.className = 'text-center';
  div.innerHTML = str_in;
  document.getElementById('responsemsg').appendChild(div);
}

// clears all appended info in lowest div:
function clearMsg() {
  var div = document.getElementById("responsemsg");
  while (div.firstChild) {
      div.removeChild(div.firstChild);
  }
}

