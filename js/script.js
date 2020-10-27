function hideNotavailbleMessage(){
    document.getElementById('notavil-msg').style = 'bottom:-100px';
}


function validateCred(){
    if(codeJoinInput.value !== '' && passJoinInput.value !== '' && nameJoinInput.value !== ''){
        CheckIfExist(codeJoinInput.value + passJoinInput.value);
    }
    else{
        alert('lol1');
    }
}

$("#dropit-btn").click(function(){
    var dropDwn = document.getElementById('chat-drop');
    dropDwn.style = 'opacity:1;visibility:visible'
}); 

$("#color-picker").click(function(){
    $('#color-pick').click();
});

$("#image-chooser").click(function(){
    url = prompt("Give image url, and set your background", "");
    if (url != "" && url != null) {
      setCookie("back-style", 'background-image:url("' + url + '");', 365);
      setTimeout(setStyleBack, 10);
    }
});

function saveColor(){
    setCookie("back-style", 'background-color:' + document.getElementById('color-pick').value +';', 89);
    setTimeout(setStyleBack, 10);
}

function setStyleBack(){
    document.getElementById('cuz-win').style='opacity:0;visibility:hidden;'
    checkUsr();
}

$(document).mouseup(function(e) 
{
    var container = $("#chat-drop");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        hideDrop();
    }
});

function hideDrop(){
    var container = $("#chat-drop");
    container.hide(100);
}

function closeSearchBar(){
    document.getElementById('search-div').style.display = 'none';
}
function openSearchBar(){
    document.getElementById('search-div').style.display = 'flex';
}

function SearchFor(query) {
 
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("chat-js");
    cards = cardContainer.getElementsByClassName("bubl");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector("p.message-txt");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    } }

copyUrl();

function copyUrl(){

    var incopy = document.getElementById('copy-txt');
    incopy.value = window.location.href;
    incopy.select();
    document.execCommand('copy');
}

//$('#hero-join').keydown(function(event){ 

    ////var keyCode = (event.keyCode ? event.keyCode : event.which); 
    //var joinIn = document.getElementById('hero-join-in');  
    //if (keyCode == 13) {
        //if(joinIn.value !== ''){
          //  
       // }else{
         //   
        //}
        //alert()
    //}
//});

