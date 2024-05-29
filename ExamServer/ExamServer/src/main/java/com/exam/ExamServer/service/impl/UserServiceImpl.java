package com.exam.ExamServer.service.impl;

import com.exam.ExamServer.helper.UserNameFoundException;
import com.exam.ExamServer.model.User;
import com.exam.ExamServer.model.UserRole;
import com.exam.ExamServer.repo.RoleRepo;
import com.exam.ExamServer.repo.UserRepo;
import com.exam.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

   @Autowired
   private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;


    public User createUser(User user, Set<UserRole> userRoleSet) throws Exception{
        User u=null;
        u=this.userRepo.findByUsername(user.getUsername());
        if(u!=null){
                System.out.println("User name is already exists");
                throw new UserNameFoundException("User name already exists from exception class");
            }
        else{

            for(UserRole userRole:userRoleSet){
                roleRepo.save(userRole.getRole());
            }

            user.getUserRoleSet().addAll(userRoleSet);

            u=this.userRepo.save(user);
        }

        return u;
    }

    public User getUser(String username){
        return this.userRepo.findByUsername(username);
    }

    public String deleteUser(Long uId){

        this.userRepo.deleteById(uId);
        return "Deleted successfully";
    }

    public User updateUser(User user,Long uId){
        User getExisting=this.userRepo.findById(uId).get();

        getExisting.setUsername(user.getUsername());
        getExisting.setPassword(user.getPassword());
        getExisting.setFirstName(user.getFirstName());
        getExisting.setLastName(user.getLastName());
        getExisting.setEmail(user.getEmail());
        getExisting.setProfile(user.getProfile());
        getExisting.setPhone(user.getPhone());

        User u=this.userRepo.save(getExisting);
        return u;
    }
}
