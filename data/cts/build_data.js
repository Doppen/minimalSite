const fs = require("fs-extra");
let markdown = require("markdown").markdown;

const myArgs = process.argv.slice(2);
const projct = myArgs[0];

let ctsStructure = require("../../data/cts/cts_structure.json");
const ctsForms = require("../../data/cts/cts_formfields.json");
let ctsPages = require("../../data/cts/cts_pages.json");
let ctsApplications = require("../../data/cts/applicationList.json");
// handel structure
ctsStructure.forEach((struct, i) => {
  if (struct.type == 'q') {
    struct.typeQ = true
    ctsForms.forEach((formItem, j) => {
      if (struct.nr == formItem.nr ) {
        let opts = formItem.options.split('|')
        struct.formItems = opts
      }
    });
  }
  if (struct.type == 'h1') {
    struct.typeH1 = true
  }
  if (struct.type == 'h2') {
    struct.typeH2 = true
  }
});


// all pages
ctsPages.forEach((item, i) => {
  item.appForms = ctsStructure
  item.applicationlist = ctsApplications

  // filename
  let fileName = ''
  if (item.file_name === undefined) {
    item.file_name = saveName(item.title)+'.html'
  }

  item.project = projct
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
