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
  $('*[data-js-slick-screen-2]').find('.slick-slide').attr('tabindex', 0).find('a').attr('tabindex', -1)
}

function dropdownHeight(){
  $('[data-js-dropdown-hover]').each(function(){
    $(this).find('*[data-js-dropdown-menu]').height( $(this).find('.dropdown__menu').outerHeight() )
  })
}

function dropdownOn(target, that) {
  $(that).attr(target, 'active') //set active
}

function dropdownOff(target, that) {
  $(that).attr(target, '') //set inactive
}

function dropdownToggle(target, that) {
  if ( $(that).attr(target) == 'active' ) {
    dropdownOff(target, that)
  } else {
    dropdownOn(target, that)
  }
}

$(document).ready(function(){

  dropdownHeight()

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
  $('[data-js-dropdown-trigger]').click(function(){ //clickable by click
    return false
  })
  $('[data-js-dropdown-click]').click(function(){ //clickable by click
    dropdownToggle('data-js-dropdown-click', this)
  })
  $('[data-js-dropdown-hover]').hover(function(){ //hoverable by hover
    dropdownToggle('data-js-dropdown-hover', this)
  })
  $('[data-js-dropdown-hover], [data-js-dropdown-hover] a').focus(function(){ //enable hoverable by focus
    $(this).parents('[data-js-dropdown-hover]').each(function(){
      dropdownOn('data-js-dropdown-hover', this)
    })
  })
  $('[data-js-dropdown-hover], [data-js-dropdown-hover] a').blur(function(){ //disable hoverable by blur
    $(this).parents('[data-js-dropdown-hover]').each(function(){
      dropdownOff('data-js-dropdown-hover', this)
    })
  })

  //slick init
  $('*[data-js-slick-screen-1]').slick({
    asNavFor: '*[data-js-slick-screen-2]',
    arrows: false,
    fade: true,
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 3000
  })
  $('*[data-js-slick-screen-2]').slick({
    slidesToShow: 4,
    asNavFor: '*[data-js-slick-screen-1]',
    accessibility: false,
    focusOnSelect: true,
  })
  $('*[data-js-slick-page-1]').slick({
    asNavFor: '[data-js-slick-page-2]',
    prevArrow: '#pageSliderPrev',
    nextArrow: '#pageSliderNext',
    autoplay: true,
    accessibility: false,
    autoplaySpeed: 3000,
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
  //slick-screen nav height
  $('*[data-js-slick-screen-2]').each(function(){
    let navHeight = 0
    let maxHeight = 0
    let slide = $(this).find('li')
    let navNumber = slide.length
    for(let i=0; i<navNumber; i++) {
      navHeight = slide.eq(i).outerHeight()
      if ( navHeight>maxHeight ) {
        maxHeight = navHeight
      }
    }
    slide.height(maxHeight) //set slide height by highest slide
  })

  //screen-slider using
  $('*[data-js-slick-screen-2] li').hover(function(){
    $(this).click()
  })
  $('*[data-js-slick-screen-2] li').focus(function(){
    $(this).click()
  })
  $('*[data-js-slick-screen-2] li').on('keypress',function(e) {
    if (e.which == 13) {
      window.location.href = $(this).find('a').attr('href');
    }
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

  //svg number swap
  $('*[data-js-number]').each(function(){
    let length = $(this).text().length
    let number =  $(this).text()
    $(this).text('')
    for (var i=0; i<length; i++) {
      $('<svg><use xlink:href="assets/img/sprites/sprite-numbers.svg#'+number[i]+'"></use></svg>').appendTo(this)
    }
  })

  //close elements by window click
  $(window).click(function(){
    //close search
      $('.header-blue__search').removeClass('header-blue__search_opened')
      $('#searchInput').val('')
      $('#searchInput, #searchCloseBtn').attr('tabindex', -1)
      $('#searchOpenBtn').attr('tabindex', 0)
  })
  $('.header-blue__search').click(function(e){ //prevent closing
    e.stopPropagation();
  })
})