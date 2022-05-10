let breakpoint = '1300px'

// const allHideOnSmall = document.querySelectorAll(".in_hideOnSmall");
// for (i = 0; i < allHideOnSmall.length; i++) {
// }
//
// const allHideOnBig = document.querySelectorAll(".in_HideOnBig");
// for (i = 0; i < allHideOnBig.length; i++) {
// }




function handleResponsive(isSmallscreen) {

  if (isSmallscreen.matches) { // If media query matches
   console.log('small');
   const allHideOnSmall = document.querySelectorAll(".in_hideOnSmall");
   for (i = 0; i < allHideOnSmall.length; i++) {
     allHideOnSmall[i].style.display = 'none';
   }


  } else {
    console.log('big');
    const allHideOnSmall = document.querySelectorAll(".in_hideOnSmall");
    for (i = 0; i < allHideOnSmall.length; i++) {
      allHideOnSmall[i].style.display = 'block';
    }
  }
}


var isSmallscreen = window.matchMedia('(max-width: '+breakpoint+')')
handleResponsive(isSmallscreen) // Call listener function at run time
isSmallscreen.addListener(handleResponsive) // Attach listener function on state changes
