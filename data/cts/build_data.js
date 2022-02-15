const fs = require("fs-extra");
let markdown = require("markdown").markdown;

let ctsStructure = require("../../data/cts/cts_structure.json");
const ctsForms = require("../../data/cts/cts_formfields.json");
let ctsPages = require("../../data/cts/cts_pages.json");


ctsStructure.forEach((struct, i) => {

  if (struct.type == 'q') {
    ctsForms.forEach((formItem, j) => {
      if (struct.nr == formItem.nr ) {
        let opts = formItem.options.split('|')
        struct.formItems = opts
      }

    });
  }
});

ctsPages.forEach((item, i) => {
  item.appForms = ctsStructure

  // filename
  let fileName = ''
  if (item.file_name === undefined) {
    item.file_name = saveName(item.title)
  }
});





createFile('data/cts/site.json', JSON.stringify(ctsPages))





function createFile(fileName, content) {
  fs.writeFile(fileName, content, function (err) {
    if (err) throw err;
  });
}


function saveName(str) {
  str = str.replaceAll(' ','-')
  str = str.replaceAll('&','')
  return str
}
