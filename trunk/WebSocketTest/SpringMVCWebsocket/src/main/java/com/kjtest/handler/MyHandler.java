package com.kjtest.handler;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-22
 * Time: 下午5:39
 * To change this template use File | Settings | File Templates.
 */
public class MyHandler extends TextWebSocketHandler {

    public MyHandler() {
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("hello websocket");
        super.handleTextMessage(session, message);
    }
}
