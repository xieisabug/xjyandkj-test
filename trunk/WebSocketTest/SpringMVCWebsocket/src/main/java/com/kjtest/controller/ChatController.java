package com.kjtest.controller;

import com.kjtest.model.Greeting;
import com.kjtest.model.Word;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {


    @MessageMapping("/chat")
    @SendTo("/chat/greetings")
    public Greeting greeting(Greeting g) throws Exception {
        System.out.println(g);
        return g;
    }

    @MessageMapping("/word")
    @SendTo("/word/greetings")
    public Word greeting(Word w) throws Exception {
        System.out.println(w);
        return w;
    }
}
