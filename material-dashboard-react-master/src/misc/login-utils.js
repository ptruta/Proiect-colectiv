import { getAxios } from "../cfg/http-config";
import {User} from '../models/login/user';


export async function isAuth() {
    const cookie = localStorage.getItem("token");
    const role = localStorage.getItem("userType");
    if(!cookie || !role){
        return false;
    }
    // const axios = getAxios();
    
    // if(!user){
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("email");
    //     localStorage.removeItem("userType");
    //     return false;
    // }

    return true;
}

export function getUser(){
    if (!isAuth()){
        return undefined;
    }
    const username = localStorage.getItem("email");
    const type = localStorage.getItem("userType");
    return new User(username, type);
}