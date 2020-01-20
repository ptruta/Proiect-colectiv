
import {getAxios} from '../cfg/http-config'

class AssignmentService{

    constructor(){
        this.axios = getAxios()
    }

    async getAssignments(subjectId, professorId){
     
        let getUrl = `/assignments?subjectId=${subjectId}`
        if(professorId != undefined){
            getUrl += `&&professorId=${professorId}`
        }
        const assignments = await this.axios.get(getUrl);
        return assignments['data']
    }

    async addAssign(content, deadline, subjectId, professorId){
        const body = {
            content: content, 
            deadline: deadline,
            subjectId: subjectId,
            professorId: professorId

        }
        let postUrl = `/assignments?content=${content}&&deadline=${deadline}&&subjectId=${subjectId}&&professorId=${professorId}`
        let postURL = "/assignments"
        await this.axios.post(postURL, body);
    }
}

const assignmentService = new AssignmentService();
export default assignmentService;