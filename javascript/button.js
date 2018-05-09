var FULL_SCREEN_IMG = true

var social_score = 4
var civil_score = 3

var dna_stored = false
var fidelity_card = false
var ran = false
var talked_to_Mona = false
var stopped_when_Mona_sad = false
var show_text = true

var current_scene

/*var scenes = ["At_the_studio",
              "At_the_metro_station",
              "In_the_streets",
              "At_school",
              "At_the_supermarket",
              "Back_home",
              "Back_home2",
              "d2_At_school",
              "d2_At_health_insurance",
              "d2_Way_back_home",
              "d2_Way_back_home_Mona",
              "d2_Mona",
              "d2_Ignoring_Mona",
              "d2_At_home",
              "d3_At_school",
              "d3_Director",
              "d3_Back_home_Mona",
              "d3_Back_home_no_Mona",
              "rebellions_ending",
              "conformisms_ending"]*/

window.onresize = function(event) {
    let height_text = $("#"+current_scene + " .text_rec p").height()
    let height_choice = $("#"+current_scene + " .choice span").height()
    let height_total = height_text + height_choice
    $("#"+current_scene + " .text_rec").css("height", height_total)
    resizeImage()
};

function resizeImage() {
    /* Attention, consider that all images have same size*/
    let height_image = 720//$("#fading img").height()
    let width_image = 1280//$("#fading img").width()
    let height_body = $("body").height()
    let width_body = $("body").width()

    if (FULL_SCREEN_IMG) {
        $("#fading img").css("object-fit","cover")
        $("#fading img").css("width", "100%")
        $("#fading img").css("height", "100%")

        let height_text = $("#"+current_scene + " .text_rec").height()
        $("#"+current_scene + " .text_rec").css("top", height_body - height_text - 40)
    }
    else if (width_image/height_image > width_body/height_body) {
        $("img").css("width", "100%")
        $("img").css("height", "auto")
        $("img.opaque").css("width", "100%")
        $("img.opaque").css("height", "auto")
        $("fading").css("width", "100%")
        $("fading").css("height", "auto")
        height_image = $("img.opaque").height()
        $("img.opaque").css("left", "0")
        let top = parseInt(height_body - height_image)/2
        $("img.opaque").css("top", top)
        $("img").css("left", "0")
        $("img").css("top", top)

        let height_text = $("#"+current_scene + " .text_rec").height()
        $("#"+current_scene + " .text_rec").css("top", top+height_image - height_text - 40)
    }
    else {
        $("img").css("width", "auto")
        $("img").css("height", "100%")
        $("img.opaque").css("width", "auto")
        $("img.opaque").css("height", "100%")
        $("fading").css("width", "auto")
        $("fading").css("height", "100%")
        width_image = $("img.opaque").width()
        $("img.opaque").css("top", "0")
        let left = parseInt(width_body - width_image)/2
        $("img.opaque").css("left", left)
        $("img").css("top", "0")
        $("img").css("left", left)

        let height_text = $("#"+current_scene + " .text_rec").height()
        $("#"+current_scene + " .text_rec").css("top", height_body - height_text - 40)
    }
    setMinimizer()
}

function process(social_increment, civil_increment, next_scene) {
    current_scene = next_scene
    social_score += social_increment
    civil_score += civil_increment

    // Put all the images as transparent
    $("#fading img").removeClass("opaque");
    // Put only the selected image as opaque
    $("#"+next_scene + "_img").addClass("opaque");

    // Same with the form
    $("#scenes div").removeClass("opaque");
    $("#"+next_scene).addClass("opaque");

    let height_text = $("#"+next_scene + " .text_rec p").height()
    let height_choice = $("#"+next_scene + " .choice span").height()
    let height_total = height_text + height_choice
    $("#"+next_scene + " .text_rec").css("height", height_total)

    if ($("#"+current_scene + "_img").position() == undefined) {
        $("#"+current_scene + " .text_rec").css("top", parseInt($("body").height()/2 - height_total/2))
    }
    else {
        let top_img = parseInt($("#"+current_scene + "_img").position().top)
        let height_img = parseInt($("#"+current_scene + "_img").height())
        $("#"+current_scene + " .text_rec").css("top", top_img + height_img - height_total - 40)
    }

    setMinimizer()
}

function launch_outro(name) {
    $("#fading img").removeClass("opaque");
    $("#scenes div").removeClass("opaque");
    if (name == "rebellion") {
        setTimeout(function(){
            $("#rebellion_outro").css("display", "inline");
        }, 1000);
    }
    let body_width = $("body").width()
    let body_height = $("body").height()
    let video_width = 1920
    let video_height = 1080
    if (video_width / video_height > body_width / body_height) {
        // Si la video est plus large que la fenêtre, avec les même proportions
        let final_video_width = body_width
        let final_video_height = parseInt(final_video_width * (video_height/video_width))
        $(".video").css("width", final_video_width)
        $(".video").css("height", final_video_height)
        $("#rebellion_outro").css("left", 0)
        let top = parseInt(body_height/2 - final_video_height/2)
        $("#rebellion_outro").css("top", top)
    }
    else {
        let final_video_height = body_height
        let final_video_width = parseInt(final_video_height * (video_width/video_height))
        $(".video").css("width", final_video_width)
        $(".video").css("height", final_video_height)
        $("#rebellion_outro").css("top", 0)
        let left = parseInt(body_width/2 - final_video_width/2)
        $("#rebellion_outro").css("left", left)
    }
}

function updateText_d2_At_school() {
    let txt = "";
    if (talked_to_Mona) {
        txt = "De retour à l'université le lendemain, Julien croise Mona sur son banc. Celle-ci, contente de le voir, le salue chaleureusement et lui fait signe d'approcher.";
    }
    else {
        txt = "De retour à l'université le lendemain, Julien voit Mona de l'autre côté de la cour. Il croise son regard, qui semble vidé d'émotion. Un poster flamboyante présentant l'équipe de basket détourne son attention. << Recherche de nouvelles recrues talentueuses ! >> tonnait l'affiche. Julien sent une bouffée d'excitation s'emparer de lui. Il pensait justement rejoindre l'équipe de basket, en ayant fait plus jeune à un niveau relativement élevé et appréciant profondément ce sport. L'affiche précise de venir à l'un des entraînements de midi pour faire connaissance et participer à l'échauffement.<br /><br />";

    }
    document.getElementById("d2_At_school_text").innerHTML = txt;
}

function updateText_d2_At_health_insurance() {

    let text = "";
    text += "Julien arrive haletant dans la compagnie d'assurance la plus proche. Arrivé à l'accueil, il demande des renseignements pour contracter une assurance santé et on le redirige vers une femme qui prendra en charge son dossier. Après s'être assis et avoir prouvé son identité, Julien observe l'agent pianoter sur son clavier avant de se retourner vers lui. D'un ton monotone celle-ci déclare que l'assurance refuse son dossier et en énumère les raisons: <br/>";

    if (dna_stored) {
        text += "  - L'ADN que Julien avait envoyé précédemment indique des probabilités de maladie supérieures à la moyenne.<br />";
    }
    else {
        text += "  - Aucune donnée sur l'ADN de Julien, mais l'ADN des parents indique des probabilités de maladie supérieures à la moyenne, Julien est donc à risque.<br />";
    }

    if (fidelity_card) {
        text += "  - Les données récoltées à partir du compte client que Julien avait créé pour obtenir sa carte de fidélité indiquent qu'il a acheté des aliments qui sont mauvais pour la santé. <br />";
    }
    else {
        text += "  - Aucune donnée sur les aliments que Julien achète.<br />";
    }

    if (ran) {
        text += "  - Les données récoltées à partir de l'application que Julien avait utilisé pour aller courir indiquent que ses performances sont assez faibles. Le rythme cardiaque était également particulièrement élevé lors de la course, indicateur de mauvaise santé physique.<br />";
    }
    else {
        text += "  - Les données récoltées à partir du GPS du téléphone de Julien indiquent qu'il se déplace peu, et donc qu'il fait très peu de sport.<br />";
    }

    text += "<br />L'agent avertit Julien que s'il souhaite vraiment obtenir une assurance santé, le prix sera nettement plus élevé pour prendre en compte les facteurs de risque. Julien, choqué, se rend compte il n'est pas capable de payer une telle somme et qu'il doit abandonner l'idée de faire du basket. Une fois remis du choc, il sent une colère bouillonnante monter en lui: << Si je veux me faire assurer, c'est justement pour pour pouvoir faire du sport et par conséquent diminuer mes risques, pourquoi vous ne me laissez pas le faire ! >> fulmine-t-il en tapant du poing sur la table. La sécurité est appelée mais Julien sort en coup de vent qu'elle n'ai eu le temps d'arriver.<br /><br />Une caméra à l'intérieur de la pièce a enregistré la scène.";
    document.getElementById("d2_At_health_insurance_text").innerHTML = text;
}

function updateText_d2_At_home() {
    let text = "Le soir, après s'être calmé un peu, Julien lance un des jeux de réflexion sur smartphone qu'il apprécie. Il n'est pas forcément très bon mais << Au moins je peux faire des erreurs sans que ça me retombe dessus >> aime-t-il dire en souriant. <br/>";
    if (stopped_when_Mona_sad) {
        text+= "Il reçoit alors un message bizarre d'un ami de l'université qui l'aurait vu en companie de Mona. Celui-ci lui demande pourquoi il perd son temps avec une fille comme ça et l'avertit qu'il risque de gâcher sa vie s'il continue à la fréquenter. Julien est surpris que des gens s'intéressent à ce point aux gens à qui il parle.";
    }
    document.getElementById("d2_At_home_text").innerHTML = text
}


var d = new Date()
var color_bad_full = "rgba(204,0,0,1)"
var color_bad_mid = "rgba(204,0,0,0.5)"
var color_good_full = "rgba(0,160,0,1)"
var color_good_mid = "rgba(0,160,0,0.5)"
var timeout_show_warning
var timeout_hide_warning


function activateWarning(msg_what, msg_then, type="bad"){
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
        //document.getElementById("warning_text_head").innerHTML = "Information"
        $("#warning").css("background", color_good_full)
        $("#warning").css("box-shadow", "0 0 30px 30px rgba(0,160,0,1)")
    }
    else {
        //document.getElementById("warning_text_head").innerHTML = "Avertissement"
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

function minimize() {
    show_text = !show_text
    if (!show_text) {
        $("#scenes .opaque .text_rec").css("height", "0px")
        $("#scenes .opaque .text_rec").css("overflow", "hidden")
        let height_body = $("body").height()
        $("#scenes .opaque .text_rec").css("top", height_body - 40)
    }
    else {
        let height_text = $("#"+current_scene + " .text_rec p").height()
        let height_choice = $("#"+current_scene + " .choice span").height()
        let height_total = height_text + height_choice
        $("#scenes .opaque .text_rec").css("height", height_total)
        let height_body = $("body").height()
        $("#scenes .opaque .text_rec").css("top", (height_body - height_total - 40))
    }
    setMinimizer()
}

function setMinimizer() {
    let top_minimizer = parseInt($("#"+current_scene + " .text_rec").css("top"))-16
    $("#minimize").css("top", top_minimizer)
}
