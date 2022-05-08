import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use(config => {
    // you can get `config.headers`
},
    err => {
        // not 2xx http code
    })

export function get(uri: string): Promise<any> {
    return axios.get(uri)
}

export function post<T>(uri: string, body: any): Promise<T> {
    return axios.post(uri, body)
}
