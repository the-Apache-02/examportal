package com.exam.ExamServer.controller;

import com.exam.ExamServer.helper.UserNameFoundException;
import com.exam.ExamServer.model.Role;
import com.exam.ExamServer.model.User;
import com.exam.ExamServer.model.UserRole;
import com.exam.ExamServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test")
    public String getmessage(){
        return "Welcome to examportal";
    }
    @PostMapping("/create")
    public User createuser(@RequestBody User user) throws Exception{
        Role role=new Role();
        role.setRoleId(44L);
        role.setRoleName("Normal");
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> userRoleSet=new HashSet<>();

        UserRole userRole=new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);

        userRoleSet.add(userRole);

        return this.userService.createUser(user,userRoleSet);
    }


    @GetMapping("/getuser/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    @DeleteMapping("/deleteuser/{userId}")
    public String deleteUser(@PathVariable("userId") Long uId){
        return this.userService.deleteUser(uId);
    }

    @PutMapping("/update/{userId}")
    public User updateUser(@PathVariable("userId") Long uId,@RequestBody User user){
        User u=this.userService.updateUser(user,uId);
        return u;
    }

    @ExceptionHandler(UserNameFoundException.class)
    public ResponseEntity<?>username(UserNameFoundException ex){
        return ResponseEntity.ok(ex);
    }
}
