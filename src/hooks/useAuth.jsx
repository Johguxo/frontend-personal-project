import React, { useEffect, useReducer, useContext } from "react";

import AuthReducer from './auth/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from "../contexts/AppContext";

const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('auth-user');
        return jsonValue;
    } catch (error) {
        console.log(error);
    }
}

const removeUser = async () => {
    await AsyncStorage.removeItem('auth-user');

}
const INITIAL_STATE = {
    /*user: getUser().then(user=>{
                if (user) {
                    if (user._W == undefined) {
                        console.log("-----------")
                        removeUser();
                        return null
                    } else {
                        return JSON.parse(user)
                    }
                } else {
                    removeUser();
                    return null
                }
            }) || null,*/
    user: null,
    isFetching: false,
    error: false,
};

export function useAuth() {
    const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    const setUser = async () => {
        if (authState.user) {
            await AsyncStorage.setItem("auth-user", JSON.stringify(authState.user));
        }
    }
    useEffect(() => {
        setUser();
    }, [authState.user]);

    return { authState, dispatch };
}