$(document).ready(function () {
    // lazy-load images authored as <img data-src="...">
    $('img').each(function () {
        var img = this;
        var src = $(img).data('src');
        if (!src) return;
        var pre = new Image();
        pre.src = src;
        pre.onload = function () { $(img).attr('src', this.src); };
    });

    // smooth-scroll for in-page anchor links (was previously in config.js / skel)
    var $nav = $('#nav');
    $('a[href^="#"]').on('click', function (e) {
        var hash = $(this).attr('href');
        if (hash.length <= 1) return;
        var $target = $('article' + hash + ', ' + hash);
        if (!$target.length) return;
        e.preventDefault();
        var navH = $nav.outerHeight() || 0;
        var top = Math.max($target.offset().top - navH - 8, 0);
        $('html, body').animate({ scrollTop: top }, 450, 'swing');
    });
});
