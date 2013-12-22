package com.kjtest.config;

import com.kjtest.handler.MyHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-22
 * Time: 下午6:12
 * To change this template use File | Settings | File Templates.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        System.out.println("I am registerWebSocketHandlers()");
        registry.addHandler(myHandler(),"/myHandler").addInterceptors(new HttpSessionHandshakeInterceptor());
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }
}
