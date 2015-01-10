
$(document).ready(function() {


    $('.content').fullpage({
        //Navigation
        menu: '.nav',
        anchors:['home', 'about', 'work', 'contact'],
        navigation: false,
     //   navigationPosition: 'right',
     //   navigationTooltips: ['firstSlide', 'secondSlide'],
     //   slidesNavigation: true,
     //   slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInQuart',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,

        //Design
        controlArrows: true,
        verticalCentered: false,
        resize : false,
        fixedElements: '#header',
        responsive: 0
 });



Pace.once('done', function(){
    
    $('.typewriter').typed({
        strings: ["^1800 Hi.^800 It's nice to see you.", "My name is Andrzej.", "I do the internets."],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 800
    });
});



var userFeed = new Instafeed({
    get: 'user',
    limit: 24,
    userId: 566414879,
    resolution: 'low_resolution',
    sortBy: 'most-liked',
    accessToken: '566414879.467ede5.249c4e8f2db140d897deab5c0e2a2b6b',
    template: '<div class="item"><img src="{{image}}" /><div class="likes"><i class="fa fa-heart"></i> {{likes}}</div><a class="item-link" title="View on Instagram" href="{{link}}"><i class="fa fa-instagram"></i></a></div>',
    after: function() {

        var $container = $('#instafeed');

        $container.packery({
          itemSelector: '.item',
          gutter: 0
      });

        $container.on( 'click', '.item', function( event ) {
          var $target = $( event.target ).parent();
          var isGigante = $target.hasClass('big');
          $target.toggleClass('big');
          ga('send', 'event', 'About', 'click', 'View Instagram');

          $container.packery();
      });
    }
});
userFeed.run();

$('#contact-form input, #contact-form textarea').focus(function(){
    $(this).parent().removeClass('error');
});

$('#contact-form').submit(function(e){

    e.preventDefault();

    var good = true;
    var name = $('#contact-form input[name="username"]');
    var email = $('#contact-form input[name="email"]');
    var msg = $('#contact-form textarea');
    var btn = $('#contact-form button');
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    
    if(name.val() == '' || name.length == 0) {
        good = false;
        name.parent().addClass('error');
    }

    if(email.val() == '' || email.length == 0 || !re.test(email.val())) {
        good = false;
        email.parent().addClass('error');
    }

    if(msg.val() == '' || msg.length == 0) {
        good = false;
        msg.parent().addClass('error');
    }

    if(good === true) {

        btn.addClass('sending').text('Sending...');
        ga('send', 'event', 'Contact Form', 'click', 'Message Sent', email.val());

        $.ajax({
            type: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': 'Sfc7D3bSlMWLGrhMZIKtrQ',
                'message': {
                  'from_email': email.val(),
                  'to': [
                  {
                    'email': 'andrzej.dubiel@gmail.com',
                    'name': 'Andrzej Dubiel',
                    'type': 'to'
                }],
                'autotext': 'true',
                'subject': '[dubiel.me] Contact Form',
                'html': '<p>Name: '+ name.val() +'</p>' + '<p>Email: '+ email.val() +'</p>' + '<p>Message: '+ msg.val() +'</p>'
            }
        }
    }).done(function(response) {
           if(response[0].status == 'sent') {
                btn.removeClass('sending').addClass('sent').text('Message Sent! Thank you.');
                setTimeout(function(){
                 btn.removeClass('sending').removeClass('sent').text('Send it');
                 email.val('');
                 name.val('');
                 msg.val('');
                },5000);
           } else {
                btn.removeClass('sending').addClass('ooops').text('Ooops!');
                setTimeout(function(){
                 btn.removeClass('sending').removeClass('ooops').text('Send it');
                },3000);
           }
    });

}   
else {
    btn.addClass('ooops').text('Ooops!');
    setTimeout(function(){
     btn.removeClass('ooops').text('Send it');
    },3000);

}
    return false;

});

$('.cycle-slideshow').magnificPopup({
  delegate: 'a',
  type: 'image',
  removalDelay: 500,
  verticalFit: false,
  callbacks: {
    beforeOpen: function() {
      this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
  closeOnContentClick: true,
  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});


});