
var social_score = 10
var civil_score = 10
var selected = 0

function process(social_increment, civil_increment, increment) {
    //alert(String(social_increment) + " " + String(civil_increment) + " " + String(increment))
    selected += increment
    social_score += social_increment
    civil_score += civil_increment

    document.getElementById("social_score").innerHTML = social_score
    document.getElementById("civil_score").innerHTML = civil_score

    // Put all the images as transparent
    $("#fading img").removeClass("opaque");
    // Put only the selected image as opaque
    $("#fading img").eq(selected).addClass("opaque");

    // Same with the form
    $("#forms div").removeClass("opaque");
    $("#forms div").eq(selected).addClass("opaque");
}

/*
function initialize() {
    localStorage.setItem("social_score", 10);
    localStorage.setItem("civil_score", 10);
    localStorage.setItem("warn_before_leaving_page", "true")
    localStorage.setItem("current_scene", "scene1")
}

function process(social_increment, civil_increment, next_page) {
    let new_social_score = parseInt(localStorage.getItem("social_score")) + social_increment
    let new_civil_score = parseInt(localStorage.getItem("civil_score")) + civil_increment
    localStorage.setItem("social_score", new_social_score);
    localStorage.setItem("civil_score", new_civil_score);

    go_to_page(next_page)
}

function go_to_page(next_page) {
    localStorage.setItem("warn_before_leaving_page", "false")
    window.location.href = next_page;
}*/
