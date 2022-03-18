//Paul Irish smartresize : http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($) {
    'use strict';

    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this;
            var args = arguments;
            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }
            timeout = setTimeout(delayed, threshold || 100);
        };
    };


    var dreamSlider = function ($container, options) {
        console.log("111111111111");
        var flgClick = true;
        var $imWrapper = $container.find('.im_wrapper');
        var $thumbs = $imWrapper.children('div');
        var $thumbImgs = $thumbs.find('img');
        var nmbThumbs = $thumbs.length;
        var $imLoading = null;
        var $imNext = null;
        var $imPrev = null;
        var perLine = options.rowCount;
        var easingEffect = 'none';
        var perCol = Math.ceil(nmbThumbs / perLine);
        var nmbThumbsInViewPort = 30;
        var $gridLayoutSingleMode = $imWrapper.children('div').slice(0, nmbThumbsInViewPort);
        var current = -1;
        var mode = 'grid';
        var $curViewPortThumbs;
        var positionsArray = [];
        var i;
        var loaded = 0;
        var hoverHandler = null;
        var blurHandler = null;
        var easeOptionFallabck = false;
        if (!!options.easeEffect) {
            easingEffect = options.easeEffect;
        }
         console.log("2222222222222222");
        jQuery.extend(jQuery.easing, {
            easeOutBounce: function (x, t, b, c, d) {
                if ((t /=  d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
                }
            }
        });
         console.log("33333333333");
        for (i = 0; i < nmbThumbs; ++i) {
            positionsArray[i] = i;
        }
        var staticTmpl = '<div class="im_loading">'+
                              '<div class="loader-inner line-scale-pulse-out">'+
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                                '<div></div>' +
                              '</div>'+
                          '</div>'+
                          '<div class="im_next"></div>' +
                          '<div class="im_prev"></div>';
        $container.append(staticTmpl);
         console.log("44444444444444");
        $imLoading = $container.find('.im_loading');
        $imNext = $container.find('.im_next');
        $imPrev = $container.find('.im_prev');

        $imLoading.show();
         console.log("555555555555555");
        function thumbsBounceHover($this) {
          //  $this.filter(':not(:animated)').animate({
          //      top: parseInt($this.css('top')) - 25
          //  }, 500, 'easeOutBounce',
          //          function () {
          //      $this.animate({
          //          top: parseInt($this.css('top')) + 25
          //      }, 500, 'easeOutBounce');
          //  });
        }

        function thumbsStandOutHover($this) {
           // $this.siblings().stop().fadeTo(300, 0.5);
            /*$this.siblings().stop()
            .css({
               'filter'         : 'blur(2px)',
               '-webkit-filter' : 'blur(2px)',
               '-moz-filter'    : 'blur(2px)',
               '-o-filter'      : 'blur(2px)',
               '-ms-filter'     : 'blur(2px)'
            });*/
        }

        function option3Hover() {
            return;
        }

        function thumbsBounceBlur() {
            return;
        }

        function thumbsStandOutBlur($this) {
            $this.siblings().stop().fadeTo(500, 1);
           /* $this.siblings().stop()
            .css({
               'filter'         : 'blur(0px)',
               '-webkit-filter' : 'blur(0px)',
               '-moz-filter'    : 'blur(0px)',
               '-o-filter'      : 'blur(0px)',
               '-ms-filter'     : 'blur(0px)'
            });*/
        }

        function option3Blur() {
            return;
        }


        function hoverEffect($targetThumbs) {
            $targetThumbs.hover(function () {
                hoverHandler($(this));
            }, function () {
                blurHandler($(this));
            });
        }

        if (easingEffect !== 'none') {
            if (easingEffect === 'bounce') {
                hoverHandler = thumbsBounceHover;
                blurHandler = thumbsBounceBlur;
            } else if (easingEffect === 'standOut') {
                hoverHandler = thumbsStandOutHover;
                blurHandler = thumbsStandOutBlur;
            } else if (easingEffect === 'option3') {
                hoverHandler = option3Hover;
                blurHandler = option3Blur;
            } else {
                $thumbImgs.addClass('default_ease_zoom');
                easeOptionFallabck = true;
                return;
            }
             console.log("6666666666666");
            hoverEffect($thumbs);
             console.log("7777777777");
        } else {
            $thumbImgs.addClass('default_ease_zoom');
             console.log("888888888888888");
        }
        console.log("9999999999999");

        function setflag() {
            flgClick = !flgClick;
        }

        function disperse() {
            if (!flgClick) {
                return;
            }
            setflag();
            mode = 'grid';
            // window Control Width X             
            var spacesW = $(window).width() / (perLine + 1)+50; 
            // Window Control Heigh y
            var verticalHeight = ($thumbs.height() + 80) * perCol;
            var spacesH = verticalHeight / (perCol + 1);

            if (spacesH < 180 ) { spacesH = 180 ;}
 
            $thumbs.each(function (i) {
                var $thumb = $(this);
                var left = spacesW * ((i % perLine) + 1) - $thumb.width() / 2;

                var top = spacesH * (Math.ceil((i + 1) / perLine)) - $thumb.height() / 2;  

                var param = {
                    left: left + 'px',
                    top: top + 'px'
                };

                $thumb.stop()
                    .animate(param, 1, function () {                        
                        if (i === nmbThumbsInViewPort - 1) {
                            setflag();
                        }
                    })
                    .find('img')
                    .fadeIn(1, function () {
                        $thumb.css({
                            'background-image': 'none'
                        });
                        $(this).animate({
                            width: '95px',
                            height: '95px',
                            marginTop: '5px',
                            marginLeft: '5px'
                        }, 150);
                    });
            });

            if (easingEffect !== 'none' && !easeOptionFallabck) {
                $thumbs.fadeTo(100, 1);
                hoverEffect($thumbs);
            }
            $thumbs.addClass('curved');
        }

        function start() {
            $imLoading.hide();
            disperse();
        }

        $thumbImgs.each(function () {
            var $this = $(this);

            $('<img/>').load(function () {
                ++loaded;
                if (loaded === nmbThumbs * 2) {
                    start();
                }
            }).attr('src', $this.attr('src'));

            $('<img/>').load(function () {
                ++loaded;
                if (loaded === nmbThumbs * 2) {
                    start();
                }
            }).attr('src', $this.attr('src'));
        });

        function addBackgroundPosition(thumbs) {
            var xpos;
            var ypos;
            var index = 0;
            var xposPX = '';
            var yposPX = '';

            $(thumbs).css('background-position', '');

            for (ypos = 0; ypos >= -625; ypos = ypos - 125) {
                for (xpos = 0; xpos >= -625; xpos = xpos - 125) {
                    xposPX = xpos + 'px';
                    yposPX = ypos + 'px';
                    $(thumbs).eq(index++).css('background-position', xposPX + ' ' + yposPX);
                }
            }
            return thumbs;
        }

        function removeNavigation() {
            $imNext.stop().animate({right: '-50px'}, 300);
            $imPrev.stop().animate({left: '-50px'}, 300);
        }

        function addNavigation() {
            $imNext.stop().animate({right: '0px'}, 300);
            $imPrev.stop().animate({left: '0px'}, 300);
        }


        function scrollToView(targetIndex) {
            var targetThumb = $imWrapper.children('div').slice(targetIndex, targetIndex + 1);
            var targetOffsetTop = targetThumb.offset().top;
            $('html, body').animate({
                scrollTop: targetOffsetTop
            }, 900);
        }



        $thumbs.on('click', function () {
            if (!flgClick) {
                return;
            }
            setflag();

            var $this = $(this);
            var gridStartIndex = 0;
            var gridEndIndex = 0;

            //calculate the dimentions of the for every thumb to show in single mode
            var fW = perLine * 125;
            var fH = perCol * 125;
            var fL = $(window).width() / 2 - fW / 2;
            var fT = $(window).height() / 2 - fH / 2;

            current = $this.index();

            if (mode === 'grid') {
                mode = 'single';

                $thumbs.removeClass('curved');
                var imageSrc = $this.find('img').attr('src');
                if (current < 30) {
                    gridStartIndex = 0;
                } else {
                    gridStartIndex = Math.floor(Math.abs((current - 24) / 6)) * 6;
                }

                gridEndIndex = gridStartIndex + nmbThumbsInViewPort;
                $curViewPortThumbs = $imWrapper.children('div').slice(gridStartIndex, gridEndIndex);
                $gridLayoutSingleMode = addBackgroundPosition($curViewPortThumbs);

                scrollToView(gridStartIndex);
                $thumbs.off('mouseenter mouseleave');
                $curViewPortThumbs.fadeTo(100, 1);
                $gridLayoutSingleMode.each(function (i) {
                    var $thumb = $(this);
                    var $image = $thumb.find('img');

                    if (i === 0) {
                        fT = parseInt($thumb.css('top'), 10);
                    }
                    $image.stop().animate({
                        width: '100%',
                        height: '100%',
                        marginTop: '0px',
                        marginLeft: '0px'
                    }, 150, function () {
                       var param = {
                            left: fL + (i % perLine) * 125 + 'px',
                            top: fT + Math.floor(i / perLine) * 125 + 'px'
                        };

                        $thumb.css({
                            'background-image': 'url(' + imageSrc + ')',
                            'background-size': '750px 625px'
                        }).stop()
                            .animate(param, 1200, function () {
                                if (i === nmbThumbsInViewPort - 1) {
                                    addNavigation();
                                    setflag();
                                }
                            });
                        $image.fadeOut(700);
                    });
                });
            } else {
                setflag();
                removeNavigation();
                disperse();
            }
        });

        $imNext.bind('click', function () {
            if (!flgClick) {
                return;
            }
            setflag();

            ++current;
            var $nextThumb = $imWrapper.children('div:nth-child(' + (current + 1) + ')');
            if ($nextThumb.length > 0) {
                var imageSrc = $nextThumb.find('img').attr('src');
                var arr = Array.shuffle(positionsArray.slice(0));
                $thumbs.each(function (i) {
                    var t = $(this);
                    setTimeout(function () {
                        t.css({
                            'background-image': 'url(' + imageSrc + ')'
                        });
                        if (i === nmbThumbs - 1) {
                            setflag();
                        }
                    }, arr.shift() * 20);
                });
            } else {
                setflag();
                --current;
                return;
            }
        });

        $imPrev.bind('click', function () {
            if (!flgClick) {
                return;
            }
            setflag();
            --current;
            var $prevThumb = $imWrapper.children('div:nth-child(' + (current + 1) + ')');
            if ($prevThumb.length > 0) {
                var imageSrc = $prevThumb.find('img').attr('src');
                var arr = Array.shuffle(positionsArray.slice(0));
                $thumbs.each(function (i) {
                    var t = $(this);
                    setTimeout(function () {
                        t.css({
                            'background-image': 'url(' + imageSrc + ')'
                        });
                        if (i === nmbThumbs - 1) {
                            setflag();
                        }
                    }, arr.shift() * 20);
                });
            } else {
                setflag();
                ++current;
                return;
            }
        });

        $(window).smartresize(function () {
            removeNavigation();
            disperse();
        });

        Array.shuffle = function (array){
            var j,x,k;
            for( k = array.length; k;
            j = parseInt(Math.random() * k),
            x = array[--k], array[k] = array[j], array[j] = x){
                //empty block
            }
            return array;
        };
    };

   jQuery.fn.smartresize = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger('smartresize');
    };

   jQuery.fn.dreamSlider = function (options) {
        return dreamSlider($(this), options);
    };

}(jQuery));
