import e from "express";
import exp from "node:constants";

export type CreateUserParams ={
    firstName : string;
    lastName : string;
    password : string;
    isActive : boolean;
    email : string;
    personal : CreatePersonalParams;
}; 
export type UpdateUserParams ={
    firstName : string;
    lastName : string;
    password : string;
};

export type CreatePersonalParams ={
    Address: string;
    Age: string
    Gender: string;
};