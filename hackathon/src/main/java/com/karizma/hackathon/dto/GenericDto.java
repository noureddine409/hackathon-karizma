package com.karizma.hackathon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenericDto {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}

