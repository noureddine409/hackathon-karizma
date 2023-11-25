package com.karizma.hackathon.dto;

import com.karizma.hackathon.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RecipeDto extends GenericDto {
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Size(min = 1, message = "At least one ingredient is required")
    private List<String> ingredients;

    @Size(min = 1, message = "At least one preparation step is required")
    private List<String> preparationSteps;

    @NotNull(message = "Preparation time cannot be null")
    private Integer preparationTime;

    private String photo;

    private User createdBy;

    @Builder
    public RecipeDto(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, List<String> ingredients, List<String> preparationSteps, Integer preparationTime, String photo, User createdBy) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.ingredients = ingredients;
        this.preparationSteps = preparationSteps;
        this.preparationTime = preparationTime;
        this.photo = photo;
        this.createdBy = createdBy;
    }
}
