package com.karizma.hackathon.service.impl;

import com.karizma.hackathon.model.Recipe;
import com.karizma.hackathon.repository.GenericRepository;
import com.karizma.hackathon.service.RecipeService;
import com.karizma.hackathon.utils.MapHelper;
import org.springframework.stereotype.Service;

@Service
public class RecipeServiceImpl extends GenericServiceImpl<Recipe> implements RecipeService {

    public RecipeServiceImpl(GenericRepository<Recipe> genericRepository, MapHelper mapHelper) {
        super(genericRepository, mapHelper);
    }
}
