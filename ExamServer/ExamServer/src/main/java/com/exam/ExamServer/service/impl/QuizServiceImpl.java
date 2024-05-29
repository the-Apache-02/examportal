package com.exam.ExamServer.service.impl;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.model.exam.Quiz;
import com.exam.ExamServer.repo.QuizRepo;
import com.exam.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepo quizRepo;
    @Override
    public Quiz createQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepo.save(quiz);
    }

    @Override
    public Set<Quiz> getAll() {
        return new HashSet<>(this.quizRepo.findAll());
    }

    @Override
    public Quiz getSingle(Long quizId) {
        return this.quizRepo.findById(quizId).get();
    }

    @Override
    public String delete(Long quizId) {
        this.quizRepo.deleteById(quizId);
        return "deleted Successfully";
    }

    @Override
    public List<Quiz>getQuizByCategory(Category category){
        return this.quizRepo.findByCategory(category);
    }

    @Override
    public List<Quiz> getActiveQuiz() {
        return this.quizRepo.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizByCategory(Category category) {
        return this.quizRepo.findByCategoryAndActive(category,true);
    }
}
