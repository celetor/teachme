/*-----------------------------------------------------------------------------------*/
/*  DOCUMENT READY
/*-----------------------------------------------------------------------------------*/
$(document).ready(function(){
    'use strict';
    // ANIMATED ONLY IF NOT AT TOP OF PAGE ON LOAD //
    var $win = $(window);
    if ($win.scrollTop() == 0)
        jQuery('.navbar-fixed-top').addClass('wow');
    else if ($win.height() + $win.scrollTop() == $(document).height()) {
         jQuery('.navbar-fixed-top').removeClass('wow');
    }

    //NEAT VID EMBEDS
    $().prettyEmbed({ useFitVids: true });
    $('.vertical-center').flexVerticalCenter({ cssAttribute: 'padding-top' });

    // ONEPAGER XTRA //
    //$('body').scrollspy({
    //    target: '.navbar-fixed-top'
    //});

    // FULLSCREEN FIX //
    var windowHeight = $(window).innerHeight();
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if( !isMobileDevice ) {
        $('#headerwrap.fullheight').css('height', windowHeight);
        $(window).resize(function() {
            $('#headerwrap.fullheight').css('height', windowHeight);
        });
    }

    // ANIMATE ONCE PAGE LOAD IS OVER //
    Pace.on("done", function(){
        new WOW().init();
        $(window).trigger('resize');
    });
});