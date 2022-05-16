const handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
let sass = require("sass");
let markdown = require("markdown").markdown;

const myArgs = process.argv.slice(2);
const projct = myArgs[0];
let sitedata = require('../data/'+projct+'/site.json');
const outputDir = "_dist/";
const outputVersion = 1;
const partialsDir = "./src/components";
const config = require("../config.json");





build();

function build() {
  // clear output folder, then build site
  fs.remove(outputDir)
    .then(createFolder)
    //.then(markdown2Html)
    .then(registerPartials)
    .then(createContentListPage)
    .then(() => {
      createSite();
      fs.copySync("src/images/custom/"+ projct +'/', outputDir +'/'+ projct +'/' + "images/");
      fs.copySync("src/images/icons/" , outputDir +'/'+ projct +'/' + "images/icons/");
      fs.copySync("src/js/", outputDir +'/'+ projct +'/'+ "js/");
      fs.copySync("data/", outputDir + "data/");
    })
    .then(() => {
      setTimeout(function(){
        //fs.copySync(outputDir +'/'+ projct +'/', config.custom.cts.exportPath);
      }, 2000);

    })
    .catch((err) => {
      console.error(err);
    });
}

function createSite() {
  generateHtml();
  createSass('src/scss/'+projct+'-style.scss');
  createSass('src/scss/'+projct+'-style.scss' ,config.project[projct].wp_dir+'/css/'+projct+'-style.scss');
}



// register partials (components) and generate site files
function registerPartials() {
  return new Promise((resolve, reject) => {
    const longPath = path.resolve("./src/components/");
    var walk = function (dir, done) {
      var results = [];
      fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
          file = path.resolve(dir, file);
          fs.stat(file, function (err, stat) {
            // if dir
            if (stat && stat.isDirectory()) {
              walk(file, function (err, res) {
                results = results.concat(res);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file.replace(longPath + "/", ""));
              file = file.replace(longPath + "/", "");

              fs.readFile("src/components/" + file, "utf-8", function (
                error,
                source
              ) {
                handlebars.registerPartial(
                  file.replace(path.extname(file), ""),
                  source
                );
              });
              if (!--pending) done(null, results);
            }
          });
        });
      });
    };

    walk(partialsDir, function (err, results) {
      if (err) throw err;
      setTimeout(() => {
        resolve(results);
      }, 500);
    });
  });
}

// create sass file
function createSass(pathFile, destination) {
  let filename = path.basename(pathFile).replace(path.extname(pathFile), "");
  sass.render(
    {
      file: pathFile,
      outputStyle: "compressed"
    },
    function (err, result) {
      if (err) {
        console.log("Sass error:" + err);
      } else {
        let filename = path
          .basename(pathFile)
          .replace(path.extname(pathFile), "");
          if (destination === undefined) {
            createFile(
              outputDir+'/'+projct + "/css/v" + outputVersion + "/" + filename + ".css",
              result.css.toString()
            );
          } else {
            createFile(
              destination,
              result.css.toString()
            );
          }

      }
    }
  );
}

//prefab pages list on home
function createContentListPage() {
  let pages = []
  sitedata.forEach((item) => {
    pages.push({
      "title": item.title,
      "file_name": item.file_name
    });
  });

  sitedata.push(
    {
      "id": "index",
      "template": "projectPage.html",
      "title": projct+" index page",
      "project": projct,
      "file_name": "index.html",
      "pages_list": pages
    }
  )

}


// generate files
function generateHtml() {
  sitedata.forEach((item) => {
    fs.readFile("src/templates/" + item.template, "utf-8", function (
      error,
      source
    ) {
      var template = handlebars.compile(source);
      var html = template(item);

      createFile(outputDir +'/'+ projct +'/'+ item.file_name, html);

      // wp folder
      if (config.project[projct].wp_dir !== undefined) {
        createFile(config.project[projct].wp_dir +'/'+ config.project[projct].wp_tempfile+'/'+ item.file_name, html);
      }
    });
  });
}

// create new files
function createFile(fileName, content) {
  fs.writeFile(fileName, content, function (err) {
    if (err) throw err;
  });
}

// create folders
function createFolder() {
  fs.mkdirSync(outputDir);
    fs.mkdirSync(outputDir+'/'+projct);
  fs.mkdirSync(outputDir +'/'+projct + "/css");
  fs.mkdirSync(outputDir +'/'+projct + "/css/v" + outputVersion + "/");
}


function saveName(str) {
  str = str.replaceAll(' ','-')
  str = str.replaceAll('&','')
  return str
}
