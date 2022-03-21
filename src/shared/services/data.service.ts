import axios from "axios";
import * as request from "request";
// import * as request from "request";
// import * as requestPromise from "request-promise";

class DataService {
  baseUrl: string = "http://localhost:8085/api/";
  fcmUrl: string = "https://fcm.googleapis.com/fcm/send";

  // External API call request
  doRequest = async (data: any) => {
    return new Promise((resolve, reject) => {
      request(data, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  };

  doRequestPost = (data: any) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    const url = this.baseUrl + data.url;
    return axios.post(url, data.params).then(
      (data: any) => {
        if (data.status === 200) {
          return data.data;
        } else {
          return { status: false, error: "Not Found Data" };
        }
      },
      (error: any) => {
        return error;
      }
    );
  };

  doRequestPostFcm = (data: any) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "key=AAAAHWV5WGQ:APA91bHak1dhfy1DqsZ22WndY7aT4ZCAyAbNzIWT1iJo7GJaXxj9q0tM47XJ_M1EjvrRSYxOCNO7KXVmRsI3umRZf_MpAA0nCupjsloGNzUs1mU9S7Z-KXwKy3kLFyqPOs_WJwVn3MTC";
    const url = this.fcmUrl;
    return axios.post(url, data.params).then(
      (data: any) => {
        if (data.status === 200) {
          return data.data;
        } else {
          return { status: false, error: "Not Found Data" };
        }
      },
      (error: any) => {
        return error;
      }
    );
  };

}

export default new DataService();
