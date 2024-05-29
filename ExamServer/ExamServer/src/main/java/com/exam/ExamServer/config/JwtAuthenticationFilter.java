package com.exam.ExamServer.config;

import com.exam.ExamServer.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestTokenHeader=request.getHeader("Authorization");

        String username=null;
        String jwtToken=null;

        if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")){
            jwtToken=requestTokenHeader.substring(7);

            try{
                username=jwtUtils.extractUsername(jwtToken);

            }catch(ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("Token has expired");
            }catch(Exception e){
                e.printStackTrace();
                System.out.println("error");
            }
        }else{
            System.out.println("Token header is null and token not starts with bearer");
        }

        //validate
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            final UserDetails userDetails=this.userDetailsServiceImpl.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
                    new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }else{
            System.out.println("Token is not valid");
        }

        filterChain.doFilter(request,response);
    }
}
