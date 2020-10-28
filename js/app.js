var ChatHistory;
var Updated
var ip;
var chatjs = document.getElementById('chat-js');
var chatroomId;
var u_name;


$.getJSON("https://api.ipify.org/?format=json", function(e) {
    ip = e.ip;
});

function buttonVisibility(){
    if(document.getElementById('message-in').value !== ''){
        document.getElementById('send-btn').style = 'display:block;';
        document.getElementById('cbox').style = 'margin-right:0px';
    }
    else{
        document.getElementById('send-btn').style = 'display:none';
        document.getElementById('cbox').style = 'margin-right:8px';
    }
}

function getHistory(){

    if(document.getElementById('message-in').value !== ''){

        firebase.database().ref('chatroom/' + chatroomId + '/chat').once('value', function (snapshot) {
            ChatHistory = snapshot.val().chats;
            SetM();
                 var objDiv = document.getElementById("chat-js");
     objDiv.scrollTop = objDiv.scrollHeight;
        });
    }
    else{}
}

//look last section of code
function SetM(){

    var msg =  document.getElementById('message-in').value;
   // Updated = ChatHistory + '<div class="bubl ' + ip.replace(/./g, '-') +  ' ><p class="message-txt">' + msg + '</p></div>';
   Updated = ChatHistory + '<!--Next Message-->' +  '<div class="bubl ' + ip + ' "><p class="name-text">' + u_name + '</p><p class="message-txt">' + msg + '</p></div>';
   AndroidChat = '\"' + Updated.replace(/"/g, "<#-DQ-#>").replace(/'/g, "<#-SQ-#>")  + '\"';

    firebase.database().ref('chatroom/' + chatroomId + '/chat').update({
        chats: Updated,
        androidChat: AndroidChat,
    });

    document.getElementById('message-in').value = '';

}
function messageAsync(){

    firebase.database().ref('chatroom/' + chatroomId + '/chat').on('value', function (snapshot) {
        chatjs.innerHTML = snapshot.val().chats.split(ip).join('sender');
        //addClearChatOpt(snapshot.val().ip);
        
     var objDiv = document.getElementById("chat-js");
     objDiv.scrollTop = objDiv.scrollHeight;
        
    });
}

//function addClearChatOpt(ipAddress){
    //if(ip == ipAddress){
      //  document.getElementById('clearchat').innerHTML = '<button id="clear-chat">Clear chat</button>';
   // }else{}
//}

$('#message-in').keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#send-btn').trigger('click');
    }
});


$( "#clear-chat" ).click(function() {
    clearChat(chatroomId);
    hideDrop()
});

//Clear chat
function clearChat(idToClear){

    var r = confirm("Do you really want to clear all chat history? You can't take it back!");
    if (r == true) {
        firebase.database().ref('chatroom/' + idToClear + '/chat').update({
            chats: '<!--Chats are encrypted-->'
        });
    }
}
