import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage/lib/typescript/AsyncStorage";
import { setTokenHeader } from "../middleware/setTokenHeaders";

const api = axios.create({
    baseURL: 'http://localhost:5050'
})

export const loginUser = createAsyncThunk('user/login', 
    async (data: any, thunkAPI) => {
        await axios.post('/auth/login', data).then((res: any) => {
            if(res) {
                return {
                    data: res.data,
                    authenticated: true,
                    token: res.token,
                    isLoading: false,
                }
            } else {
                return {
                    authenticated: false,
                    token: undefined,
                    data: undefined,
                    isLoading: false,
                }
            }
        })
    }
)

export const verifyUser = createAsyncThunk('user/verify', async (thunkAPI) => {
    const token = await setTokenHeader(api)

    console.log(token)

    if(token) {
        console.log('verifying...')
        return await api.get('/auth/verify/verbose-info').then(res => {
            return res.data.username ? 
            {data: res.data, authenticated: true}
            : {data: res.data, authenticated: false, token: undefined}
        })
    } else {
        return {data: undefined, authenticated: false, token: undefined}
    }
})