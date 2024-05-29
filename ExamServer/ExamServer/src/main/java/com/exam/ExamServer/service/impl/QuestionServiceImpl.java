package com.exam.ExamServer.service.impl;

import com.exam.ExamServer.model.exam.Question;
import com.exam.ExamServer.model.exam.Quiz;
import com.exam.ExamServer.repo.QuestionRepo;
import com.exam.ExamServer.repo.QuizRepo;
import com.exam.ExamServer.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    private QuizRepo quizRepo;

    @Override
    public Question createQuestion(Question question){
//        Quiz quiz=question.getQuiz();
//        Long qId=quiz.getQid();
//        if(qId==null){
//            throw new IllegalAccessException("qId is null");
//        }
//        Quiz newQ=this.quizRepo.findById(qId).get();
//
//        question.setQuiz(newQ);

        return this.questionRepo.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepo.save(question);
    }

    @Override
    public Set<Question> getAll() {
        return new HashSet<>(this.questionRepo.findAll());
    }

    @Override
    public Question getSingle(Long questionId) {
        return this.questionRepo.findById(questionId).get();
    }

    @Override
    public void delete(Long questionId) {
        this.questionRepo.deleteById(questionId);
        return;
    }

    @Override
    public Set<Question> getQuestionByQuiz(Quiz quiz) {
        return new HashSet<>(this.questionRepo.findByQuiz(quiz));
    }
}
