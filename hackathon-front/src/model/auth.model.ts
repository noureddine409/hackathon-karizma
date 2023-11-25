// types.ts

export interface JwtToken {
    token: string;
    tokenType: string;
    createdAt: string; // Assuming you're using ISO date string
    expiresIn: string; // Assuming you're using ISO date string
}

export interface JwtTokenResponseDto {
    accessToken: JwtToken;
    refreshToken: JwtToken;
}

export interface UserLoginDto {
    email: string;
    password: string;
}
