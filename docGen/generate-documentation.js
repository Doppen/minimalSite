const config = require("./generate-documentation-config.json");
const fs = require('fs');


const allfolders = config.folders;






// list all files in all folders from the config file and return a list (array)
const getFileList = new Promise((resolve, reject) => {

  let allFilesArr = [];
  allfolders.forEach((folderName) => {
    fs.readdir(folderName, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          if (fs.lstatSync(folderName+'/'+file).isDirectory()) {

          }
          else {
            allFilesArr.push(folderName+'/'+file)
          }
        })
      }
      resolve(allFilesArr);
    })

  });
});


function throughFolder(foldername) {
  files.forEach(file => {
    if (fs.lstatSync(folderName+'/'+file).isDirectory()) {
      throughFolder(folderName+'/'+file+'/')
    }
    else {
      allFilesArr.push(folderName+'/'+file)
    }
  })
}



// go through each file and get the content. Return
const getFileContent = (fileArr) => {
  let allContentArr = [];
    return new Promise((resolve, reject) => {

      fileArr.forEach((filePath, i) => {
        fs.readFile(filePath, 'utf8', function(err, data){

          allContentArr.push({
            file:filePath,
            content:extractComments(data)
          }
          );
          if (allContentArr.length == fileArr.length)  {
            resolve(allContentArr);
          }
        });
      });
    });
}



const writeOut = (out) => {
  writeFile(config.output_file, JSON.stringify(out))
}

// execute the chain
getFileList
.then(getFileContent)
.then(organiseComments)
.then(writeOut)


// write a file
function writeFile(pathName, content) {
  fs.writeFile(pathName, content, err => {
    if (err) {
      console.error(err);
    }
  });
}

// extract comments from  page.
function extractComments(page) {


  let out = [];
  let contentArr = page.split('\n');

  // each line
  contentArr.forEach((line) => {
    if (line.substr(0,2)=='//') {
      out.push(line);
    }
  })
  return out
}




// into objects per item
function organiseComments(data) {

  let commentItems = []
  let docItem = {docTitle:"", docDescrip:"", docExample:"", docSource: "", docCat:"" }

  data.forEach((file, i) => {
    docItem.docSource = data.file;

    // through each line
    file.content.forEach((line, i) => {


      // catch title
      if (line.substr(0,3)=='//t') {
        docItem.docTitle = line.replace('//t ', '');
      }

      // catch description
      if (line.substr(0,3)=='//d') {
        if (docItem.docDescrip == '') {
          docItem.docDescrip = line.replace('//d ', '');
        } else {
          docItem.docDescrip += ' \n '+line.replace('//d ', '');
        }
      }

      // catch example
      if (line.substr(0,3)=='//e') {
        if (docItem.docExample == '') {
          docItem.docExample = line.replace('//e ', '');
        } else {
          docItem.docExample += ' \n '+line.replace('//e ', '');
        }
      }

      if (line.substr(0,3)=='//c') {
        docItem.docCat = line.replace('//c ', '');
      }



      if (line.substr(0,3)=='//|') {
        commentItems.push(docItem);
        docItem = {docTitle:"", docDescrip:"", docExample:"", docSource: "", docCat:"" }
      }


    });

  });


  return commentItems;

}
