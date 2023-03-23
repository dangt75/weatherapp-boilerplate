function navOpen(){
    document.getElementById("openbutton").style.transition = "0.2s";
    document.getElementById("openbutton").style.transitionDelay = "0s";
    document.getElementById("sidebar").style.width = "15em";
    document.getElementById("openbutton").style.color = "rgba(0,0,0,0)";
}

function navClose(){
    document.getElementById("openbutton").style.transition = "0.3s";
    document.getElementById("openbutton").style.transitionDelay = "0.2s";
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("openbutton").style.color = "rgba(0,0,0,1)";
}

function locDropdown() {
    var locs = document.getElementById("locations");
    if (locs.style.maxHeight) {
        locs.style.maxHeight = null;
    }
    else {
        locs.style.maxHeight = locs.scrollHeight + "px";
    }
}
  