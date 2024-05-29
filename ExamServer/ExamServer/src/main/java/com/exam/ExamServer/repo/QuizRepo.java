package com.exam.ExamServer.repo;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepo extends JpaRepository<Quiz,Long> {

    public List<Quiz> findByCategory(Category category);

    public List<Quiz>findByActive(Boolean b);

    public List<Quiz>findByCategoryAndActive(Category category,Boolean b);
}
