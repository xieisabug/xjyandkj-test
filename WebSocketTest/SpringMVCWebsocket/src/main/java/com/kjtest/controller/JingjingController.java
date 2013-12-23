package com.kjtest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JingjingController {

    @RequestMapping("/jingjing")
    public String  Say(){
        System.out.println("JingJing,nihaoa!");
        return "hello";
    }
}
