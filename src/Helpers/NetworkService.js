import Utils from "./Utils";


export default class NetworkService {
    static baseURL = 'https://food-delivery.kreosoft.ru/api/';
    
    static  makeAthorizedRequest = async (endpoint, method, body) => {
        let token = Utils.token();
          
        const url = NetworkService.baseURL + endpoint;
        
        console.log("token", token);
        console.log("url", url);

        var requestBody = null;
        
        if (body) {
            requestBody = body
        }

        const settings = {
            method: method,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: requestBody
        };

        console.log('settings', settings);

        try {
            let response = await fetch(url, settings);
            
            console.log("response", response);
            console.log("response.status", response.status);
            
            let data = await this.tryParseResponse(response);

            if (response.ok && data) { // HTTP status 200
                return {status: true, data: data};
            } else if (response.ok) {
                return {status: true};
            } else {
                return {status: false}; // HTTP status 4XX
            }
            
        } catch (error) {
            console.log("NetworkService:makeAthorizedRequest: response error: ", error);
            
            return {status: false, error: error};
        }
    };

    static tryParseResponse = async (response) => {
        try {
            let data = await response.json();
            return data;
        }
        catch (error) {
            console.log("NetworkService:tryParseResponse: response error: ", error);
        }
    }

    static makeUnathorizedRequest = async (endpoint, method, body) => {
        const url = NetworkService.baseURL + endpoint;

        let settings = {
            method: method,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        };
        
        console.log(url);

        try {
            let response = await fetch(url, settings);
            let data = await response.json();
            
            console.log("NetworkService:makeUnathorizedRequest: response: ", data);

            if (response.ok) {
                return {status: true, data: data};
            } else {
                return {status: false, data: data};
            }
            
        } catch (error) {
            console.log("NetworkService:makeUnathorizedRequest: response error: ", error);
            return {status: false, error: error};
        }
    };
};