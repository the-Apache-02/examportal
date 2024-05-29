package com.exam.ExamServer.repo;

import com.exam.ExamServer.model.exam.Question;
import com.exam.ExamServer.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepo extends JpaRepository<Question,Long> {

    public Set<Question> findByQuiz(Quiz quiz);
}
