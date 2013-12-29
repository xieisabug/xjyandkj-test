var stompClient = null;
var editor = UE.getEditor('ueditor');

//判断浏览器后，对不同的浏览器添加事件
if(UE.browser.ie) {
    editor.addListener('',function(){

    });
} else {
    editor.addListener('contentChange', function(){
        var data = JSON.stringify({
            'username': encodeURIComponent(username),
            'index': getNodeIndex(getInputTopNode()),
            'content': encodeURIComponent(getInputTopNode().outerHTML)
        });
        console.log('contentChange:');
        console.log(data);
        stompClient.send("/app/word", {}, data);
    });
}
/**
 * 下面这一部分函数是为了更明了的获得编辑器中的数据而写的
 */
//获得正在输入的节点
function getInputNode() {
    return editor.selection.getRange().startContainer.parentElement;
}
//获得一个节点的顶节点
function getTopNode(node) {
    return UE.dom.domUtils.findParent(node, function (n) {
        return n.parentElement.tagName == 'BODY';
    }, true);
}
//获得正在输入的节点的顶节点
function getInputTopNode(){
    return getTopNode(getInputNode());
}
//通过index来寻找一个节点
function findNodeByIndex(index){
    return editor.document.body.children[index];
}
//获取一个节点的index
function getNodeIndex(node){
    return UE.dom.domUtils.getNodeIndex(node);
}
//通过一个节点的index来改变一个节点内容,cursorChange表示是否需要改变光标位置
function changeNodeByIndex(index, html, cursorChange){
    var rangeStart = editor.selection.getRange().startOffset;
    if(cursorChange) {
        findNodeByIndex(index).outerHTML = html;
        editor.selection.getRange().setStart(findNodeByIndex(index).firstChild,rangeStart).setEnd(findNodeByIndex(index).firstChild,rangeStart).setCursor();
    } else {
        var myIndex = getNodeIndex(getInputNode());
        findNodeByIndex(index).outerHTML = html;
        editor.selection.getRange().setStart(findNodeByIndex(myIndex).firstChild,rangeStart).setEnd(findNodeByIndex(myIndex).firstChild,rangeStart).setCursor()
    }
}
/*这部分函数结束*/

//设置连接后各个控件的变化
function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
}

//连接服务器的函数
function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect('', '', function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat/greetings', function (greeting) {
            console.log(greeting);
            showGreeting(JSON.parse(greeting.body));
        });
        stompClient.subscribe('/word/greetings', function (word) {
            var wordJ = JSON.parse(word.body);
            console.log('showWord:');
            console.log(wordJ);
            changeNodeByIndex(wordJ.index, decodeURIComponent(wordJ.content), username == word.username);
        });
    });
}

//脱离连接的函数
function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    //console.log("Disconnected");
}

//发送聊天信息
function sendName() {
    var input = document.getElementById('chat_input').value;
    stompClient.send("/app/chat", {}, JSON.stringify({
        'username': encodeURIComponent(username),
        'content': encodeURIComponent(input)
    }));
}

//显示聊天信息
function showGreeting(message) {
    console.log('showGreeting: ');
    console.log(message);
    var response = document.getElementById('chat_content');
    response.value += decodeURIComponent(message.username) + ':' + decodeURIComponent(message.content) + '\n';
}