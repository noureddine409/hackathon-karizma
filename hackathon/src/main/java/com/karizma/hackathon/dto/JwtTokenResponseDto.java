package com.karizma.hackathon.dto;


import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtTokenResponseDto {
    private JwtToken accessToken;
    private JwtToken refreshToken;
}
