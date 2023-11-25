import {GenericModel} from "./generic.model";

export interface User extends GenericModel {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    enabled?: boolean;
}
