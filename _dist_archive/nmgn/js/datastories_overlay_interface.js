let panelOpen = true;


let box = document.getElementById('panel_edit');
let bheight = box.offsetHeight;
let tabHeight = 50

handlePanel()

function handlePanel() {

  if (panelOpen) {
    // close
    document.getElementById('panel_edit').style.bottom = 0- bheight+tabHeight+'px';
    document.getElementById('panelHandleButton').innerHTML='&#128316;'
    panelOpen = false
  } else {
    // open
    document.getElementById('panel_edit').style.bottom = 0+'px';
    document.getElementById('panelHandleButton').innerHTML='&#128317;'
    panelOpen = true
  }

}


function handleBlockItem() {
  removeClass()
  if (!panelOpen) {
    handlePanel()
  }
  this.classList.add('block_item--active');

  //console.log(this);
//block_item--active
}




let elements = document.getElementsByClassName("block_item");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handleBlockItem, false);
}


function removeClass() {
  let elements = document.getElementsByClassName("block_item");
  for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('block_item--active');
  }
}


function removeFocusFromBlock() {
  removeClass()
  handlePanel()
}




// new newMenu


const newButtons = document.getElementsByClassName("newBlockButton");
for (var i = 0; i < newButtons.length; i++) {
    newButtons[i].addEventListener('click', function handleClick(event) {
      this.parentElement.querySelector('.newMenu').style.height = '180px';
    });
}
