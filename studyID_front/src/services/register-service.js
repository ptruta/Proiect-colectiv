import { getAxios } from "../cfg/http-config";
import axios from 'axios'

class RegisterService{
    constructor() {
        this.axios = getAxios();
    }

    async getDepartments() {
        const url = 'http://ec2-3-124-8-117.eu-central-1.compute.amazonaws.com/studyit/api/v1/departments?clientId=studyit-35c2-11e9-b210-d663bd873d93';
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const result = await axios.get(url)
            .then(response => {
                const res = {
                    data: response.data,
                    status: response.status
                }
                return res;
            })
            .catch(error => {
                const res = {
                    data: error.response.data,
                    status: error.response.status
                }
            })
        return result;
    }

    async getGroups(department) {
        const url = 'http://ec2-3-124-8-117.eu-central-1.compute.amazonaws.com/studyit/api/v1/departments/' + department + '/groups?clientId=studyit-35c2-11e9-b210-d663bd873d93';
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const result = await axios.get(url)
            .then(response => {
                const res = {
                    data: response.data,
                    status: response.status
                }
                return res;
            })
            .catch(error => {
                const res = {
                    data: error.response.data,
                    status: error.response.status
                }
            })
        return result;
    }

    async registerStudent(firstName, lastName, email, password, group) {
        const url = 'http://ec2-3-124-8-117.eu-central-1.compute.amazonaws.com/studyit/api/v1/users/student?clientId=studyit-35c2-11e9-b210-d663bd873d93';
        const requestBody = {
            email: email,
            firstName: firstName,
            group: group,
            lastName: lastName,
            password: password,
        };
        const result = await axios.post(url, requestBody)
        .then(response => {
            const res = {
                data: response.data,
                status: response.status
            };
            return res;
        })
        .catch(error => {
            const res = {
                data: error.response.data,
                status: error.response.status
            };
            return res;
        })
        console.log(result);
        return result;
    }

}

const registerService = new RegisterService()
export default registerService; 