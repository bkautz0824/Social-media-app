import axios from 'axios'
const api = axios.create({baseURL: 'http://192.168.1.118:5050/comments'})

export const createComment = async(data:any) => 
    await api.post('/create').then(res => res).catch(err => err)