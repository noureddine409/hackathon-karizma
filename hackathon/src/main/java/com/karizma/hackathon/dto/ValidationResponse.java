package com.karizma.hackathon.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ValidationResponse {
    private String field;
    private String message;

}
