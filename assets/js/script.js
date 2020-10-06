function screenSliderBlurred(next) {
  $('*[data-js-slick-screen-2]').find('*[data-js-slick-screen-blurred]').each(function(){

    let y = $(this).offset().top - $('*[data-js-slick-screen-1]').offset().top
    let x = $(this).offset().left - $('*[data-js-slick-screen-1]').offset().left
     
    //use img from next slide
    if ( next==1 ) {
      if ( $('*[data-js-slick-screen-1]').find('.slick-current').next('.slick-slide').length ) {
        $(this).css('background', 'url('+$('*[data-js-slick-screen-1]').find('.slick-slide.slick-current + .slick-slide').find('img').attr('src')+') -'+x+'px -'+y+'px no-repeat')
      } else {
        $(this).css('background', 'url('+$('*[data-js-slick-screen-1]').find('.slick-slide:first').find('img').attr('src')+') -'+x+'px -'+y+'px no-repeat')
      }
    } else {
    //use img from this slide
      $(this).css('background', 'url('+$('*[data-js-slick-screen-1]').find('.slick-slide.slick-current').find('img').attr('src')+') -'+x+'px -'+y+'px no-repeat')
    }
  })
}

function slickTabIndexFix() {
  $('*[data-js-slick-screen-2]').find('.slick-slide').attr('tabindex', 0)
}

$(document).ready(function(){

    //scroll to header
    if ( $('#data-js-loading-scroll-anchor').length ) {
      $("html, body").animate({ scrollTop: $('#data-js-loading-scroll-anchor').offset().top }, 500);
    }
    
    // search open/close
    $('#searchOpenBtn').click(function(){
       $('.header-blue__search').addClass('header-blue__search_opened')
       $('#searchInput, #searchCloseBtn').focus().attr('tabindex', 0)
       $('#searchOpenBtn').attr('tabindex', -1)
    })
    $('#searchCloseBtn').click(function(){
       $(this).blur()
       $('.header-blue__search').removeClass('header-blue__search_opened')
       $('#searchInput').val('')
       $('#searchInput, #searchCloseBtn').attr('tabindex', -1)
       $('#searchOpenBtn').attr('tabindex', 0)
    })

    //dropdown trigger
    $('*[data-js-dropdown-trigger]').click(function(e){
       let trigger = 'data-js-dropdown-trigger'
       let menu = 'data-js-dropdown-menu'
       if ( $(this).attr(''+trigger+'')=='active' ) {
         $(this).attr(''+trigger+'', '')
       } else {
         $(this).attr(''+trigger+'', 'active')
       }
       $(this).parent().find('*['+menu+']').attr(''+menu+'', function(){
          if ( $(this).attr(''+menu+'')=='opened' ) {
            $(this).attr(''+menu+'', '').fadeOut(0)
          } else {
            $(this).attr(''+menu+'', 'opened').fadeIn(0)
            $(this).css('height', ''+$(this).children().children().outerHeight()+'px')
          }
       })
       return false
    })

    //slick init
    $('*[data-js-slick-screen-1]').slick({
      asNavFor: '*[data-js-slick-screen-2]',
      arrows: false,
      fade: true,
      accessibility: false,
      
      autoplaySpeed: 5000
    })
    $('*[data-js-slick-screen-2]').slick({
      slidesToShow: 4,
      asNavFor: '*[data-js-slick-screen-1]',
      focusOnSelect: true,
    })
    $('*[data-js-slick-page-1]').slick({
      asNavFor: '[data-js-slick-page-2]',
      prevArrow: '#pageSliderPrev',
      nextArrow: '#pageSliderNext',
      autoplay: true,
      accessibility: false,
      autoplaySpeed: 15000,
      dots: true
    })
    $('*[data-js-slick-page-2]').slick({
      asNavFor: '*[data-js-slick-page-1]',
      fade: true,
      accessibility: false,
      arrows: false
    })


    //slick-screen blurred bg copy & position on click
    $('*[data-js-slick-screen-2]').click(function(){
      screenSliderBlurred(0)
      setTimeout(slickTabIndexFix, 750)
    })
    if ( $('*[data-js-slick-screen-1]').length && $('*[data-js-slick-screen-2]').length ) {
      screenSliderBlurred(0)
    }
    //slick-screen blurred bg copy & position on auto-play
    $('*[data-js-slick-screen-2]').on("beforeChange", function (){
      screenSliderBlurred(1)
      setTimeout(slickTabIndexFix, 750)
    })

    //tab select
    if ( $('*[data-js-tab-container]').length && $('*[data-js-tab-select]').length && $('*[data-js-tab-content]').length ) {

      $('*[data-js-tab-content]').fadeOut(0); $('*[data-js-tab-content=1]').fadeIn(0) //show first content only
      $('*[data-js-tab-select=1]').addClass('is-active').attr('tabindex', -1) //active first select
  
      $('*[data-js-tab-select]').click(function(){
        $('*[data-js-tab-container] *').removeClass('is-active'); $('*[data-js-tab-content]').fadeOut(0) //disable all
        
        $('*[data-js-tab-select]').attr('tabindex', '') //make all selects focusable
        $(this)
          .attr('tabindex', -1) //make current select unfocusable
          .addClass('is-active') //add active class
          .blur() //remove focus by TAB
          .parents('*[data-js-tab-container]')
          .find('*[data-js-tab-content='+$(this).attr('data-js-tab-select')+']').addClass('is-active').fadeIn(250) //show current content
        return false //disable link event
      })

    }
    
})