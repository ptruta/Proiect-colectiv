import { getAxios } from "../cfg/http-config";

class ProfileService {
    constructor() {
        this.axios = getAxios();
    }

    async getStudentProfileInfo() {
        const result = await this.axios.get('/users/student/me');
        return result.data;
    }

    async updateStudentProfileInfo(firstName, lastName, password, group) {
        const result = await this.axios.put('/users/student/me', {
            firstName: firstName,
            lastName: lastName,
            group: group,
            password: password,
        })
        const res = {
            status: result.status,
            data: result.data
        };
        return res;
    }

    async getTeacherProfileInfo() {
        const result = await this.axios.get('/users/professor/me');
        return result.data;
    }

    async updateTeacherProfileInfo(email, password, webpage) {
        console.log(email);
        const result = await this.axios.put('users/professor/me', {
            email: email, 
            password: password,
            webpageUrl: webpage
        });
        const res = {
            status: result.status,
            data: result.data
        };
        return res;
    }
}

const profileService = new ProfileService();
export default profileService;