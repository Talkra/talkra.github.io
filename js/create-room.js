var nameInput = document.getElementById('room-name');
var codeInput = document.getElementById('room-code');
var passInput = document.getElementById('room-password');
var AdminIp;
var secMsg;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


$.getJSON("https://api.ipify.org/?format=json", function(e) {
    AdminIp = e.ip;
});

function _validateInfo(){
    secMsg = '<p class="secure-msg">This chatroom was created by ' + nameInput.value + ' on ' + mm + ' ' + dd + ' ' + yyyy + ' <i style="font-size: 10px;" class="material-icons">lock</i></p>';
    if(nameInput.value !== '' && codeInput.value !== '' && passInput.value !== ''){
        firebase.database().ref('chatroom/' + codeInput.value + passInput.value ).once('value', function(snapshot){

            try{
                console.log(snapshot.val().admin + ' made that already');
                document.getElementById('notavil-msg').style = 'bottom:25px';
                setTimeout(hideNotavailbleMessage,5000)
            }
            catch{
                console.log('room code available');
                document.getElementById('prog-lay').style = 'visibility:visible;opacity:1'
                createRoom(codeInput.value + passInput.value, nameInput.value)
            }
        });
    }
}


function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
      nameInput.value = user;
    } else {}
}

function createRoom(roomId, Admin){
    document.getElementById('main-create').innerHTML = '';
    setCookie("username", nameInput.value, 89);
    firebase.database().ref('chatroom/' + roomId + '/chat' ).set({
       admin: Admin,
       chats: secMsg ,
       androidChat: '<!---->',
       ip: AdminIp
    });

    setTimeout(openChatLink, 3000);
}
function openChatLink(){
    window.location.replace('chat.html#' + codeInput.value);
}
