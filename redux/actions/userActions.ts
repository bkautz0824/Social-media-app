import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage/lib/typescript/AsyncStorage";
import { setTokenHeader } from "../middleware/setTokenHeaders";

const api = axios.create({
    baseURL: 'http://192.168.1.209:5050'
})

export const loginUser = createAsyncThunk('user/login',
  async (data: any, thunkAPI) => {
    await axios.post('/auth/login', data).then((res: any) => {
      // console.log(res.data)
    return {
        data: res.data,
        authenticated: true,
      token: res.token,
        isLoading: false,
    }
  }, (err) => {
    return {
      authenticated: false,
      token: undefined,
    data: undefined,
      isLoading: false,
}
  })
})
export const verifyUser = createAsyncThunk('user/verify', async () => {
    // let token
  const token = await setTokenHeader(api)
  console.log(token, 'token')
  if (token) {
        console.log('verifying....')
    return await api.get('/auth/verify').then(res => {
          console.log(res.data, 'verifyuser')
        return res.data.username ?
        {data: res.data, authenticated: true}
        : { data: undefined, authenticated: false, token: undefined }
      })
      } else {
        return { data: undefined, authenticated: false, token: undefined }
    }
})
export const editUser = createAsyncThunk('user/edit', async (data: any, thunkAPI: any) => {
  const token = await setTokenHeader(api)
  if (token) {
    const { filename, content_type, uri } = data.profile_picture
    const { username, bio, email, user_id} = data
    const formData = {
      profile_picture: {
        uri: uri,
        filename: filename,
        content_type: content_type
      },
      username: username,
      bio: bio,
      email: email,
    }
   return await api.put(`users/${user_id}`, formData).then((res: any) => {
     if (!res.error) {
        // console.log(res.data.profile_picture_url)
        return ({ ...res.data })
      } else {
        return ({ error: res.error })
      }
    }, err => {
      console.log(err)
      return ({ error: 'something went wrong' })
    })
  }
}
)