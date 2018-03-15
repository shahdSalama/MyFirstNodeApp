$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
});
if (location.pathname === "/login") {
  $("#login").fadeIn();
}
// send data of sing up form to server
$(function () {
  var form = $("#form-signup");
  form.on("submit", function (event) {
//tmn3 el form naha t7amel
    // event.preventDefault();
    var data = {
      username: $("#form-signup .username").val(),
      email: $("#form-signup .email").val(),
      password: $("#form-signup .password").val()
    };
    $.ajax({
      type: "POST",
      url: "/signup",
      data: data,
      success: function (success) {
        console.log(success);
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});