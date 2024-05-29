package com.exam.ExamServer.controller;

import com.exam.ExamServer.model.exam.Question;
import com.exam.ExamServer.model.exam.Quiz;
import com.exam.ExamServer.service.QuestionService;
import com.exam.ExamServer.service.QuizService;
import org.apache.coyote.Response;
import org.hibernate.internal.util.collections.ArrayHelper;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("")
    public ResponseEntity<Question>createQuestion(@RequestBody Question question) {

//        Question question1=null;
//        try {
//            question1 = this.questionService.createQuestion(question);
//            if(question1==null)
//            throw new IllegalAccessException("qId is not found");
//            else{
//                return ResponseEntity.ok(question1);
//            }
//        } catch (IllegalAccessException e) {
//            throw new RuntimeException(e);
//        }
        Question question1=this.questionService.createQuestion(question);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Question>updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }


    @GetMapping("")
    public ResponseEntity<Set<Question>>getall(){
        return ResponseEntity.ok(this.questionService.getAll());
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question>getSingle(@PathVariable("questionId") Long qId){
        return ResponseEntity.ok(this.questionService.getSingle(qId));
    }

    @DeleteMapping("/{questionId}")
    public void delete(@PathVariable Long questionId){
        this.questionService.delete(questionId);
    }

    @GetMapping("/getQuestion/{quizId}")
    public ResponseEntity<List<Question>>getQuestionByQuiz(@PathVariable Long quizId){
        Quiz quiz=this.quizService.getSingle(quizId);
        int numofQuestion=Integer.parseInt(quiz.getNumberOfQuestion());

        Set<Question>questionSet=quiz.getQuestionSet();

        List<Question> list=new ArrayList(questionSet);

        if(list.size()>numofQuestion){
            list=list.subList(0,numofQuestion+1);
        }
        Collections.shuffle(list);
        list.forEach((l)->{
            l.setAnswer("");
        });
        return ResponseEntity.ok(list);
//        List<Question>questionList=new ArrayList<>();
//
//        List<Question>questionSet=(List)this.questionService.getQuestionByQuiz(quiz);
//
//        questionList=questionSet.subList(0,numofQuestion+1);
//
//        return ResponseEntity.ok(questionList);
    }

//    @GetMapping("")
//    public ResponseEntity<Set<Question>>getAllQuestions(){
//        Set<Question> questionList=this.questionService.getAll();
//
//        return ResponseEntity.ok(questionList);
//    }

    @PostMapping("/evaluate")
    public ResponseEntity<?>evaluate(@RequestBody List<Question>questions){
        double marksGot=0;
        int correctAnswer=0;
        int attemptedQuestion=0;
        double maxMarks=0;
        try{
            Question q=questions.get(0);
            maxMarks=Double.parseDouble(q.getQuiz().getMaxMarks());
        }catch(Exception e){
           e.printStackTrace();
        }
        for(Question ques:questions){
            Question question=this.questionService.getSingle(ques.getQuestionId());

            if(ques.getuAnswer().equals(question.getAnswer())){
                correctAnswer++;
            }

            if(!ques.getuAnswer().isEmpty()){
                System.out.println(ques.getuAnswer());
                attemptedQuestion++;
            }
        }
        double singleQuestionMark=maxMarks/questions.size();
        marksGot=correctAnswer*singleQuestionMark;

        Map<String,Object>map=Map.of("marksGot",marksGot,
                "correctAnswer",correctAnswer,"attemptedQuestion",attemptedQuestion);

        return ResponseEntity.status(HttpStatus.OK).body(map);
    }
}
