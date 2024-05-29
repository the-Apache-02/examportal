package com.exam.ExamServer.repo;

import com.exam.ExamServer.model.exam.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Long> {
}
