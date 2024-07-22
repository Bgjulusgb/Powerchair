
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.defaults({ease:"none", duration: 2});


var header_height = 100;


// --- disable auto anchor jump
if (location.hash) {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 1);
}


function update_header_properties () {
  header_height = jQuery("header.header-main").height();
  jQuery('.position-sticky-under-header').each(function (i, e) { 
    e.style.top = header_height + 'px';
  });
}


// ------------------------------ bootstrap nav multiple dropdowns toggle

var collapseElementList = [].slice.call(document.querySelectorAll('#nav-main .dropdown-container.collapse'))
var collapseList = collapseElementList.map(function (collapseEl) {
    collapseEl.addEventListener('show.bs.collapse', function (el) {

        if (jQuery('nav#nav-main').hasClass('dropwdown-open')) {
            // --- another dropdown is open
            collapseList.forEach((aCollapse) => {
                aCollapse.hide();
            });
        } else {
            // --- nothing is open
            jQuery('nav#nav-main').addClass('dropwdown-open');
            jQuery('.nav-dropdown-open-underlay').removeClass('d-none');
        }
    });

    collapseEl.addEventListener('hidden.bs.collapse', function (el) {
        var noDrowpdownOpen = true;
        collapseElementList.forEach((aCollapseEl) => {
            if (aCollapseEl.classList.contains('collapsing')) {
                noDrowpdownOpen = false;
            }
        });
        if (noDrowpdownOpen) {
            jQuery('.nav-dropdown-open-underlay').addClass('d-none');
            jQuery('nav#nav-main').removeClass('dropwdown-open');
        }

    });
    return new bootstrap.Collapse(collapseEl, {toggle:false})
})




jQuery(document).ready(function () {


    // ------ close nav on click dropdown-underlay
    jQuery('.nav-dropdown-open-underlay').click(function () {
        collapseList.forEach((aCollapse) => {
            aCollapse.hide();
        });
    });



  var SVGWrapper = document.querySelectorAll('.svg-wrapper-vertical')

  SVGWrapper.forEach(function (e, i) {
    var mySVG = e.querySelector('svg')
    mySVG.removeAttribute('width')
    mySVG.removeAttribute('height')
    mySVG.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    //mySVG.setAttribute('preserveAspectRatio', 'none')
    var box = mySVG.viewBox.baseVal
    var aspectRatio = box.width / box.height
    //aspectRatio = box.offsetWidth / box.offsetHeight

    //var nWidth = aspectRatio * e.height;
    var nWidth = aspectRatio * e.clientHeight;

    //var nWidth = aspectRatio * e.offsetHeight;
    //var nWidth = aspectRatio * e.innerHeight;
    e.style.width = nWidth + 'px';

    //console.log("svg wrapper", mySVG, nWidth, e.style);
    //console.log("svg wrapper", mySVG, nWidth, e.offsetHeight);
  });


  // force smooth scroll on page-load with anchor
  if (location.hash) {
    gsap.to(window, {duration: 0, scrollTo: {y: 0, offsetY:0}, onComplete: function () {
      var targetHash = jQuery(location.hash)
      scrollSmooth(location.hash);
    }});
  }

  // ---- .anchor-link did trigger twice
  // jQuery('nav a.anchor-link').click(function (e) {
  //   if (jQuery('body').hasClass('scroll-page')) {
  //     e.preventDefault();
  //     var url = jQuery(this).attr('href');
  //     if (typeof url !== 'undefined') {
  //       var location = url.substring(url.indexOf("#")+1);
  //       scrollSmooth('#'+location);
  //     }
  //   }
  // });
  
  jQuery('.anchor-link').click(function (e) {
      e.preventDefault();
      var url = jQuery(this).attr('href');
      if (typeof url !== 'undefined') {
        var location = url.substring(url.indexOf("#")+1);
        scrollSmooth('#'+location);
      }
  });



});



jQuery(window).resize(function() {
  update_header_properties();
});




// ------------------------------------- scrollSmooth
function scrollSmooth (target) {
  //var mainNav = jQuery('nav.navbar');
  var mainNav = jQuery('header.header-main');
  var anchorNav = jQuery('.anchor-navigation');
  //console.log(mainNav.outerHeight(), mainNav);
  autoScroll = true;
  var myOffset = mainNav.outerHeight() + anchorNav.outerHeight();
  gsap.to(window, {duration: 2, scrollTo: {y: target, offsetY:myOffset}, ease: "power2", onComplete: function () {
    autoScroll = false;
    //console.log('scroll done');
  }});
}
