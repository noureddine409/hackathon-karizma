package com.karizma.hackathon.controller;

import com.karizma.hackathon.common.CoreConstant;
import com.karizma.hackathon.dto.RecipeDto;
import com.karizma.hackathon.dto.RecipePatchDto;
import com.karizma.hackathon.dto.SearchDto;
import com.karizma.hackathon.exception.BusinessException;
import com.karizma.hackathon.exception.ElementAlreadyExistsException;
import com.karizma.hackathon.exception.ElementNotFoundException;
import com.karizma.hackathon.exception.ResourceOwnershipException;
import com.karizma.hackathon.model.Recipe;
import com.karizma.hackathon.model.User;
import com.karizma.hackathon.service.RecipeService;
import com.karizma.hackathon.service.UserService;
import com.karizma.hackathon.utils.MapHelper;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.karizma.hackathon.common.CoreConstant.Exception.AUTHORIZATION_RESOURCE_OWNERSHIP;

@RestController
@RequestMapping("/api/v1/recipies")
public class RecipeController {

    private final RecipeService recipeService;

    private final MapHelper mapHelper;

    private final UserService userService;

    public RecipeController(RecipeService recipeService, MapHelper mapHelper, UserService userService) {
        this.recipeService = recipeService;
        this.mapHelper = mapHelper;
        this.userService = userService;
    }

    private Long getCurrentUserId() throws BusinessException {
        final Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (Objects.isNull(authentication.getPrincipal())) {
            throw new BusinessException(null, new BusinessException(), CoreConstant.Exception.AUTHENTICATION_NULL_PRINCIPAL, null);
        }
        return (Long) authentication.getPrincipal();
    }

    private User getCurrentUser() throws ElementNotFoundException {
        return userService.findById(getCurrentUserId());
    }

    private boolean isNotOwner(Recipe recipe) {
        final Long currentUserId = getCurrentUserId();
        final Long resourceOwnerId = recipe.getCreatedBy().getId();
        return !currentUserId.equals(resourceOwnerId);
    }

    private boolean isOwner(Recipe recipe) {
        return !isNotOwner(recipe);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getById(@PathVariable("id") Long id) throws ElementNotFoundException {
        final Recipe recipe = recipeService.findById(id);
        if (isNotOwner(recipe)) {
            throw new ResourceOwnershipException(new ResourceOwnershipException(), AUTHORIZATION_RESOURCE_OWNERSHIP, null);
        }
        final RecipeDto recipeDto = mapHelper.convertToDto(recipe, RecipeDto.class);
        return new ResponseEntity<>(recipeDto, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RecipeDto> update(@PathVariable("id") Long id, @Valid @RequestBody RecipePatchDto patch) throws ElementNotFoundException {
        final Recipe recipe = recipeService.findById(id);
        if (isNotOwner(recipe)) {
            throw new ResourceOwnershipException(new ResourceOwnershipException(), AUTHORIZATION_RESOURCE_OWNERSHIP, null);
        }
        final Recipe saved = recipeService.patch(id, patch);
        final RecipeDto itemDto = mapHelper.convertToDto(saved, RecipeDto.class);
        return new ResponseEntity<>(itemDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) throws ElementNotFoundException {
        final Recipe recipe = recipeService.findById(id);
        if (isNotOwner(recipe)) {
            throw new ResourceOwnershipException(new ResourceOwnershipException(), AUTHORIZATION_RESOURCE_OWNERSHIP, null);
        }
        return new ResponseEntity<>(recipeService.delete(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RecipeDto> save(@RequestBody @Valid RecipeDto dto) throws ElementAlreadyExistsException {
        Recipe recipe = mapHelper.convertToEntity(dto, Recipe.class);
        final User currentUser = getCurrentUser();
        recipe.setCreatedBy(currentUser);
        recipe.setId(null);
        final Recipe saved = recipeService.save(recipe);
        final RecipeDto recipeDto = mapHelper.convertToDto(saved, RecipeDto.class);
        return new ResponseEntity<>(recipeDto, HttpStatus.CREATED);
    }

    @PostMapping("search")
    public ResponseEntity<List<RecipeDto>> search(@RequestBody @Valid SearchDto searchDto) {
        searchDto.validate();
        Pageable pageable = PageRequest.of(searchDto.getPage(), searchDto.getSize());

        // Retrieve all recipes matching the search criteria
        List<Recipe> recipes = recipeService.search(searchDto.getKeyword(), pageable);

        // Filter out recipes that the user doesn't own
        List<Recipe> userOwnedRecipes = recipes.stream()
                .filter(this::isOwner)
                .collect(Collectors.toList());

        // Convert filtered recipes to DTOs
        List<RecipeDto> dto = mapHelper.convertListToDto(userOwnedRecipes, RecipeDto.class);


        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

}
