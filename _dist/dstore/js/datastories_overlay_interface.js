let panelOpen = true;


let box = document.getElementById('panel_edit');
let bheight = box.offsetHeight;
let tabHeight = 50

handlePanel()

function handlePanel() {

  if (panelOpen) {
    // close
    document.getElementById('panel_edit').style.bottom = 0- bheight+tabHeight+'px';
    document.getElementById('panelHandleButton').innerHTML='<img src="images/icons/icon-arrow-down.svg" alt="">'
    panelOpen = false
  } else {
    // open
    document.getElementById('panel_edit').style.bottom = 0+'px';
    document.getElementById('panelHandleButton').innerHTML='<img src="images/icons/icon-arrow-up.svg" alt="">'
    panelOpen = true
  }

}


function handleBlockItem() {
  removeClass()
  if (!panelOpen) {
    handlePanel()
  }
  this.parentElement.parentElement.classList.add('dsBlock--active');

  //console.log(this);
//block_item--active
}




let elements = document.getElementsByClassName("block_event");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handleBlockItem, false);
}


function removeClass() {
  let elements = document.getElementsByClassName("dsBlock--active");
  for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('dsBlock--active');
  }
}


function removeFocusFromBlock() {
  removeClass()
  handlePanel()
}




// new newMenu


const newButtons = document.getElementsByClassName("newBlockHandler");

for (var i = 0; i < newButtons.length; i++) {
    newButtons[i].addEventListener('click', function handleClick(event) {
      console.log(this);
      this.parentElement.parentElement.parentElement.querySelector('.newContent').style.display = 'flex';
    });
}
