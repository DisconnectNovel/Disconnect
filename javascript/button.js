
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
}
