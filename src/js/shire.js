$(function () {
    $('nav .scroll-content').height($('nav').height() - 270);

    $('#embedded-feed').height($(window).height() - 157);

    $('[data-toggle="tooltip"]').tooltip();

    $('.menu').parent().click(function() {
        $(this).find('> .menu').addClass('open');
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
        }
        else if ($icon.hasClass('ion-android-arrow-dropup')) {
            $icon.removeClass('ion-android-arrow-dropup');
            $icon.addClass('ion-android-arrow-dropdown');
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
        if ($parent.find('ul.sub-menu').length) {
            if ($parent.hasClass('open'))
                $parent.removeClass('open');
            else
                $parent.addClass('open');
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
        resizeGridItems();
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