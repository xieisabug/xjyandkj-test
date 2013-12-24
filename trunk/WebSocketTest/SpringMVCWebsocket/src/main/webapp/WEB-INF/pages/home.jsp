<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>备课空间</title>
    <link href="css/home.css" rel="stylesheet" type="text/css">
    <script type="text/javascript">
        var username = '${user.username}';
    </script>
</head>
<body>

<div class="left">
    <div id="info">
        <span>${user.username}</span>
        <button id="connect" onclick="connect()">连接</button>
    </div>
    <div id="editor">
        <textarea name="ueditor" id="ueditor"></textarea>
    </div>
</div>
<div class="right">
    <div id="chat">
        <textarea id="chat_content" onchange=""></textarea>
        <input type="text" id="chat_input">
        <button onclick="sendName()">发送</button>
    </div>
</div>

</body>
<script src="js/sockjs-0.3.4.js"></script>
<script src="js/stomp.js"></script>
<script type=text/javascript src="ueditor/ueditor.config.js"></script>
<script type=text/javascript src="ueditor/ueditor.all.js"></script>
<link rel=stylesheet href="ueditor/themes/default/css/ueditor.css">
<script type="text/javascript" src="js/home.js"></script>

</html>