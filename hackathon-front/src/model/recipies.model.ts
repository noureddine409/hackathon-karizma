import {GenericModel} from "./generic.model";
import {User} from "./user.model";

export interface Recipy extends GenericModel{

    name: string;
    ingredients: string[];
    preparationSteps: string[];
    preparationTime: number;
    photo?: string;
    createdBy?: User;
}

export interface RecipyPatch extends GenericModel{

    name?: string;
    ingredients?: string[];
    preparationSteps?: string[];
    preparationTime?: number;
    photo?: string;
    createdBy?: User;
}

export interface SearchItemDto {
    keyword?: string;
    category?: string | null;
    page?: number;
    size?: number;
}

export interface SearchParameter {
    keyword: string;
    page: number;
    size: number;
    totalPages: number
}

