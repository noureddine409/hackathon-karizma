package com.karizma.hackathon.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ErrorResponse {
    private int code;
    private HttpStatus status;
    private String message;

}
