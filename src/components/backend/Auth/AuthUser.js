import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser(){

    const navigate = useNavigate();


    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const tokenString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(tokenString);
        return user_detail;
    }

    const getUseraData = () =>{
        const tokenString = sessionStorage.getItem('alldata');
        const user_detail = JSON.parse(tokenString);
        return user_detail;
    }

    const [token,setToken] = useState(getToken);
    const [user,setUser] = useState(getUser);
    const [authUser,setAuthUser] = useState(getUseraData);


    const saveToken = (user,token , alldata) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('alldata',JSON.stringify(alldata));
       
        setToken(token);
        setUser(user);
        setAuthUser(alldata);
        navigate('/dashboard')
    }

    const logout = () =>{
        sessionStorage.clear();
        navigate('/');
    }


    const http = axios.create({
        baseURL:"http://127.0.0.1:8000/api",
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization':  `Bearer ${token}` 
        }
    });
    return{
        setToken:saveToken,
        token,
        user,
        getToken,
        logout,
        http,
        authUser
    }
}