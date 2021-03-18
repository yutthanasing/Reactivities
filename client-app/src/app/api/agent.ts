import { Activity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

const sleep = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get : <T> (url : string) => axios.get<T>(url).then(responseBody),
    post : <T> (url : string, body : {}) => axios.post<T>(url).then(responseBody),
    put : <T> (url : string, body : {}) => axios.put<T>(url).then(responseBody),
    del : <T> (url : string) => axios.delete<T>(url).then(responseBody)
}

const Activies = {
    list : () => requests.get<Activity[]>('/activities'),
    detail : (id : string) => requests.get<Activity>(`/activities/${id}`),
    create : (activity : Activity) => axios.post<void>('/activities', activity),
    update : (activity : Activity) => axios.post<void>(`/activities/${activity.id}`, activity),
    delete : (id : string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activies
}

export default agent;