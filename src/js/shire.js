$(function () {
    adjustHeight();
    checkWindow();

    $('[data-toggle="tooltip"]').tooltip();

    $('.menu').parent().click(function() {
        $(this).find('> .menu').addClass('open');
    });

    $('.image-toolbar > .btn').click(function() {
        $this = $(this);
        $body = $('body');
        if($this.find('> .ion-android-menu').length) {
            if($body.hasClass('nav-closed')) $body.removeClass('nav-closed');
            else {
                $body.addClass('nav-closed');
                $body.find('ul.sub-menu').each(function() {
                    $parent = $(this).parent();
                    if ($parent.hasClass('open'))
                        $parent.removeClass('open');
                });                
            }
        }
    });

    $(document).mouseup(function(e) {
        $('.menu.open').each(function(e) {
            $this = $(this);
            $this.removeClass('open');
            $this.closest('.list-item').find('> .list-action').removeClass('ion-active');
        });
    });

    $('.menu .list > .list-item').click(function() {
        $this = $(this);
        $icon = $this.find('> .list-action');
        if ($icon.hasClass('ion-android-checkbox-outline-blank')) {
            $icon.removeClass('ion-android-checkbox-outline-blank');
            $icon.addClass('ion-android-checkbox');
        }
        else if ($icon.hasClass('ion-android-checkbox')) {
            $icon.removeClass('ion-android-checkbox');
            $icon.addClass('ion-android-checkbox-outline-blank');
        }
        else if ($icon.hasClass('ion-android-arrow-dropdown')) {
            $icon.removeClass('ion-android-arrow-dropdown');
            $icon.addClass('ion-android-arrow-dropup');
            $icon.closest('menu').addClass('open');         
        }
        else if ($icon.hasClass('ion-android-arrow-dropup')) {
            $icon.removeClass('ion-android-arrow-dropup');
            $icon.addClass('ion-android-arrow-dropdown');
            $icon.closest('menu').removeClass('open');     
        }                
        $icon.toggleClass('ion-active');
    });                

    resizeGridItems();

    $('.thumbnail-wrapper > img').each(function () {
        var $this = $(this);
        var $thisimage = new Image();

        $thisimage.src = $this.attr("src");
        if($thisimage.height > $thisimage.width)
            $this.parent().addClass('tall');
    });

    $('nav ul > li > a').click(function () {
        $this = $(this);
        $parent = $this.parent();

        if($('body.nav-closed').length) return 0;
        else {
            if ($parent.find('ul.sub-menu').length) {
                if ($parent.hasClass('open'))
                    $parent.removeClass('open');
                else
                    $parent.addClass('open');
            }
        }
    });

    $('.sidebar-header').click(function () {
        $this = $(this);
        $parent = $this.parent();
        if($parent.hasClass('open')) {
            $parent.removeClass('open');
        }
        else {
            $parent.addClass('open');
        }
    });

    yam.connect.embedFeed({
        "network": "shi.com",
        "feedType": "group",
        "feedId": 4776854,
        "config": {
            "use_sso": true,
            "header": false,
            "footer": false,
            "showOpenGraphPreview": false,
            "defaultToCanonical": false,
            "hideNetworkName": true
        },
        "container": "#embedded-feed"
    });

    $(window).resize(function() {
        adjustHeight();
        resizeGridItems();
        checkWindow();
    });
});
function resizeGridItems() {
    $('.grid-item > .thumbnail-wrapper').each(function() {
        $this = $(this);
        $width = $this.width();
        $parent = $this.parent();
        if($width < 120) $parent.addClass('smaller');
        if($width >= 120) $parent.removeClass('smaller');                  
    });                
}
function adjustHeight() {
    imagetoolbar = 270;
    if($('body.nav-closed').length) imagetoolbar = 42;
    $('nav .scroll-content').height($('nav').height() - imagetoolbar);
    $('#embedded-feed').height($(window).height() - 157);    
}
function checkWindow() {
    $body = $('body');
    if($(window).width() <= '992') {
        $body.addClass('nav-closed');
    }
}