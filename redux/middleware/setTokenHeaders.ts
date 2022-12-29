import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTokenHeader = async (api: any) => {
    const token = await AsyncStorage.getItem('authToken')

    console.log(token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    return token;
}