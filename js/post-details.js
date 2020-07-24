/* global NexT, CONFIG */

$(document).ready(function() {

  function initScrollSpy() {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        // Scrolling to center active TOC element if TOC content is taller then viewport.
        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });
  }

  initScrollSpy();
});

$(document).ready(function() {
  var TAB_ANIMATE_DURATION = 200;

  $('.sidebar-nav li').on('click', function() {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function() {
      currentTarget.hide();
      target
        .stop()
        .css({'opacity': 0, 'display': 'block'})
        .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function() {
          currentTarget.removeClass(activePanelClassName);
          target.addClass(activePanelClassName);
        });
    });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  // TOC item animation navigate & prevent #item selector in adress bar.
  $('.post-toc a').on('click', function(e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    $('html, body').stop().animate({
      scrollTop: offset
    }, 500);
  });

  // Expand sidebar on post detail page by default, when post has a toc.
  var $tocContent = $('.post-toc-content');
  var display = CONFIG.page.sidebar;
  if (typeof display !== 'boolean') {
    // There's no definition sidebar in the page front-matter
    var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post'
     || CONFIG.sidebar.display === 'always';
    var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
    display = isSidebarCouldDisplay && hasTOC;
  }
  if (display) {
    CONFIG.motion.enable
      ? NexT.motion.middleWares.sidebar = function() {
        NexT.utils.displaySidebar();
      }
      : NexT.utils.displaySidebar();
  }
});
//----自定义js----------------
function createImgEventFullScreen() {
  var imgs = $(".post-body").find("img");
  console.log(imgs);
  for(var i = 0;i < imgs.length;i++) {
    // $(imgs[i]).click(createCover(imgs[i]));
    imgs[i].onclick= function(e) {
      var src = e.srcElement.currentSrc;
      createCover(src)
    }
  }
  function createCover (src) {
    console.log(src);
    var cover = $("<div id='fullScreenCover' class='zhao-cover-img-container'><img class='zhao-cover-img' src='"+src+"'/></div>");
    $("#fullScreenCover").remove();
    $("body").append(cover);
    $("body").addClass("zhao-no-scroll");
    $("#fullScreenCover").click(function(){
      $("#fullScreenCover").remove();
      $("body").removeClass("zhao-no-scroll");
    })
  }
}
setTimeout(function(){
  createImgEventFullScreen();
},1000)