package com.exam.ExamServer.service;

import com.exam.ExamServer.model.User;
import com.exam.ExamServer.model.UserRole;

import java.util.Set;

public interface UserService {

    public User createUser(User user, Set<UserRole> userRoleSet) throws Exception;

    public User getUser(String username);

    public String deleteUser(Long uId);

    public User updateUser(User user,Long uId);
}
