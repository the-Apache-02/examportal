package com.exam.ExamServer.helper;

import com.exam.ExamServer.model.User;

public class UserNotFoundException extends Exception{

    public UserNotFoundException(){
        super("Username not found");
    }

    public UserNotFoundException(String msg){
        super(msg);
    }
}
