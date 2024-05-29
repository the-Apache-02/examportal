package com.exam.ExamServer.service.impl;

import com.exam.ExamServer.model.User;
import com.exam.ExamServer.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=this.userRepo.findByUsername(username);
        if(user==null){
            System.out.println("Username not found");

            throw new UsernameNotFoundException("No user found");
        }
        return user;
    }
}
