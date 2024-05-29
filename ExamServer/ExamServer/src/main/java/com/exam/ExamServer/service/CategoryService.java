package com.exam.ExamServer.service;

import com.exam.ExamServer.model.exam.Category;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);

    public Category updateCategory(Category category);

    public Set<Category> getAllCategory();

    public Category getCategory(Long categoryId);

    public String deleteCateogory(Long categoryId);
}
