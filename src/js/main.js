import $ from 'jquery';
import {getDoctorVName, getDoctorVCondition} from './search.js';
import "../css/styles.css";
import "../css/bootstrap.css";

$(document).ready(function(){
    $("#searchBar").submit(function(event){
        event.preventDefault();
        let option = $("input:radio[name=searchOption]:checked").val();
        let query = $("#query").val();
        let limit = $("input:radio[name=limit]:checked").val();
        $("#doctorSearchContainer").empty();
        if (option === "doctor"){
            getDoctorVName(query, limit)
            .then(function(response){
                let doctorInfo = JSON.parse(response);
                console.log(doctorInfo);
                for (let i = 0; i < doctorInfo.data.length; i++){
                    let firstName = doctorInfo.data[i].profile.first_name;
                    let lastName = doctorInfo.data[i].profile.last_name;
                    let slug = doctorInfo.data[i].profile.slug;
                    let title = doctorInfo.data[i].profile.title;
                    let img = doctorInfo.data[i].profile.image_url;
                    let street = doctorInfo.data[i].practices[0].visit_address.street;
                    let city = doctorInfo.data[i].practices[0].visit_address.city;
                    let state = doctorInfo.data[i].practices[0].visit_address.state;
                    let zip = doctorInfo.data[i].practices[0].visit_address.zip;
                    let accept = doctorInfo.data[i].practices[0].accepts_new_patients;
                    let website = doctorInfo.data[i].practices[0].website;
                    let number = doctorInfo.data[i].practices[0].phones[0].number;
                    $("#searchInfo").append(`<h2> Here are you results! </h2>`)
                    $("#doctorSearchContainer").append(`
                            <div class="doctorCard">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h2 class="doctorName"> ${firstName} ${lastName}, ${title} <h2>
                                        <hr>
                                        <h4 class="doctorLocation"> Location: ${city}, ${state} </h4>
                                        <p> Address: ${street} ${city}, ${state} ${zip} </p>
                                        <p> Phone number: ${number} </p>
                                        <p> <a href=${website}>Visit website</a></p>
                                        <p> Accepting New Patients? <span id="accepting"></span></p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src=${img}>
                                    </div>
                                </div>
                            </div>
                    <br>
                    `);
                    if (accept){
                        $("#accepting").text("YES");
                    }else{
                        $("#accepting").text("NO");
                    }
                }
            });
        }
        else if (option === "condition"){
            getDoctorVCondition(query, limit)
            .then(function(response){
                let doctorInfo = JSON.parse(response);
                console.log(doctorInfo);
                for (let i = 0; i < doctorInfo.data.length; i++){
                    let firstName = doctorInfo.data[i].profile.first_name;
                    let lastName = doctorInfo.data[i].profile.last_name;
                    let slug = doctorInfo.data[i].profile.slug;
                    let title = doctorInfo.data[i].profile.title;
                    let img = doctorInfo.data[i].profile.image_url;
                    let street = doctorInfo.data[i].practices[0].visit_address.street;
                    let city = doctorInfo.data[i].practices[0].visit_address.city;
                    let state = doctorInfo.data[i].practices[0].visit_address.state;
                    let zip = doctorInfo.data[i].practices[0].visit_address.zip;
                    let accept = doctorInfo.data[i].practices[0].accepts_new_patients;
                    let website = doctorInfo.data[i].practices[0].website;
                    let number = doctorInfo.data[i].practices[0].phones[0].number;
                    $("#searchInfo").append(`<h2> Here are you results! </h2>`)
                    $("#doctorSearchContainer").append(`
                            <div class="doctorCard">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h2 class="doctorName"> ${firstName} ${lastName}, ${title} <h2>
                                        <hr>
                                        <h4 class="doctorLocation"> Location: ${city}, ${state} </h4>
                                        <p> Address: ${street} ${city}, ${state} ${zip} </p>
                                        <p> Phone number: ${number} </p>
                                        <p> <a href=${website}>Visit website</a></p>
                                        <p> Accepting New Patients? <span id="accepting"></span></p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src=${img}>
                                    </div>
                                </div>
                            </div>
                    <br>
                    `);
                    if (accept){
                        $("#accepting").text("YES");
                    }else{
                        $("#accepting").text("NO");
                    }
                }
            });
        }
    });
});
