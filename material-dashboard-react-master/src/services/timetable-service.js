import { getAxios } from "../cfg/http-config";
// import moment from "moment";
import moment from "moment";
// import getNearestDayOfWeek from 'get-nearest-day-of-week';
import {getDate, getTodayInFormat} from '../misc/time-utils';


const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
const shameUrl = 'http://3.124.8.117/studyit/api/v1'


class TimetableService{

    constructor(){
        this.axios = getAxios();
    }

    async fetchTimetable(){
        

        
        //let meInfo = await this.fetchMeInfo();
        //const groupInfo = meInfo.group.split('/')
        //let group = groupInfo[0] + "/" + groupInfo[1];
    
        // let getUrl = `/timetable`;
        // getUrl += `?group=${group}`;
        let getUrl = '/timetable/students'
    
        const timetable = await this.axios.get(getUrl);
        // console.log("Timetable", timetable)
        const mapped = this._mapTimetableData(JSON.parse(JSON.stringify(timetable)))
        return mapped;
        
    }

    async fetchTeacherTimetable(professorId){

        let getUrl = `/timetable/professors/${professorId}?clientId=studyit-35c2-11e9-b210-d663bd873d93`
        const timetable = await this.axios.get(getUrl);
        const mapped = this._mapTimetableData(JSON.parse(JSON.stringify(timetable)))
        console.log("Mapped", mapped)
        return mapped
    }

    async fetchMeInfo(){
        const resp = await this.axios.get(`/users/professor/me?clientId=studyit-35c2-11e9-b210-d663bd873d93`)
        console.log("MeInfo", resp['data'])
        return resp.data
    }

    mapTimetableData(response){
        const eventsMapper = {'MONDAY' : [], 'TUESDAY': [], 'WEDNESDAY': [], 'THURSDAY': [], 'FRIDAY': [], 'SATURDAY': []};
        response['data'].forEach(event => {
            event.type = event.classType;
            event.name = event.type + " " +  event.subjectDto.name;
            event.startTime = moment("2018-02-23T" + event.startTime);
            event.endTime = moment("2018-02-23T" + event.endTime);
            const day = event.day;
            if (eventsMapper[day]){
                eventsMapper[day].push(event);
            }
            else{
                eventsMapper[day] = [event];
            }
        });
        
        return eventsMapper;
    }


    mapDayToDate(day, hour){
        // const today = getTodayInFormat()
        // let strDate = getNearestDayOfWeek(today, days.indexOf(day) + 1);
        // const arr = strDate._i.split('-')

        // const date =  new Date(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), hour, 0);
        // return date

    }


    _mapTimetableData(response){
        const events = []
        response['data'].forEach(event => {
            console.log("Current event", event)
            event.type = event.classType;
            event.name = event.type + " " +  event.subjectDto.name;
            const starttime = event.startTime.split(':')[0];
            const endtime = event.endTime.split(':')[0];

            event.startDate = getDate(event.day, parseInt(starttime));
            event.endDate = getDate(event.day, parseInt(endtime));
            event.title = event.name;
            event.location = event.room.number;
            events.push(event)
        
        });
        
        return events;
    }
    

}

export const timetableService = new TimetableService();