$(document).ready(function(){


  function scroll(hash) {
    // var hash = location.hash.replace('#','');
    // console.log(hash);
    
    if(hash != ''){
      $('html, body').animate({ scrollTop: $(hash).offset().top-50}, 1000);
    }
  }


  $('.arrow a').on('click', function(e){
    // console.log(this.hash);
    scroll(this.hash);
    e.preventDefault();
    
  });

  function sendContact() {

    $('input[name="zgoda"], input[name="zgoda2"]').click(function(){
      var checkValue = $(this).val();
      $('input[name="'+$(this).attr('name')+'"]').each(function(){
        if($(this).val() == checkValue) {
          $(this).attr("checked", true);
          $(this).prop("checked", true);
        } else {
          $(this).attr("checked", false);
          $(this).prop("checked", false);
        }
      });
    });

    $('#sendContactForm').on("click", function(){
      var name = $('input[name="name"]');
      var phone = $('input[name="phone"]');
      var email = $('input[name="email"]');
      var lokalizacja = $('input[name="lokalizacja"]');
      var zgoda = $('input[name="zgoda"]:checked');
      var zgoda2 = $('input[name="zgoda2"]:checked');

      var urlToSend=String(top.location);
      var err = 0;

      $('#sendContactForm').addClass('loading');

      if(name.val().length <= 2){
        name.addClass('error');
        err = 1;
      } else {
        name.removeClass('error');
      }

      if(phone.val().length <= 2){
        phone.addClass('error');
        err = 1;
      } else {
        phone.removeClass('error');
      }

      if(email.val().length <= 2 || email.val().match(/[\w\d\.-]+@[\w\d]+.[\w\d\.]+/)!=email.val() || email.val() == ""){
        email.addClass('error');
        err = 1;
      } else {
        email.removeClass('error');
      }

      if(lokalizacja.val().length <= 2){
        lokalizacja.addClass('error');
        err = 1;
      } else {
        lokalizacja.removeClass('error');
      }

      if(zgoda2.val() == 'nie2' || zgoda2.val()=='' ||  typeof(zgoda2.val()) == 'undefined'){
        $('input[name="zgoda2"]').parent().parent().addClass('error');
        err = 1;
      } else {
        $('input[name="zgoda2"]').parent().parent().removeClass('error');
      }

      if(zgoda.val() == 'nie' || zgoda.val()=='' ||  typeof(zgoda.val()) == 'undefined'){
        $('input[name="zgoda"]').parent().parent().addClass('error');
        err = 1;
      } else {
        $('input[name="zgoda"]').parent().parent().removeClass('error');
      }

      if(name.val().length >=2 && phone.val().length >=2 && email.val().match(/[\w\d\.-]+@[\w\d]+.[\w\d\.]+/)==email.val() && lokalizacja.val().length >=2 && err == 0 && zgoda2.val()=='tak2' && zgoda.val()=='tak'){
        $('.p-contact__msg').removeClass('error');

        var randomnumber=Math.floor(Math.random()*10001);
           $.ajax({
              url:"/send_form.htm",
              type:'POST',
              data: {
                cache:false,
                async:false,
                name: name.val(),
                email: email.val(),
                phone: phone.val(),
                lokalizacja: lokalizacja.val(),
                urltosend: urlToSend,
                submit: "submit",
                r: randomnumber,
                zgoda: zgoda.val(),
                zgoda2: zgoda2.val(),
              },
              error: function(){
                  alert('Spróbuj ponownie później.');
              },
              beforeSend: function() {
                  //pobieranie danych
                  $('#sendContactForm').addClass('loading');
              },
              success:function(result){
                setTimeout($('#sendContactForm').removeClass('loading'),500);

                var results=$.trim(result);

                if(results == "ok"){
                  $('input[name="name"]').val("");
                  $('input[name="phone"]').val("");
                  $('input[name="email"]').val("");
                  $('input[name="lokalizacja"]').val("");
                  $('input[name="zgoda"]').attr("checked", false);
                  $('input[name="zgoda"]').prop("checked", false);
                  $('input[name="zgoda2"]').attr("checked", false);
                  $('input[name="zgoda2"]').prop("checked", false);
                  $('.p-contact__msg').addClass('success');
                  $('.p-contact__msg').html('Wiadomość został wysłana');
                  
                  gtag('config', 'UA-5968692-26', {
                    'page_title' : 'Formularz wysłany',
                    'page_path': location.href+'/FormularzWyslany'
                  });

                } else {
                  $('.p-contact__msg').addClass('error');
                  $('.p-contact__msg').html('Błąd wysyłania wiadomości. Spróbuj ponownie później.');
                }

              }
          });
      } else {
        setTimeout($('#sendContactForm').removeClass('loading'),1000);
        $('.p-contact__msg').addClass('error');
        $('.p-contact__msg').removeClass('success');

        $('.p-contact__msg').html('Proszę wypełnić wymagane pola');
      }

      return false;
    });
  }

  if($('#sendContactForm').length) {
    sendContact();
  }
});




(function(){
  $('.zgoda-short')
    .mouseover(function() {
      $(this).parent().find('.zgoda-long').removeClass('hidden');
    })
    .mouseout(function() {
      $(this).parent().find('.zgoda-long').addClass('hidden');
      
    });
})();