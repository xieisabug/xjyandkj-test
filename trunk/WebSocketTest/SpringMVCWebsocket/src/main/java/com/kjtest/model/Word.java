package com.kjtest.model;

public class Word {

    private String username;
    private int index;
    private String content;

    @Override
    public String toString() {
        return "Word{" +
                "username='" + username + '\'' +
                ", index=" + index +
                ", content='" + content + '\'' +
                '}';
    }

    public Word() {
    }

    public Word(String username,int index, String content) {
        this.username = username;
        this.index = index;
        this.content = content;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getUsername() {
        return username;
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

}
