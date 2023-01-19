import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import RNRestart from 'react-native-restart'

const api = axios.create({baseURL: 'http://192.168.1.209:5050/', headers:{
    'Content-Type': 'multipart/form-data'
}})

export const loginUser = async (data: any) => 
await api.post('/auth/login', data).then(async res => {
    await AsyncStorage.setItem('authToken', res.data.token).then(res => console.log(res)
    )
    return res
}, ({response}) => {
    return response.data
}
)

export const removeToken = async (user_id?: string) => {

    api.defaults.headers.common.authrorization = false;
    await AsyncStorage.setItem('authToken', '')
    RNRestart.Restart
}