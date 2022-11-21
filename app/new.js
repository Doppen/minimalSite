const fs = require('fs');

let projectName = process.argv[2]
console.log('projectName',projectName);


createDir('./data/'+projectName)
createDir('./src/components/'+projectName)
createDir('./src/images/custom/'+projectName)
createDir('./src/scss/custom/'+projectName)
createDir('./src/templates/'+projectName)



function createDir(dirName) {
  if (!fs.existsSync(dirName)){
      fs.mkdirSync(dirName);
  }
}


let jsonFile = `[
  {
    "id": "qertfgrerwert45",
    "template": "${projectName}/${projectName}-default.html",
    "title": "${projectName} volg",
    "states": {
      "hasLoggedIn": false
    },
    "project": "${projectName}",
    "file_name": "${projectName}-default.html"
  }
]`;


let templateFile = `{{> html-header}}

{{!-- > ${projectName}/comp_name --}}



{{> html-footer}}`;


let scssFile = `
`;


let cssFile = `@use 'abstracts' as *;
@use 'basics/normalise';
@use 'basics/pageDefault';
@use 'basics/typo';
// @use 'basics/colors';
// @use 'utillities/utilities';
// @use 'utillities/flexbox';
// @use 'basics/margin-padding';
// @use 'basics/nav';
// @use 'basics/lists';
// @use 'basics/icons';
// @use 'min-a11y-style';
// @use 'form/_buttons';
// @use 'form/_form';
// @use 'layout/layout_3col-vertNav';
// @use 'custom/${projectName}/_file_name';
`;



createFile('./data/'+projectName+'/site.json', jsonFile)
createFile('./src/templates/'+projectName+'/'+projectName+'-default.html', templateFile)
createFile('./src/scss/'+projectName+'-style.scss', cssFile)



function createFile(fileName, content) {
  fs.writeFile(fileName, content, function (err) {
    if (err) throw err;
    console.log(fileName+' is created successfully.');
  });
}
