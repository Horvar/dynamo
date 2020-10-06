$('*').keypress(function (e) {
    let key = e.which;
    if(key == 13)  // the enter key code
    {
      $(this).click();
      return false;  
    }
 });  