
header2Navigation('ccc_main_content', 'pageContentList', false);

function header2Navigation(contentId, navId, asList) {
  let preBlock = '<span class="ccc_pageContentLabel">Page content</span>';
  let postBlock = '';
  let preItem = '';
  let postItem = '';

  if (asList) {
    preBlock = '<ul>';
    postBlock = '</ul>';
    preItem = '<li>';
    postItem = '</li>';

  }


  let contentElem = document.getElementById(contentId);

  // get all headers 2 and 3.
  var elems = contentElem.querySelectorAll('h2,h3');

  // adb anchor link to each header
  for (var i = 0; i < elems.length; i++) {
      var hId = elems[i].getAttribute( 'id' );
      document.body.innerHTML = document.body.innerHTML.replace('<h2 id="'+hId, '<a id="l'+hId+'"></a><h2 id="'+hId);
  }


  // Generate a navigation list
  var headerNavigation = '';
  var linkClass = '';
  for (var i = 0; i < elems.length; i++) {
      linkClass = '';
      var hId = elems[i].getAttribute( 'id' );
      var hTxt = elems[i].innerText;
      var hTag = elems[i].tagName;

      // distinct subnav
      if (hTag == 'H3') {
        linkClass= 'subNav';
      }

      headerNavigation += preItem+'<a href="#l'+hId+'" class="'+linkClass+'">'+hTxt+'</a>'+postItem;
  }

  document.getElementById(navId).innerHTML += preBlock+headerNavigation+postBlock;
}
