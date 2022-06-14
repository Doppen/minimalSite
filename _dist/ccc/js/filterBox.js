let filBoxStat = false;

function handleFilterbox() {

  if (filBoxStat) {
    document.getElementById('optionBox').style.height = 0+'px';
    document.getElementById('rotateIcon').style.transform = 'rotate(0deg)';
    filBoxStat = false
  }else {

    document.getElementById('optionBox').style.height = 300+'px';
    document.getElementById('rotateIcon').style.transform = 'rotate(180deg)';
    filBoxStat = true
  }
}
