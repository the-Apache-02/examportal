package com.exam.ExamServer.service.impl;

import com.exam.ExamServer.model.exam.Category;
import com.exam.ExamServer.repo.CategoryRepo;
import com.exam.ExamServer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public Set<Category> getAllCategory() {
        return new LinkedHashSet<>(this.categoryRepo.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        return this.categoryRepo.findById(categoryId).get();
    }

    @Override
    public String deleteCateogory(Long categoryId) {

        this.categoryRepo.deleteById(categoryId);
        return "deleted successfully";
    }
}
