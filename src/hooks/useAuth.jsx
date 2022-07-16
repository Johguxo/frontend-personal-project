import React, { useEffect, useReducer } from "react";

import AuthReducer from './auth/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'

const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('auth-user');
        return jsonValue;
    } catch (error) {
        console.log(error);
    }
}

const removeUser = async () => {
    await AsyncStorage.removeItem('auth-user')
}
const INITIAL_STATE = {
    user: getUser().then(user=>{
                if (user) {
                    return JSON.parse(user)
                } else {
                    removeUser();
                    return null
                }
            }) || null,
    isFetching: false,
    error: false,
};

export function useAuth() {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const setUser = async () => {
        if (state.user) {
            await AsyncStorage.setItem("auth-user", JSON.stringify(state.user));
        }
    }
    useEffect(() => {
        setUser();
    }, [state.user]);

    return { state, dispatch };
}