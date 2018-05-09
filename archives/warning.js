var d = new Date()
var color_bad_full = "rgba(204,0,0,1)"
var color_bad_mid = "rgba(204,0,0,0.5)"
var color_good_full = "rgba(0,160,0,1)"
var color_good_mid = "rgba(0,160,0,0.5)"
var timeout_show_warning
var timeout_hide_warning

function activateWarning(msg_what, msg_then, type="bad") {
    clearTimeout(timeout_show_warning)
    clearTimeout(timeout_hide_warning)
    document.getElementById("warning_text_what").innerHTML = msg_what
    document.getElementById("warning_text_then").innerHTML = msg_then
    let width_body = $("body").width()
    let width_warning = $("#warning").width()
    let left = parseInt(width_body-width_warning)
    let pos_text = "calc(" + left.toString() + "px - 10%)";
    $("#warning").css("left", pos_text)
    if (type == "good") {
        document.getElementById("warning_text_head").innerHTML = "Information"
        $("#warning").css("background", color_good_full)
        $("#warning").css("box-shadow", "0 0 30px 30px rgba(0,160,0,1)")
    }
    else {
        document.getElementById("warning_text_head").innerHTML = "Avertissement"
        $("#warning").css("background", color_bad_full)
        $("#warning").css("box-shadow", "0 0 30px 30px rgba(204,0,0,1)")
    }
    timeout_show_warning = setTimeout(function(){
        $('#warning').addClass("warning_show");
        if (type == "good") {
            $("#warning.warning_show").css("animation-name", "blinker_good")
        }
        else {
            $("#warning.warning_show").css("animation-name", "blinker_bad")
        }
    }, 1000);
    timeout_hide_warning = setTimeout(function(){
        $('#warning').removeClass("warning_show");
    }, 6000);
}
