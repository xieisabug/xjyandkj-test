<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
<p>请登录：</p>

<form method="post" action="/login">
    <label for="username">用户名</label>
    <input type="text" id="username" name="username"/>
    <label for="password">密码</label>
    <input type="password" id="password" name="password"/>
    <input type="submit" name="submit" value="登录"/>
</form>
</body>
</html>