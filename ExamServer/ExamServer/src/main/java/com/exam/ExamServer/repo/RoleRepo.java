package com.exam.ExamServer.repo;

import com.exam.ExamServer.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role,Long> {
}
