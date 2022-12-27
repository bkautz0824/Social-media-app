import axios from 'axios'
const api = axios.create({baseURL: 'http://192.168.1.118:5050/posts'})

export const getPopularPosts = async() =>
    await api.get('/').then(res => res).catch(err => err)


export const getPostById = async(id:string) => 
    await api.get(`/${id}`).then(res => {
        console.log(res)
    return res
    }).catch(err => err)

