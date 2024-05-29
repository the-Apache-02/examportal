package com.exam.ExamServer.controller;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("")
    public ResponseEntity<Category>addCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.addCategory(category));
    }

    @PutMapping("/update")
    public ResponseEntity<Category>updateCategory(@RequestBody Category category){
        return ResponseEntity.ok(this.categoryService.updateCategory(category));
    }

    @GetMapping("/getAllCategory")
    public ResponseEntity<Set<Category>> getAll(){
        return ResponseEntity.ok(this.categoryService.getAllCategory());
    }


    @GetMapping("/{categoryId}")
    public ResponseEntity<Category>getSingle(@PathVariable Long categoryId){
        return ResponseEntity.ok(this.categoryService.getCategory(categoryId));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String>delete(@PathVariable("categoryId") Long catId){
        return ResponseEntity.ok(this.categoryService.deleteCateogory(catId));
    }
}
