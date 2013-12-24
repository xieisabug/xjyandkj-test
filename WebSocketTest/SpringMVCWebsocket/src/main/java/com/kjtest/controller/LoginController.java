package com.kjtest.controller;

import com.kjtest.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {

    @RequestMapping("/login")
    public String login(User u,Model model){
        if( u!=null && !u.getUsername().equals("") ) {
            model.addAttribute("user",u);
            return "home";
        } else {
            return "error";
        }
    }

    @RequestMapping("/")
    public String isLogin() {
        return "login";
    }
}
