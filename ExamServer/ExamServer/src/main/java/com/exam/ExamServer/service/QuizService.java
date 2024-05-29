package com.exam.ExamServer.service;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.model.exam.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {

    public Quiz createQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public Set<Quiz> getAll();

    public Quiz getSingle(Long quizId);

    public String delete(Long quizId);

    public List<Quiz> getQuizByCategory(Category category);

    public List<Quiz>getActiveQuiz();

    public List<Quiz>getActiveQuizByCategory(Category category);
}
