import axios, {AxiosResponse} from "axios";
import {Recipy, RecipyPatch, SearchItemDto} from "../model/recipies.model";

const API_BASE_URL = "http://localhost:8080/api/v1";

const recipeService = {
    getById: async (id: number): Promise<Recipy> => {
        try {
            const response: AxiosResponse<Recipy> = await axios.get(`${API_BASE_URL}/recipes/${id}`);  // Removed redundant "/api/v1" and fixed the URL
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id: number, patch: RecipyPatch): Promise<Recipy> => {
        try {
            const response: AxiosResponse<Recipy> = await axios.patch(`${API_BASE_URL}/recipes/${id}`, patch);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id: number): Promise<boolean> => {
        try {
            const response: AxiosResponse<boolean> = await axios.delete(`${API_BASE_URL}/recipes/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    save: async (recipeDto: Recipy): Promise<Recipy> => {
        try {
            const response: AxiosResponse<Recipy> = await axios.post(`${API_BASE_URL}/recipes`, recipeDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    search: async (searchDto: SearchItemDto): Promise<Recipy[]> => {
        try {
            const response: AxiosResponse<Recipy[]> = await axios.post(`${API_BASE_URL}/recipes/search`, searchDto);
            return response.data;  // Corrected to return response.data instead of the entire response
        } catch (error) {
            throw error;
        }
    },
}

export default recipeService;
