var FULL_SCREEN_IMG = true

var social_score = 4
var civil_score = 3

var dna_stored = false
var fidelity_card = false
var ran = false
var talked_to_Mona = false
var stopped_when_Mona_sad = false

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
        $("img").css("object-fit","cover")
        $("img").css("width", "100%")
        $("img").css("height", "100%")

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
    /*let height_text = $("#"+current_scene + " .text_rec").height()
    $("#"+current_scene + " .text_rec").css("top", height_body - height_text - 40)*/
}

function process(social_increment, civil_increment, next_scene) {
    current_scene = next_scene
    //alert(String(social_increment) + " " + String(civil_increment) + " " + String(increment))
    social_score += social_increment
    civil_score += civil_increment

    /*document.getElementById("social_score").innerHTML = social_score
    document.getElementById("civil_score").innerHTML = civil_score*/

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
}

function updateText_d2_At_school() {
    if (talked_to_Mona) {
        document.getElementById("d2_At_school_text").innerHTML = "Le lendemain, Julien retourne à l'université. Il croise Mona dans la cour et la salue, il s'arrête un moment pour discuter avec elle. Ensuite, il rejoint un groupe d'amis populaire qui sont en train de jouer au basket. Ses amis l'invite à jouer un match avec eux. Julien accepte, mais l'entraîneur de basket l'arrête et lui dit que pour jouer au basket, et suite à une nouvelle loi, il doit d'abord contracter une assurance santé."
    }
    else {
        document.getElementById("d2_At_school_text").innerHTML = "Le lendemain, Julien retourne à l'université. Il croise Mona dans la cour, mais préfère l'ignorer comme la dernière fois. Il rejoint un groupe d'amis populaire qui sont en train de jouer au basket. Ses amis l'invite à jouer un match avec eux. Julien accepte, mais l'entraîneur de basket l'arrête et lui dit que pour jouer au basket, et suite à une nouvelle loi, il doit d'abord contracter une assurance santé."
    }
}

function updateText_d2_At_health_insurance() {
    let text = ""
    text += "Après les cours, Julien se rend dans une compagnie d'assurance pour contracter une assurance santé, mais on lui refuse l'assurance pour les raisons suivantes :<br /><br />"

    if (dna_stored) {
        text += "  - L'ADN que Julien avait envoyé précédemment indique des probabilités de maladie supérieures à la moyenne.<br />"
    }
    else {
        text += "  - Aucune donnée sur l'ADN de Julien, mais l'ADN des parents indique des probabilités de maladie supérieures à la moyenne, Julien est donc à risque.<br />"
    }

    if (fidelity_card) {
        text += "  - Les données récoltées à partir du compte client que Julien avait créé pour obtenir sa carte de fidélité indiquent qu'il a acheté des aliments qui sont mauvais pour la santé. <br />"
    }
    else {
        text += "  - Aucune donnée sur les aliments que Julien achète.<br />"
    }

    if (ran) {
        text += "  - Les données récoltées à partir de l'application que Julien avait utilisé pour aller courir indiquent que ses performances sont assez faibles. Le rythme cardiaque était également particulièrement élevé lors de la course, indicateur de mauvaise santé physique.<br />"
    }
    else {
        text += "  - Les données récoltées à partir du GPS du téléphone de Julien indiquent qu'il se déplace peu, et donc qu'il fait très peu de sport.<br />"
    }

    text += "<br />L'assureur dit à Julien que si il souhaite vraiment obtenir une assurance santé, alors le prix sera nettement plus élevé à cause des facteurs de risque. Julien est révolté, il n'est pas capable de payer une telle somme. Il s'énerve sur le vendeur en criant que c'est complètement stupide puisqu'il veut se faire assurer justement pour faire du basket, ce qui serait certainement bon pour sa santé. La colère de Julien est enregistrée par une caméra de surveillance qui se trouve à l'intérieur de la pièce."
    document.getElementById("d2_At_health_insurance_text").innerHTML = text
}

function updateText_d2_Way_back_home() {
    let text = "Julien finit par sortir du bâtiment de la compagnie d'assurance. Il n'a pas pu se faire assurer et espère qu'il y aura une possibilité de jouer au basket malgré tout. Il se dirige vers la station de métro pour rentrer chez lui. "
    if (civil_score < 2) {
        text+= "Malheureusement, son score civil est trop bas, et lors du contrôle par reconnaissance faciale, le système lui interdit l'accès au métro. Les écarts de conduite de Julien, comme le fait de traverser un passage piéton alors que le feu est rouge, ou encore de s'être énerver contre l'agent de la compagnie d'assurance, a certainement dû contribuer à ce mauvais score. Décidément, c'est une très mauvaise journée pour Julien qui est alors forcé de rentrer chez lui à pied."
    }
    else {
        text+= "Il se fait contrôler par le système de reconnaissance faciale, mais avant de pouvoir passer, le système avertit Julien que son score civil est très bas, et que si il continue à descendre, l'accès aux systèmes de transport en commun lui sera refusé. Julien se dit que c'est peut-être dû au fait qu'il a traversé un passage piéton alors que le feu était au rouge."
    }
    document.getElementById("d2_Way_back_home_text").innerHTML = text
}

function updateText_d2_At_home() {
    let text = "Le soir, comme à son habitude, Julien joue à des jeux de réflexion sur son smartphone. "
    if (stopped_when_Mona_sad) {
        text+= "Il reçoit alors un message d'un ami de l'université qui l'a vu avec Mona et qui lui demande pourquoi il perd son temps avec une fille comme ça. Julien est assez surpris, pour lui ça n'a aucune importance de savoir avec qui il parle."
    }
    document.getElementById("d2_At_home_text").innerHTML = text
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
