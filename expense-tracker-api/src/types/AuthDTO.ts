export type loginUserDTO = {
    email:string;
    password:string;
}

export type registerUserDTO = {
    name:string;
    email:string;
    password:string;
    currency?:string;
}