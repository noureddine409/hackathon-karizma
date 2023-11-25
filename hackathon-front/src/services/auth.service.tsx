import axios, {AxiosResponse} from "axios";
import {JwtTokenResponseDto, UserLoginDto} from "../model/auth.model";
import {User} from "../model/user.model";

const API_BASE_URL = "http://localhost:8080/api/v1/auth";

const authService = {
    register: async (userDto: User): Promise<User> => {
        try {
            const response: AxiosResponse<User> = await axios.post(`${API_BASE_URL}/register`, userDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (userLoginDto: UserLoginDto): Promise<JwtTokenResponseDto> => {
        try {
            const response: AxiosResponse<JwtTokenResponseDto> = await axios.post(`${API_BASE_URL}/login`, userLoginDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (): Promise<JwtTokenResponseDto> => {
        try {
            const response: AxiosResponse<JwtTokenResponseDto> = await axios.post(`${API_BASE_URL}/token`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default authService;
