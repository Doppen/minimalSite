let popupUP = false;


let elements = document.getElementsByClassName("footnote-link");


for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handleNotes, false);
    elements[i].removeAttribute('href');
}




function handleNotes() {
  popupState()

  let elemId = this.id

  let noteNr = document.getElementById(elemId).innerHTML
  let newId = elemId.replace('identifier_', 'footnote_')

  let newContent = document.getElementById(newId).innerHTML
  newContent = newContent.replace('identifier_', 'footnote_')
  let noteNrTxt = '<strong>Note '+noteNr+'</strong><br>'
  let closeButton = '<button onclick="popupState()" id="closeNote">X</button>'

  document.getElementById("notesPopInner").innerHTML = closeButton+noteNrTxt+newContent
}



function popupState() {

  if (popupUP) {
    document.getElementById("notePop").style.bottom = '-400px'
    popupUP = false
  }else {
    document.getElementById("notePop").style.bottom = '0px'
    popupUP = true
  }
}
