import axios, { Axios } from "axios";


const apiServer = 'http://localhost:8080';

export const customAxios = axios.create({
    baseURL: apiServer
})

// API 호출을 수행하는 fetcher 함수
export const fetcher = (url: string) => customAxios.get(url).then(res => res.data);