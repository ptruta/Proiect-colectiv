
import axios from 'axios';


let axiosService = null;

const createAxios = () => {

    const defaultOptions = {
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
        },
        baseURL: 'http://ec2-3-124-8-117.eu-central-1.compute.amazonaws.com/studyit/api/v1/',
    };

    
    const axiosInstance = axios.create(defaultOptions);

    // const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(config => {

        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    });

    axiosInstance.interceptors.response.use(resp => {
        try{
            if(resp.status === 401){
                throw new Error("Permision denied");
            }
            if(resp.status == 404){
                throw new Error("Resource not found");
            }
        }
        catch(excp){
            return Promise.reject(excp);
        }
        return resp;
    });

    return axiosInstance;
};

export function getAxios(){
    if(axiosService === null){
        axiosService = createAxios();
    }
    return axiosService;
}