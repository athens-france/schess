
dragElement(document.getElementById("test"));

function dragElement(Element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(Element.id + "header")) {
        // if present, header is where i move the div from
        document.getElementById(Element.id + "header").onmousedown = dragMouseDown;

    } else {
        // just move it from anywhere else
        Element.onmousedown = dragMouseDown
    }

    function dragMouseDown(e) {
        e = e || window.Event; // cross browser compatiblity.
        // e holds all of the properties of the event on click
        // however, old browsers just cant fucking do it, so we have to consider the disabled
        e.preventDefault(); // mouse at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag; // calls functions
    }

    function elementDrag(e) {
        e = e || window.Event;
        e.preventDefault();
        //new cursor pos
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        Element.style.top = (Element.offsetTop - pos2) + "px";
        Element.style.left = (Element.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null; //stop!
    }
}

