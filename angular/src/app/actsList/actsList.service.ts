import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
      providedIn: 'root'
})
export class ActsListService {


    constructor(public http: HttpClient) {}
    
    getActs(params?,actsType?) {
      Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : ''); // delete undefined keys
      
        if(actsType=='bookmarked') {
            let access_token = localStorage.getItem('access_token');
            let headers = {
                'Authorization': 'Bearer '+access_token
            }        
            return this.http.get(environment.apiUrl+'/api/user-bookmarked-events',{ headers: headers, params: params})
        }
        else if(actsType=='uploads') {
            let access_token = localStorage.getItem('access_token');
            let headers = {
                'Authorization': 'Bearer '+access_token
            }        
            return this.http.get(environment.apiUrl+'/api/user-uploaded-events',{ headers: headers, params: params})
        }
        // all acts
        else {
            // still need authorization to check if events are bookmarked
            let access_token = localStorage.getItem('access_token');
            let headers = {
                'Authorization': 'Bearer '+access_token
            }            
                return this.http.get(environment.apiUrl+'/api/events',{ headers:headers, params: params});
            }         
    }
    


}

