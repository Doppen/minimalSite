let panelOpen = false;

function handlePanel() {

  if (panelOpen) {
    document.getElementById('panel_display').style.width = '100%';
    document.getElementById('panel_edit').style.width = '0px';
    panelOpen = false
  } else {
    document.getElementById('panel_display').style.width = 'calc(100% - 500px )'
    document.getElementById('panel_edit').style.width = '500px';
    panelOpen = true
  }

}


function handleBlockItem() {
  removeClass()
  if (!panelOpen) {
    handlePanel()
  }
  console.log('==',this.parentElement);
  this.classList.add('block_item--active');


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

//https://maritiemportal.nl/wp-content/uploads/2016/09/Thurmbnail_Huygens.png
