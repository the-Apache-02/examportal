package com.exam.ExamServer.controller;

import com.exam.ExamServer.config.JwtUtils;
import com.exam.ExamServer.model.JwtRequest;
import com.exam.ExamServer.model.JwtResponse;
import com.exam.ExamServer.model.User;
import com.exam.ExamServer.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/generate-token")
    public ResponseEntity<?>generateToken(@RequestBody JwtRequest jwtRequest){
        try{
            authenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("User not found");
        }

        UserDetails userDetails=this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());

        String token=this.jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));

    }

    public void authenticate(String username,String password){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch(DisabledException e){
            throw new DisabledException("user disabled"+e.getMessage());
        }catch(BadCredentialsException e){
            throw new BadCredentialsException("bad credentials"+e.getMessage());
        }
    }

    @GetMapping("/currentuser")
    public User getCurrentUser(Principal principal){
        return (User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
    }
}
