package com.karizma.hackathon.dto;

import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RecipePatchDto {

    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;

    @Size(max = 1000, message = "Each ingredient cannot exceed 1000 characters")
    private List<String> ingredients;

    @Size(max = 1000, message = "Each preparation step cannot exceed 1000 characters")
    private List<String> preparationSteps;

    private Integer preparationTime;

    @Size(max = 255, message = "Photo URL cannot exceed 255 characters")
    private String photo;

}
