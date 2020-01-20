import { getAxios } from "../cfg/http-config";


class SubjectsService{

    constructor() {
        this.axios = getAxios();
    }
    
    async getSubjects() {
        try {
             
            const enrolls = await this.axios.get('/students/enrollments');
            return enrolls['data'];
          } catch (error) {
            console.error(error);
        }
    }

    async enrollAfterRegister(){
        return await this.axios.post('/enrollments/me')
    }
    async enrollAtSubject(subjectId){
        const enrollments = await this.axios.post('/students/enroll?subjects=' + subjectId);
        return enrollments['data'];
    }

    async getOptionalSubjects(optionalNames){
        const optionalList = [];
        for(let optional of optionalNames){
            let optionalSubj = await this.axios.get('/subjects?startsWith=' + optional)
            if(!optionalSubj['data'][0]){
                continue
            }
            optionalSubj = optionalSubj['data'][0];
            optionalSubj['category'] = optionalSubj['name'];
            optionalList.push(optionalSubj);
        }
        return optionalList;
    }
    async deleteOptionalSubscription(optionalSubscriptionId){
        return await this.axios.delete('/students/enrollments/' + optionalSubscriptionId);
    }

    async getSubjectDetails(subjectId){
        const details = await this.axios.get('/timetable/subject/' + subjectId + "/info");
        return details['data'];
    }
    async getNews(subjectId){
        const news = await this.axios.get(`/news?subjectId=${subjectId}`)
        return news['data'];
    }

    async getTaughtSubjects(professorId){
        const subjects = await this.axios.get(`/professors/${professorId}/subjects?clientId=studyit-35c2-11e9-b210-d663bd873d93`)
        return subjects['data']
    }

}
export default new SubjectsService;