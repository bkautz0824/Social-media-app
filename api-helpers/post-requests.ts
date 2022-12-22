import axios from 'axios'
const api = axios.create({baseURL: 'http://192.168.1.118:5050'})
export const getPopularPosts = async() =>
    await api.get('/posts').then(res => res).catch(err => err)