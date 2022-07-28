hideTabs(1);

function handleTabs(tabId) {
  hideTabs()
  document.getElementById(tabId).style.display = 'block';
  document.getElementById('b'+tabId).classList.add("activeTab");
}



function hideTabs(start) {
  let iStart = 0
  if (Number.isInteger(start)) {
    iStart = 1
  }
  const alltabs = document.querySelectorAll(".tabContent");
  for (i = iStart; i < alltabs.length; i++) {
    alltabs[i].style.display = 'none';
  }

  const allbuttons = document.querySelectorAll(".tabButton");
  for (j = iStart; j < allbuttons.length; j++) {
    allbuttons[j].classList.remove("activeTab");;
  }
}
