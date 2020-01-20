import { getAxios } from "../cfg/http-config";


class LoginService{

    constructor(){
        this.axios = getAxios();
    }

    async loginUser(email, password) {
        const url = 'http://ec2-3-124-8-117.eu-central-1.compute.amazonaws.com/studyit/api/v1/users/token?client_id=studyit-35c2-11e9-b210-d663bd873d93';
        const requestBodyObj = {
            grant_type: 'password',
            password: password
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const qs = require('querystring');
        const requestBody = qs.stringify(requestBodyObj).concat('&username=' + email);
        const result = await fetch(url,
            {  
                method : 'POST',
                body : requestBody,
                headers: config.headers
            })
            .then(resp => {

                if(resp.status != 200){
                    throw new Error("Login failed")
                }
                return resp.json() 
            })
            .then(resp => { return {
                status: 200,
                data: resp
                }
            })
            .catch(error => {
                const res = {
                    data: "Unknown error",
                    status: 400
                }
                return res;
            });
        console.log("Result is", result)
        return result;
     }   
}

const loginService = new LoginService();
export default loginService;
