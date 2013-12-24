var stompClient = null;
var editor = UE.getEditor('ueditor');
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