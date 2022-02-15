module.exports = function(publishFolder, indexPage, port) {

  if(typeof publishFolder === "undefined") {
    publishFolder = './_dist';
    }

  if(typeof indexPage === "undefined") {
    indexPage = 'index.html'
    }

  if(typeof port === "undefined") {
    port = 4000;
    }



  var path = require('path');
  var http = require('http');
  var fs = require('fs');
  const { parse } = require('querystring');

  var dir = path.join(__dirname, publishFolder);

  var mime = {
      html: 'text/html',
      txt: 'text/plain',
      css: 'text/css',
      gif: 'image/gif',
      jpg: 'image/jpeg',
      png: 'image/png',
      svg: 'image/svg+xml',
      js: 'application/javascript'
  };

  var server = http.createServer(function (req, res) {
      var reqpath = req.url.toString().split('?')[0];





      if (req.method !== 'GET') {
        // if POST
        if (req.method === 'POST') {
          console.log('post');
            collectRequestData(req, result => {
                // use form with input name content and type
                //writeFile(result.content, 'test.'+result.type)
                writeFile(result.content, './test.txt')
            });
        } else {
          res.statusCode = 501;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Method not implemented');
        }

      }
      var file = path.join(dir, reqpath.replace(/\/$/, '/'+indexPage));
      if (file.indexOf(dir + path.sep) !== 0) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Forbidden');
      }
      var type = mime[path.extname(file).slice(1)] || 'text/plain';
      var s = fs.createReadStream(file);
      s.on('open', function () {
          res.setHeader('Content-Type', type);
          s.pipe(res);
      });
      s.on('error', function () {
          res.setHeader('Content-Type', 'text/plain');
          res.statusCode = 404;
          res.end('Not found');
      });
  });

  server.listen(port, function () {
      console.log('Listening on http://localhost:'+port);
  });




  // handle POST data
  function collectRequestData(request, callback) {
      const FORM_URLENCODED = 'application/x-www-form-urlencoded';
      if(request.headers['content-type'] === FORM_URLENCODED) {
          let body = '';
          request.on('data', chunk => {
              body += chunk.toString();
          });
          request.on('end', () => {
              callback(parse(body));
          });
      }
      else {
          callback(null);
      }
  }





  // write the file
  function writeFile(contentFile, path) {
    fs.writeFile(path, contentFile, function (err) {
    if (err) throw err;
    console.log('_saved file: '+path);
  });
  }




};
