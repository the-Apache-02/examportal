package com.exam.ExamServer.controller;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.model.exam.Quiz;
import com.exam.ExamServer.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.channels.ReadPendingException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("")
    public ResponseEntity<Quiz>createQuiz(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.createQuiz(quiz));
    }

    @PutMapping("")
    public ResponseEntity<Quiz>update(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }


    @GetMapping("")
    public ResponseEntity<Set<Quiz>>getAll(){
        return ResponseEntity.ok(this.quizService.getAll());
    }


    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz>getQuiz(@PathVariable("quizId") Long qId){
        return ResponseEntity.ok(this.quizService.getSingle(qId));
    }

    @DeleteMapping("/delete/{quizId}")
    public void delete(@PathVariable("quizId") Long quizId){
        this.quizService.delete(quizId);
    }

    @GetMapping("/category/{catId}")
    public List<Quiz>getQuizByCategory(@PathVariable Long catId){
        Category category=new Category();
        category.setId(catId);
        return this.quizService.getQuizByCategory(category);
    }

    @GetMapping("/category/active")
    public List<Quiz>getActiveQuiz(){
        return this.quizService.getActiveQuiz();
    }

    @GetMapping("/category/active/{catId}")
    public List<Quiz>getActiveQuizByCategory(@PathVariable Long catId){
        Category category=new Category();
        category.setId(catId);
        return this.quizService.getActiveQuizByCategory(category);
    }
}
