var codeJoinInput = document.getElementById('room-code-join');
var passJoinInput = document.getElementById('room-password-join');
var nameJoinInput = document.getElementById('name-to-join');
var ShareLink;

var params = (new URL(document.location)).searchParams;
var prePass = params.get('passkey'); 
var preName = params.get('name'); 
var Precode = window.location.hash.substring(1);

checkUsr();

function validateJoinable(){
    if(codeJoinInput.value !== '' && passJoinInput.value !== '' && nameJoinInput.value !== ''){
        CheckIfExist(codeJoinInput.value.toLowerCase() + passJoinInput.value.toLowerCase());
    }
    else{
        document.getElementById('room-not-avil-msg').style = 'bottom:25px;left:calc(50% - 142px)';
        setTimeout(hideIncorrectMsg,5000);
    }
}

function checkUsr() {
    var user=getCookie("username");
    if (user != "") {
      nameJoinInput.value = user;
    } else {}

    var style=getCookie("back-style");
    if (style != "") {
        document.getElementById('chat-color').style = style;

        if(screen.width < 500){
            document.getElementById('chat-js').style = style;
            document.getElementById('chat-out-lay').style = style;
        }
        else{
            document.getElementById('chat-js').style = '';
            document.getElementById('chat-out-lay').style = '';
        }

    } else {}
}

function CheckIfExist(ChatRoomId){
    firebase.database().ref('chatroom/' + ChatRoomId ).once('value', function(snapshot){
        try{
            ShareLink = 'https://talkra.github.io/chat#' + codeJoinInput.value.toLowerCase();
            console.log(snapshot.val().admin + ' Successfully Joined');
            chatroomId = codeJoinInput.value.toLowerCase() + passJoinInput.value.toLowerCase();
            u_name = nameJoinInput.value;
            setCookie("username", nameJoinInput.value, 89);
            document.getElementById('chat-name').textContent = '#' + codeJoinInput.value.toLowerCase();
            messageAsync();
            document.getElementById('auth-lay').style = 'visibility:hidden;opacity:0'
            document.getElementById('prog-lay').style = 'visibility:hidden;opacity:0'
            //
            
        }
        catch{
            document.getElementById('prog-lay').style = 'visibility:hidden;opacity:0'
            console.log('room not exist or passkey is wrong!');
            document.getElementById('room-not-avil-msg').style = 'bottom:25px;left:calc(50% - 142px)';
            setTimeout(hideIncorrectMsg,5000);
        }
    });
}

function hideIncorrectMsg(){
    document.getElementById('room-not-avil-msg').style = 'bottom:-100px'
}

prepassAdd();

function prepassAdd(){
    if(prePass !== null && Precode !==  null && preName !== null){
        document.getElementById('prog-lay').style = 'visibility:visible;opacity:1'
        //alert('Name:' + preName + ' Code:' + Precode + ' Pass:' + prePass);
        passJoinInput.value = prePass;
        nameJoinInput.value = preName;
        validateJoinable();
    }
}
