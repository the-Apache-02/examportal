package com.exam.ExamServer.repo;

import com.exam.ExamServer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepo extends JpaRepository<User,Long> {

    public User findByUsername(String username);

}
