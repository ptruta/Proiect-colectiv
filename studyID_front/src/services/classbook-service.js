import {getAxios} from '../cfg/http-config'


class ClassbookService {

    constructor(){
        this.axios = getAxios();
    }

    async getStudentClassBook(subjectID) {
        const classbook = await this.axios.get('/classbook/student?subjectId=' + subjectID);
        return classbook.data;
    } 

    async getClassBook(classType, group, subjectId){
        const classbook = await this.axios.get(`/classbook/professor?classType=${classType}&&group=${group}&&subjectId=${subjectId}`)
        console.log('Class book', classbook['data']);
        return classbook['data'];

    }

    async markPresent(classNumber, classType, studentId, subjectId){
        const newPresence = await this.axios.post('/classbook/attendances', {
            attendanceType: 'PRESENT',
            classNumber: classNumber,
            classType: classType,
            studentId: studentId,
            subjectId: subjectId
        });
        return newPresence['data'];
    }

    async markAbsent(entryId){
        await this.axios.delete('/classbook/attendances/' + entryId);
    }

    async createGrade(classNumber, classType, studentId, subjectId, grade){
        const newPresence = await this.axios.post('/classbook/grades', {
            attendanceType: 'PRESENT',
            classNumber: classNumber,
            classType: classType,
            studentId: studentId,
            subjectId: subjectId,
            grade: grade
        });
        return newPresence['data'];
    }

    async deleteGrade(entryId){
        await this.axios.delete('/classbook/grades/' + entryId);
    }
}

const classbookService = new ClassbookService();
export default classbookService;