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
        $("#searchInfo").empty();
        if (option === "doctor"){
            getDoctorVName(query, limit)
            .then(function(response){
                const doctorInfo = JSON.parse(response);
                let accept;
                if (doctorInfo.data.length === 0){
                    $('#doctorSearchContainer').append("<h1> OOPS! NO DOCTORS MATCHED YOUR QUERY! </h1> <h3>Please try again.</h3>" );
                } else{
                    $("#searchInfo").append(`<h2> Here are you results! </h2>`);
                    for (let i = 0; i < doctorInfo.data.length; i++){
                        console.log(doctorInfo.data[i].practices[0]);
                        let firstName = doctorInfo.data[i].profile.first_name;
                        let lastName = doctorInfo.data[i].profile.last_name;
                        let slug = doctorInfo.data[i].profile.slug;
                        let title = doctorInfo.data[i].profile.title;
                        let img = doctorInfo.data[i].profile.image_url;
                        let street = doctorInfo.data[i].practices[0].visit_address.street;
                        let city = doctorInfo.data[i].practices[0].visit_address.city;
                        let state = doctorInfo.data[i].practices[0].visit_address.state;
                        let zip = doctorInfo.data[i].practices[0].visit_address.zip;
                        if (doctorInfo.data[i].practices[0].accepts_new_patients){
                            accept = "YES";
                        } else {
                            accept = "NO";
                        }
                        console.log(accept);
                        let websiteUrl = doctorInfo.data[i].practices[0].website;
                        let number = doctorInfo.data[i].practices[0].phones[0].number;
                        $("#doctorSearchContainer").append(`
                                <div class="doctorCard">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <h2 class="doctorName"> ${firstName} ${lastName}, ${title} <h2>
                                            <hr>
                                            <h4 class="doctorLocation"> Location: ${city}, ${state} </h4>
                                            <p> Address: ${street} ${city}, ${state} ${zip} </p>
                                            <p> Phone number: ${number} </p>
                                            <p class="web"> <a href="${websiteUrl}">Visit website</a></p>
                                            <p> Accepting New Patients? ${accept}</p>
                                        </div>
                                        <div class="col-md-4">
                                            <img src=${img}>
                                        </div>
                                    </div>
                                </div>
                        <br>
                        `);
                        if (websiteUrl === undefined){
                            $(".web").text("No Website");
                        }
                    }
                }
            }, function(error){
                $('#doctorSearchContainer').append("<h1> OOPS! Something went wrong!</h1> <h3>Please try again.</h3>");
            });
        }
        else if (option === "condition"){
            getDoctorVCondition(query, limit)
            .then(function(response){
                let doctorInfo = JSON.parse(response);
                let accept;
                if (doctorInfo.data.length === 0){
                    $('#doctorSearchContainer').append("<h1> OOPS! NO DOCTORS MATCH YOUR QUERY! </h1> <h3>Please try again.</h3>" );
                } else {
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
                        accept = doctorInfo.data[i].practices[0].accepts_new_patients;
                        let websiteUrl = doctorInfo.data[i].practices[0].website;
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
                                            <p class="web"> <a href=${websiteUrl}>Visit website</a></p>
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
                        if (websiteUrl === undefined){
                            $(".web").text("No Website");
                        }
                    }
                }

                }, function(error){
                    $('#doctorSearchContainer').append("<h1> OOPS! Something went wrong!</h1> <h3>Please try again.</h3>");
            });
        }
    });
});
