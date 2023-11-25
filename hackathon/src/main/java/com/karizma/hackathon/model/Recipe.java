package com.karizma.hackathon.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Recipe extends GenericEntity {
    private String name;

    @ElementCollection
    private List<String> ingredients;

    @ElementCollection
    private List<String> preparationSteps;

    private int preparationTime;
    private String photo;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "created_by_id")
    private User createdBy;



}
