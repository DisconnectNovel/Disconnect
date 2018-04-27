
// Warn the user when he leave or refresh the page, because in this case
// he will leave the game.

if (localStorage.getItem("warn_before_leaving_page") ==  "true") {
    go_to_page("../index.html")
}

localStorage.setItem("warn_before_leaving_page", "true")

// Warning before leaving the page (back button, or outgoinglink)
window.onbeforeunload = function() {
  if (localStorage.getItem("warn_before_leaving_page") == "true") {
      return "Do you really want to leave the game ?";
  }
  return;
};
