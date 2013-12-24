package com.kjtest.model;

public class Greeting {
    private String username;
    private String content;

    public String getUsername() {
        return username;
    }

    public Greeting() {
    }

    public Greeting(String username, String content) {
        this.username = username;
        this.content = content;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    @Override
    public String toString() {
        return "Greeting{" +
                "username='" + username + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
