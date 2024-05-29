package com.exam.ExamServer.helper;

import com.exam.ExamServer.model.User;

public class UserNameFoundException extends Exception{

    public UserNameFoundException(){
        super("User with this username is already exists in the database !!");
    }

    public UserNameFoundException(String msg){
        super(msg);
    }
}
