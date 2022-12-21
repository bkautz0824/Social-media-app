import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5050'})

export const getPopularPosts = async() => 
    await axios.get('http://localhost:5050/posts').then(res => res).catch(err => err)