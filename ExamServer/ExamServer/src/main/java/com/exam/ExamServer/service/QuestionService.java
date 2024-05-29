package com.exam.ExamServer.service;

import com.exam.ExamServer.model.exam.Question;
import com.exam.ExamServer.model.exam.Quiz;


import java.util.Set;

public interface QuestionService {
    public Question createQuestion(Question question);

    public Question updateQuestion(Question question);

    public Set<Question> getAll();

    public Question getSingle(Long questionId);

    public void delete(Long questionId);

    public Set<Question>getQuestionByQuiz(Quiz quiz);
}
