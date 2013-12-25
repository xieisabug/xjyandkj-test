var stompClient = null;
var editor = UE.getEditor('ueditor');
var oldCursor = null;
editor.addListener('beforeSelectionChange',function(){
    console.log("before:" + editor.selection.getRange().startOffset);
});
editor.addListener('afterSelectionChange',function(){
    console.log("after:" + editor.selection.getRange().startOffset);
});
editor.addListener('contentChange',function(){
    console.log("change:" + editor.selection.getRange().startOffset);
});
editor.addListener('keyUp',function(){
    console.log("keyDown from:" + oldCursor + ' to ' + editor.selection.getRange().startOffset);
    oldCursor = editor.selection.getRange().startOffset;
});
function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
}

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect('', '', function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat/greetings', function(greeting){
            console.log(greeting);
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    //console.log("Disconnected");
}

function sendName() {
    var input = document.getElementById('chat_input').value;
    stompClient.send("/app/chat", {}, JSON.stringify({
        'username': encodeURIComponent(username),
        'content': encodeURIComponent(input)
    }));
}

function showGreeting(message) {
    console.log('showGreeting: ');
    console.log(message);
    var response = document.getElementById('chat_content');
    response.value += decodeURIComponent(message.username) + ':' + decodeURIComponent(message.content) + '\n';
}