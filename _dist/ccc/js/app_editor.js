
function jsonInEditor() {
  console.log(workingPages);

  let out = '';
  let pages = workingPages;

  for (var i = 0; i < pages.length; i++) {
    out += '<li onclick="loadPageData(\''+pages[i].id+'\')">'+pages[i].title+'</li>';
  }

  document.getElementById('nav').innerHTML = '<ul>'+out+'<ul>'
}




function loadPageData(id) {
  let pageData = getDatabyId(id);
  let keys = Object.keys(pageData);
  for (let i = 0; i < keys.length; i++) {
    let val = pageData[keys[i]];
    document.getElementById('frm_'+keys[i] ).value = val;
  }

}



function storePages() {

  id = document.getElementById('frm_id').value
  let cIndex = 10;
  for (var i = 0; i < workingPages.length; i++){
    if (workingPages[i].id == id){
      cIndex = i;
    }
  }
  workingPages[cIndex] = {
      "id": id,
      "file_name": document.getElementById('frm_file_name').value,
      "template": document.getElementById('frm_template').value,
      "title": document.getElementById('frm_title').value
  }
  document.getElementById('sendContent').innerHTML = JSON.stringify(workingPages);
  document.getElementById('storeForm').submit();
  //jsonInEditor();
}


function addNewPage() {
  workingPages.push({
      "id": uniqueGenerator(),
      "file_name": "",
      "template": "",
      "title": "_new page_"
  })
  console.log(workingPages);
  jsonInEditor();
}



function getDatabyId(id) {
  let out = [];
  for (var i = 0; i < workingPages.length; i++){
    if (workingPages[i].id == id){
      out = workingPages[i];
    }
  }
  return out;

}




function uniqueGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4());
}
