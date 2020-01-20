import { getAxios } from "../cfg/http-config";
import subjectService from './subjects-service';

class NewsService{
    constructor() {
        this.axios = getAxios();
    }
    async createNews(title,content,datetime,subjectId){
        const result=await this.axios.post('/news',{
            // category:category,
            title:title,
            content:content,
            datetime:datetime,
            subjectId:subjectId,
            
        })
        return result;
    }
    
    async getNews(){
        const result=await this.axios.get('/news',{
            
        })
        return result.data;
        
    }
    async getSubjects(){
        try {
            return await this.axios.get('/subjects');
          } catch (error) {
            console.error(error);
        }

    }
    async getTeacherNews(subjectId){
        const news = await this.axios.get('/news?subjectId=' + subjectId);
        return news.data;

    }

    async addNews(newsObject){
        await this.axios.post('/news', newsObject)
    }

}

const newsService = new NewsService()
export default newsService; 


