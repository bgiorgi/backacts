import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
      providedIn: 'root'
})
export class UniqueActService {


    constructor(public http: HttpClient) {}
    
    getAct(slug) {
      
            // still need authorization to check if events are bookmarked
            let access_token = localStorage.getItem('access_token');
            let headers = {
                'Authorization': 'Bearer '+access_token
            }
                return this.http.get(environment.apiUrl+'/api/event/'+slug,{ headers:headers});
    }
    


}

