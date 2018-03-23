let Promise = require('es6-promise-polyfill').Promise;
let api = process.env.exports.apiKey;

export function getDoctorVName(name, limit){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=47.608,-122.335,100&skip=2&limit=${limit}&user_key=${api}`;

        request.onload = function(){
            if(this.status === 200){
             resolve(request.response);
            }else{
             reject(Error(request.statusText));
            }
        }

        request.open("GET", url, true);
        request.send();
    });
}

export function getDoctorVCondition(condition, limit){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=47.608,-122.335,100&skip=2&limit=${limit}&user_key=${api}`;

        request.onload = function(){
            if(this.status === 200){
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        }

        request.open("GET", url, true);
        request.send();
    });
}
