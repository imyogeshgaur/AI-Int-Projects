import { decode } from "jsonwebtoken";

export const decodeTheUser = (token:string)=>{
    const data:any = decode(token,{complete:true})?.payload;
    return data?.userId;
}