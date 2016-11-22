$(function() {
    // Get Browser Height and Width to position stuff
    var alturaBrowser = $(window).height();
    var anchoBrowser = $(window).width();

    var productos;
    var indice;

    if (alturaBrowser < 700) {
        $('#producto').css('marginTop', '20%');
    } else if (alturaBrowser > 700) {
        $('#producto').css('marginTop', '20%');
    }

    if (anchoBrowser > 760 && anchoBrowser < 1024) {
        $('#producto').css({
            marginTop: '5%',
            marginBottom: '5%'
        });
        $('#producto').css('marginTop', '5%');
    }

    // Obtiene JSON con los ejemplares Mundo Simi
    function getJson() {
        $.getJSON("data/herbolarios.json", function(data) {
            productos = data.productos;
            console.log(productos);
            indice = 0;
            setInfo(indice);
        });
    }

    getJson();

    function setInfo(args) {
        if (anchoBrowser > 768) {
            $('#producto').removeClass('fadeInLeft').addClass('fadeOutRight');
            setTimeout(function() {
                $('#producto').attr('src', productos[args].urlImagen);
                $('#producto').removeClass('fadeOutRight').addClass('fadeInLeft');
            }, 1000);
        } else {
            $('#producto').removeClass('fadeInLeft').addClass('fadeOutRight');
            setTimeout(function() {
                $('#producto').attr('src', productos[args].urlImagenM);
                $('#producto').removeClass('fadeOutRight').addClass('fadeInLeft');
            }, 1000);
        }
        $('.funcion').html(productos[args].funcion);
    }

    function prev() {
        if (indice === 0) {
            indice = 5;
        } else {
            indice--;
        }
    }

    function next() {
        indice++;
        if (indice > 5) {
            indice = 0;
        }
    }

    $('.prev').click(function() {
        /* Act on the event */
        prev();
        setInfo(indice);
    });

    $('.next').click(function() {
        /* Act on the event */
        next();
        setInfo(indice);
    });

    $('.btn-prev').click(function() {
        /* Act on the event */
        prev();
        setInfo(indice);
    });

    $("body").on("swipe", function() {
        console.log('swipe');
    });

    $('.btn-next').click(function() {
        /* Act on the event */
        next();
        setInfo(indice);
    });

    if (anchoBrowser > 990) {
        // Position stuff if...
        if (alturaBrowser < 832 && anchoBrowser >= 992) {
            $('.producto > p > img').css('marginTop', '10%');
        }
        // Animate product on load
        TweenLite.from(".producto", 1, { opacity: "0" });

        TweenLite.from(".animRevolotea", 1, { opacity: "0", rotation: 90 });

        TweenLite.from(".entrada", 1, { opacity: "0", marginLeft: -190 });

        // Animate video image on hover
        $('.videos').hover(function() {
            /* Stuff to do when the mouse enters the element */
            TweenLite.to(this, 0.5, { opacity: "0.5" });
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            TweenLite.to(this, 0.5, { opacity: "1" });
        });
        // Animate mariposa
        $('.animRevolotea').hover(function() {
            /* Stuff to do when the mouse enters the element */
            var tweenRevolotea = TweenMax.to(".animRevolotea", 0.5, { scaleX: 0.5, repeat: 1, yoyo: true });
        }, function() {
            /* Stuff to do when the mouse leaves the element */
        });
    } else if (anchoBrowser > 760) {
        var btnNextLeft = anchoBrowser - 177;
        $('.btn-next').css('left', btnNextLeft);
    } else {
        var btnNextLeft = anchoBrowser - 117;
        $('.btn-next').css('left', btnNextLeft);
    }

    // Swipe events for mobile
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    document.addEventListener('touchcancel', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var doTouchBreak = null;
    var minDelta = 200;

    function handleTouchEnd() {
        doTouchBreak = null;
    };

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown || doTouchBreak) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        // horizontal swipe
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > minDelta) {
                /* left swipe */
                prev();
                setInfo(indice);
                doTouchBreak = true;
            } else if (xDiff < -minDelta) {
                /* right swipe */
                next();
                setInfo(indice);
                doTouchBreak = true;
            }
            // vertical swipe
        } else {
            if (yDiff > minDelta) {
                /* up swipe */
                document.getElementById('info').appendChild(document.createTextNode('Up! '));
                doTouchBreak = true;
            } else if (yDiff < -minDelta) {
                /* down swipe */
                document.getElementById('info').appendChild(document.createTextNode('Down! '));
                doTouchBreak = true;
            }
        }

        if (doTouchBreak) {
            xDown = null;
            yDown = null;
        }
    };




});
