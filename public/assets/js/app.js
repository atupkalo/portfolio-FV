var tabs = (function(){
    return{
        set: function(){
            $('.admin__tabs-item-link').on('click', function(e){
                e.preventDefault();
                var link = $('.admin__tabs-item-link'),
                    $this = $(this),
                    item = $this.closest('.admin__tabs-item'),
                    index = item.index(),
                    container = $this.closest('.admin-wrap'),
                    allcontent = container.find('.admin__content-item'),
                    active = allcontent.filter('.active'),
                    duration = 300,
                    reqcontent = allcontent.eq(index);



                if (!item.hasClass('active')) {

                    item.addClass('active')
                        .siblings().removeClass('active');

                    active.stop(true).fadeOut(duration, function(){
                        reqcontent.stop(true).fadeIn(duration);

                        reqcontent.addClass('active')
                            .siblings()
                            .removeClass('active');
                    });



                }

                link.removeClass('change_color');
                $this.addClass('change_color');


            });
        }
    }
}());

//----------------------------------------------------------- flip

var flip = (function(){
    var authorBtn =  $('.author'),
         rotateItem = $('.front-block__rotate'),
         frontBlock = $('.front-block__wrap-front'),
         backToMain = $('#empty');
      return {
          set: function(){
              authorBtn.on('click', function(){
                  rotateItem.css('transform', 'rotateY(180deg)');
                  setTimeout(function(){frontBlock.css('display', 'none')}, 1000);
                  setTimeout(function(){authorBtn.css('display', 'none')}, 300);
              });
              backToMain.on('click', function(){
                  rotateItem.css('transform', 'rotateY(0deg)');
                  setTimeout(function(){frontBlock.css('display', 'block')}, 100);
                  setTimeout(function(){authorBtn.css('display', 'block')}, 100);
              });
          }
      }

}());

//----------------------------------------------------contacts drop down

var contacts = (function(){
    var infoBlock = $('.my-info').hide(),
        infoBtn =$('.my-info__btn-wrap'),
        infoIcon =  $('.my-info__btn-icon'),
        iconClose = $('.my-info__close');
    return {
        down: function() {
            if (infoBlock.is(":hidden")) {
                infoBtn.on('click', function () {
                    infoBlock.slideDown(500);
                    infoIcon.addClass('icon-rotate');

                });

            }else{infoBlock.slideUp(500)};



            iconClose.on('click', function () {
                infoBlock.slideUp(500);
                infoIcon.removeClass('my-info__rotate');
                infoIcon.removeClass('icon-rotate');
            })
        }
    }

}());

//------------------------------------------- slowdown page

 var scrollPage = (function(){

     var arrowBottom = $('.footer__arrow-up'),
         arrowTop = $('.header-arrow__link');


     arrowTop.on('click', function(e){
         e.preventDefault();
         var positionBottom = arrowBottom.offset().top;
         $('html, body').animate({scrollTop: positionBottom}, 800);
     });
     arrowBottom.on('click', function(e){
         e.preventDefault();
         var positionBottom = $('.header-wrap').offset().top;
         $('html, body').animate({scrollTop: positionBottom}, 800);
     });

 }());

var parallax = (function(){
    var bg = $('.header-main__bg'),
        portfolioText = $('.header-bg__img-wrapper'),
        user = $('.header-avatar');

    return{
        move : function (block, windowScroll, strafeAmount){
            var strafe = windowScroll / strafeAmount + '%',
                transformString = 'translate3d(0,' + strafe + ', 0)';
            block.css({
                'transform' : transformString,
                '-webkit-transform' : transformString
            });

        },
        init : function (wScroll) {
            this.move(bg, wScroll, -35);
            this.move(portfolioText, wScroll, 65);
            this.move(user, wScroll, -10);
        }
    }
}());

//preloader
var imgs = [];

$.each($('*'), function(){

    var
        $this = $(this),
        background = $this.css('background-image'),
        img = $this.is('img'),
        gradient = background.indexOf('linear-gradient');
    if (background != 'none'){
        if (gradient === -1) {
            var path = background.replace('url("' , '').replace('")', '');
            imgs.push(path);
        }
    }
    if (img) {
        var path = $this.attr('src');

        if
        (path) {
            imgs.push(path);
        }
    }

   var percentsTotal = 1;
     for (var i = 0; i < imgs.length; i++){
          var image = $('<img>', {
                    attr: {
                          src: imgs[i]
                         }
                    });

         image.on('load', function(){
            setPercents(imgs.length, percentsTotal);
            percentsTotal++;
         });

         image.on('error', function(){
             percentsTotal++;
         });


    }
    function setPercents(total, current) {
        var percent = Math.ceil(current / total * 100);
        $('.preloader__percents ').text(percent + '%');
        if (percent >= 100) {
            $('.preloader').fadeOut();

           }
        };
});

window.addEventListener('load', function(){




        var parallax_front = (function () {

            var pics = $('.wrapper').find('.front__bg');
            $(window).on('mousemove', function(e){
                var mouse_dx = e.pageX,
                    mouse_dy = e.pageY;

                var w = (window.innerWidth/2) - mouse_dx,
                    h = (window.innerHeight/2) - mouse_dy;



                pics.map(function(key, value){

                    var widthPosition = w * (key * 1.6 / 100),
                        heightPosition = h * (key * 1.6 / 100);

                    $(value).css({
                        'transform' : 'translate3d('+widthPosition+'px, '+heightPosition+'px, 0)'
                    });
                });

            });
        }());

});

var loginForm = (function () {
    var check = document.querySelector('.author-form__checkbox');
    var enterBtn = document.getElementById('buttons-login');
    var errorField = document.querySelector('.form-error');

    return {
        valid: function () {
            check.addEventListener('change', function(){

                var login = document.querySelector('.input-field_log').value;
                var password = document.querySelector('.input-field_pass').value;

                enterBtn.addEventListener('click', function(e){
                    e.preventDefault();
                    if (login == 'anatolii' && password == '191080') {
                        enterBtn.setAttribute('href', 'admin.html');
                    }
                });

            });
        },
        pass: function () {
            enterBtn.addEventListener('click', function(e){
                e.preventDefault();
                var login = document.querySelector('.input-field_log').value;
                var password = document.querySelector('.input-field_pass').value;

                if (login == '' || password == '') {
                    errorField.innerHTML = 'login or password field cannot be empty';
                } else if (login !== 'anatolii' && password !== '191080') {
                    errorField.innerHTML = 'login or password is incorrect';
                } else if (check.checked == false) {
                    errorField.innerHTML = 'conform you you are not a bot'
                }
            });
        }
    }


}());

//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------- FORM AJAX REQUEST -------------
const contactFormData = (function(){
    const formElems = document.forms['contact'];

    return{
        post: function(){
            formElems.addEventListener('submit', function(e){
                e.preventDefault();

                var data = {};
                for(var i = 0; i < formElems.length ; i++){
                    data[formElems[i].name] = formElems[i].value
                };

                getFormPost('POST',  '/contact', JSON.stringify(data))
                    .then(function(){
                        for(var i = 0; i < formElems.length ; i++){
                            if(formElems[i].value !== 'submit' && formElems[i].value !== 'clear'){
                                formElems[i].value = '';
                                var divErr = document.querySelector('.cont-form__response');
                                divErr.style.display = 'block';
                            }
                        };
                    });
            });

        }
    }
}());

function getFormPost(math, path, data) {
    return new Promise(function (res, rej) {
        var xhr = new XMLHttpRequest();
        xhr.open(math, path);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onloadend = function () {
            res(xhr.response);
        };
        xhr.onerror = function () {
            rej(xhr.statusText)
        };
        xhr.send(data);
    });
}

var smallSlider = (function(){
    return{
            data: ['/assets/img/small-slide_1.png', '/assets/img/small-slide_2.png',
                   '/assets/img/small-slide_3.png', '/assets/img/small-slide_5.png', '/assets/img/small-slide_6.jpg'],
            slides: document.querySelector('.about-left__slide-item'),
            counter: 0,
            set: function(){
                this.slides.style.backgroundImage = "url(" + this.data[this.counter] + ")";
            },
            doSlide: function(){
                this.counter++;
                if(this.counter == this.data.length){
                    this.counter = 0;
                }
                this.set();
            }

    }
}());

$(window).on('resize', function(){
    var imgWrap = $('.about-left__slide-img-wrap');
    var imgItem = $('.about-left__slide-img');
    var imgHeight = imgItem.height();

    imgWrap.css('min-height', imgHeight);
});

var menu = (function(){
    var menuBlock = $('.menu-wrap'),
        menuClose = $('.menu__close-item'),
        menuTrigger = $('.header-menu__link'),
        menuItems = $('.menu-item'),
        arrItems = jQuery.makeArray(menuItems),
        pageName    =  location.pathname.substring(1, 5);


    return {
        slideTo : function (){

            menuTrigger.on('click', function(){
                if(menuBlock.hasClass('display')){
                    menuBlock.removeClass('display');

                        if(pageName == 'work'){
                            $(arrItems[0]).addClass('menu-active');
                        }else if(pageName == 'abou'){
                            $(arrItems[1]).addClass('menu-active');
                        }else if(pageName == 'blog'){
                            $(arrItems[2]).addClass('menu-active');
                        }

                    menuBlock.animate({'right': 0}, 300);
                }

            });
        },
        slideOff : function(){
            menuClose.on('click', function(){
                menuBlock.animate({'right': -500}, 300);
                setTimeout(function(){menuBlock.addClass('display')}, 500);
            });
        }

    }

}());

var blur = (function(){
    var
        blurSection = $('.speakers-wrap'),
        blurBg = $('.cont-form__bg-wrap'),
        formBlur = $('.cont-form__wrap');

    if(location.pathname == '/work.html'){
        function getBlur() {
            var
                imgWidth = $('.speakers-bg__img').width(),
                imgHeight= $('.speakers-bg__img').height(),
                positionLeft = blurSection.offset().left - formBlur.offset().left,
                positionTop = blurSection.offset().top - formBlur.offset().top;

            blurBg.css({
                'background-size' : imgWidth + 'px' + ' ' + imgHeight + 'px',
                'background-position' : positionLeft + 'px' + ' ' + positionTop + 'px'
            });
        }
        getBlur();
    }
}());

var blogScroll = (function(){
    var  navLink = $('.nav__list-item-link');
    var navItem = $('.nav__item');

    return {
        doScroll : function(){
            var
                navBlog = $('.nav'),
                navClone = $('.nav__under-clone');
            var wScroll = $(window).scrollTop();

            if (wScroll >= 780) {
                navBlog.addClass('nav-fixed');
            }
            else{
                navBlog.removeClass('nav-fixed');
            }
        },
        scrollPointed : function(){
            navLink.on('click', function(){
                var
                    $this = $(this),
                    idArticle = $this.attr('href'),
                    articlePosition = $(idArticle).offset().top;
                $('html, body').stop(true).animate({scrollTop: articlePosition}, 600);

                navItem.removeClass('.blog-item__active');
                $this.addClass('.blog-item__active');
            })
        },
        navActiveLink : function(){
             var navLinks = $('.nav__list-item-link');
             var wScroll = $(window).scrollTop();
             var navItems = $('.nav__item');

             var scrollItems = navLinks.map(function(){
                 var item = $($(this).attr('href'));

                 if (item.length) { return item; }
            });

            var currNum = 0;
            scrollItems.each(function(i, elem){

               if(elem.offset().top - 100 <= wScroll){
                   currNum = i;
               }

            });
           // if(!navItems.eq(currNum).hasClass('blog-item__active')){
           //     navItems.eq(currNum).addClass('blog-item__active').siblings().removeClass('blog-item__active');
           // }
            navItems.removeClass('blog-item__active');
            navItems.eq(currNum).addClass('blog-item__active');

        }

    }

}());

if(location.pathname == '/work.html'){


    var btnL = document.querySelector('.slider-right__btn-item--l');
    var btnR = document.querySelector('.slider-right__btn-item--r');
    var leftDesc = document.querySelector('.slider-left__desc-teh');
    var leftTitle = document.querySelector('.slider-left__desc-title');
    var slideLink = document.querySelector('.slider-left__desc-link');


    var data = [
        {
            title: 'Single Page Application. Weather widget',
            desc: 'HTML, CSS, jQuery, Ajax',
            link: 'http://cj86618.tmweb.ru/',
            img: '/assets/img/proj-1.jpg'
        },
        {
            title: 'Lending page',
            desc: 'HTML, LESS, jQuery',
            link: 'http://h-sweet.cj86618.tmweb.ru',
            img: '/assets/img/h-sweet.png'
        },
        {
            title: 'website of the 3',
            desc: 'HTML, CSS, JAVASCRIPT-333',
            link: '#',
            img: '/assets/img/new-2.png'
        },
        {
            title: 'website of the 4',
            desc: 'HTML, CSS, JAVASCRIPT-4444',
            link: '#',
            img: '/assets/img/new-3.png'
        },
    ];

    // getResSlider('GET', '').then(function(servRes){
    //     data.push(servRes);
    // });


    var count = 0;
    var dataLength = data.length;
     addElems();

    btnL.addEventListener('click', function(){
        count++;
        if(count >= dataLength){
            count = 0;
        };

        addElems();
    });


    btnR.addEventListener('click', function(){
        count--;
        if(count < 0){
            count = dataLength - 1;
        };

        addElems();
    });


    function addElems(){
        var slideRight = document.querySelector('.slider-right__pic-wrap');
        var smallPicLeft = document.querySelector('.slider-btn__small-pic-left');
        var smallPicRight = document.querySelector('.slider-btn__small-pic-right');

        var prev = countLimiter(count - 1);
        var next = countLimiter(count + 1);

        var img = document.createElement('img');
        img.setAttribute('src', data[count].img);
        img.classList.add('slider-right__pic');
        slideRight.innerHTML = '';
        slideRight.style.opacity = 0;
        slideRight.appendChild(img);
        setTimeout(function(){
            slideRight.style.opacity = 1;
        }, 300);

        var img = document.createElement('img');
        img.setAttribute('src', data[next].img);     // left
        img.classList.add('slider-btn__small-pic-item-left');
        smallPicLeft.innerHTML = '';
        smallPicLeft.style.opacity = 0;
        smallPicLeft.appendChild(img);
        setTimeout(function(){
            smallPicLeft.style.opacity = 1;
        }, 300);

        var img = document.createElement('img');
        img.setAttribute('src', data[prev].img);    // right
        img.classList.add('slider-btn__small-pic-item-left');
        smallPicRight.innerHTML = '';
        smallPicRight.style.opacity = 0;
        smallPicRight.appendChild(img);
        setTimeout(function(){
            smallPicRight.style.opacity = 1;
        }, 300);

        //  ----------------------------------------------------left side
        leftTitle.innerHTML = '';
        leftTitle.style.opacity = 0;
        leftTitle.innerHTML = data[count].title;
        setTimeout(function(){
            leftTitle.style.opacity = 1;
        }, 300);

        leftDesc.innerHTML = '';
        leftDesc.style.opacity = 0;
        leftDesc.innerHTML = data[count].desc;
        setTimeout(function(){
            leftDesc.style.opacity = 1;
        }, 300);

        slideLink.setAttribute('href', data[count].link);
    };

    function countLimiter(num){
        if(num < 0){
            return num = dataLength -1;
        }else if(num >= dataLength){
            return num = 0;
        }else{
            return num;
        }
    };

    function getResSlider(math, url){
        return new Promise(function(res, rej){
            var xhr = new XMLHttpRequest();
            open(math, url);
            xhr.onloadend = function(){
                res(xhr.response);
            };
            xhr.onerror = function(){
                rej(xhr.statusText);
            };
            xhr.send();
        });
    };

};

 var wWidth = window.innerWidth;
    if(location.pathname == '/work.html'){
        var slideRight = document.querySelector('.slider-right');

        function sliderHeight(h1, h2){
            if(h1 > 920){
                slideRight.style.height = h2 + 'px';
            }else{
                slideRight.style.height = h1 + 'px';
            }

        };
        sliderHeight(wWidth , wWidth / 2);
        //-----------------------------------------------------------------------------------------------------

        function setSpeakersBg(wSize){
            var speakersBg = document.querySelector('.speakers-bg__img');
            var contFormBg = document.querySelectorAll('.cont-form__bg-wrap');

            if(wSize < 1200 && wSize > 768){
                speakersBg.setAttribute('src', '/assets/img/spk_bg1200.png');
            }else if(wSize < 768 && wSize > 420){
                speakersBg.setAttribute('src', '/assets/img/spk_bg768.png');
            }else if(wSize <=420){
                speakersBg.setAttribute('src', '/assets/img/spk_bg420.png');
            }

        };

        setSpeakersBg(wWidth);

        window.addEventListener('resize', function(){

            sliderHeight(window.innerWidth , window.innerWidth / 2);
            setSpeakersBg(window.innerWidth);
        });
    };

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------ADMIN POST REQUESTS--------------

if(location.pathname == '/admin.html'){

    function getPost(math, path, data){
        return new Promise(function(res, rej){
            var xhr = new XMLHttpRequest();
            xhr.open(math, path);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onloadend = function(){
                res(xhr.response);
            };
            xhr.onerror = function(){rej(xhr.statusText)};
            xhr.send(data);
        });

    };

    function PostFile(math, path, data){
        return new Promise(function(res, rej){
            var xhr = new XMLHttpRequest();
            xhr.open(math, path);
            xhr.setRequestHeader('Content-type', 'multipart/form-data');
            xhr.onloadend = function(){
                res(xhr.response);
            };
            xhr.onerror = function(){rej(xhr.statusText)};
            xhr.send(data);
        });

    };

    var admSliderBtn = document.querySelector('.admin-button--slider ');
    var blogFile = document.querySelector('.admin-blog__imput-img');
    var sliderFile = document.querySelector('.admin-work__input-file');
    

    //                                                                                 ---------------  blog
    blogFile.addEventListener('change', function(){
        if(blogFile.value){
            PostFile('POST', '/upload', blogFile.value).then(console.log);
        };
    });

    document.forms['blog'].addEventListener('submit', function(){
        var blogInputs = document.forms['skills'].elements;
        var data = {};
        for(var i = 0; i < blogInputs.length ; i++){
            if(blogInputs[i].name == 'date' && blogInputs[i].name == 'text' && blogInputs[i].name == 'title'){
                data[blogInputs[i].name] = blogInputs[i].value;
            }
        };
        console.log(data);
     getPost('POST',  '/blog', JSON.stringify(data));
    });

    //                                                                                  -------------  slider
    sliderFile.addEventListener('change', function(){
        if(sliderFile.value){
            // PostFile('POST', '/upload', sliderFile.value).then(console.log);
            document.querySelector('.admin-button--slider').removeAttribute('disabled');
        }
    });

    admSliderBtn.addEventListener('click', function(e){
        e.preventDefault();
        var sliderFile = document.querySelector('.admin-work__input-file');
        var formSlider = document.forms['slider'].elements;
        var inputs = {};

        if(sliderFile.value){
            PostFile('POST', '/upload', sliderFile.value).then(console.log);
        }
        for(var i = 0; i < formSlider.length ; i++){
            if(formSlider[i].type == 'text'){
                inputs[formSlider[i].name] = formSlider[i].value;
            };
        };
        console.log(inputs, sliderFile.value);
        getPost('POST',  '/slider', JSON.stringify({name: inputs.name, value: inputs.value})).then(console.log).catch(console.log);
    });

    //                                                                                      ---------  skills level

    document.forms['skills'].addEventListener('submit', function(e){
        e.preventDefault();
        var skillsInputs = document.forms['skills'].elements;
        var inputs = {};

        for(var i = 0; i < skillsInputs.length ; i++){
            inputs[skillsInputs[i].name] = skillsInputs[i].value;
        };
        getPost('POST', '/skills', JSON.stringify(inputs)).then(() => {
           for(var i = 0; i < skillsInputs.length  ; i++){
               skillsInputs[i].value = '';
           }
        }).catch(console.log);

    });

}


//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------BLOG AND ABOUT GET REQUESTS--
if(location.pathname == '/about.html'){
    getRes('GET', '/skills').then((data) => {
        console.log(data);
    });
 };


if(location.pathname == '/blog.html'){
    // var artclWrap = document.querySelector('.articles-wrap');
    // var navList = document.querySelector('.nav__list');

    getRes('GET', '/blog').then((data) => {
        console.log(data);
    });
};


function getRes(math, url){
    return new Promise(function(res, rej){
        var xhr = new XMLHttpRequest();
        xhr.open(math, url);
        xhr.onloadend = function(){
            res(xhr.res);
        };
        xhr.onerror = function(){
            rej(xhr.statusText);
        };
        xhr.send();
    });
};


window.addEventListener("load", function(){

    if(location.pathname == '/admin.html'){
       tabs.set();
    };
    if(location.pathname == '/blog.html'){
        blogScroll.scrollPointed();
        menu.slideTo();
        menu.slideOff();
    };
    if(location.pathname == '/index.html'){
        loginForm.valid();
        loginForm.pass();
        flip.set();
    };
    if(location.pathname == '/#'){
        loginForm.valid();
        loginForm.pass();
    };
    if(location.pathname == '/#'){
        loginForm.valid();
    };
    if(location.pathname == '/work.html'){
        contactFormData.post();
        menu.slideTo();
        menu.slideOff();
    };
    if(location.pathname == '/about.html'){
        contacts.down();
        setInterval(function(){
            smallSlider.doSlide();
        }, 4000);
        menu.slideTo();
        menu.slideOff();
    };

});

window.addEventListener('scroll', function(){
    blogScroll.navActiveLink();
    parallax.init($(document).scrollTop());
    blogScroll.doScroll();

});

$(document).ready(function(){

    if(location.pathname == '/about.html'){
        function initMap( ){
            var coord = {lat: 39.74, lng: -104.98}
            var elem = document.getElementById('map');
            var options = {
                zoom: 14,
                center: coord
            };
            var myMap = new google.maps.Map(elem, options);
            var marker = new google.maps.Marker({
                position: coord,
                map: myMap,
                icon: '/assets/img/marker.png'
            });

        };
        initMap();
    };

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluX3RhYnMuanMiLCJtaXNjLmpzIiwicGFyYWxheF9zY3JvbGwuanMiLCJwcmVsb2FkZXIuanMiLCJwYXJhbGF4LmpzIiwiZm9ybV92YWxpZGF0aW9ucy5qcyIsInNtYWxsX3NsaWRlci5qcyIsIm1lbnVfc2xpZGUuanMiLCJibHVyLmpzIiwiYmxvZ19zY3JvbGwuanMiLCJiaWdfc2xpZGVyLmpzIiwiYWRhcHQuanMiLCJhZG1pbi5qcyIsImFqYXhfZ2V0LmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRhYnMgPSAoZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5hZG1pbl9fdGFicy1pdGVtLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5rID0gJCgnLmFkbWluX190YWJzLWl0ZW0tbGluaycpLFxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gJHRoaXMuY2xvc2VzdCgnLmFkbWluX190YWJzLWl0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGl0ZW0uaW5kZXgoKSxcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KCcuYWRtaW4td3JhcCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbGNvbnRlbnQgPSBjb250YWluZXIuZmluZCgnLmFkbWluX19jb250ZW50LWl0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBhbGxjb250ZW50LmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcWNvbnRlbnQgPSBhbGxjb250ZW50LmVxKGluZGV4KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUuc3RvcCh0cnVlKS5mYWRlT3V0KGR1cmF0aW9uLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXFjb250ZW50LnN0b3AodHJ1ZSkuZmFkZUluKGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcWNvbnRlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW5rLnJlbW92ZUNsYXNzKCdjaGFuZ2VfY29sb3InKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdjaGFuZ2VfY29sb3InKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG5cclxuIiwiXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZmxpcFxyXG5cclxudmFyIGZsaXAgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBhdXRob3JCdG4gPSAgJCgnLmF1dGhvcicpLFxyXG4gICAgICAgICByb3RhdGVJdGVtID0gJCgnLmZyb250LWJsb2NrX19yb3RhdGUnKSxcclxuICAgICAgICAgZnJvbnRCbG9jayA9ICQoJy5mcm9udC1ibG9ja19fd3JhcC1mcm9udCcpLFxyXG4gICAgICAgICBiYWNrVG9NYWluID0gJCgnI2VtcHR5Jyk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgYXV0aG9yQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIHJvdGF0ZUl0ZW0uY3NzKCd0cmFuc2Zvcm0nLCAncm90YXRlWSgxODBkZWcpJyk7XHJcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtmcm9udEJsb2NrLmNzcygnZGlzcGxheScsICdub25lJyl9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe2F1dGhvckJ0bi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpfSwgMzAwKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBiYWNrVG9NYWluLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIHJvdGF0ZUl0ZW0uY3NzKCd0cmFuc2Zvcm0nLCAncm90YXRlWSgwZGVnKScpO1xyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZnJvbnRCbG9jay5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKX0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXthdXRob3JCdG4uY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyl9LCAxMDApO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG59KCkpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY29udGFjdHMgZHJvcCBkb3duXHJcblxyXG52YXIgY29udGFjdHMgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbmZvQmxvY2sgPSAkKCcubXktaW5mbycpLmhpZGUoKSxcclxuICAgICAgICBpbmZvQnRuID0kKCcubXktaW5mb19fYnRuLXdyYXAnKSxcclxuICAgICAgICBpbmZvSWNvbiA9ICAkKCcubXktaW5mb19fYnRuLWljb24nKSxcclxuICAgICAgICBpY29uQ2xvc2UgPSAkKCcubXktaW5mb19fY2xvc2UnKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvQmxvY2suaXMoXCI6aGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvQmxvY2suc2xpZGVEb3duKDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb0ljb24uYWRkQ2xhc3MoJ2ljb24tcm90YXRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtpbmZvQmxvY2suc2xpZGVVcCg1MDApfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWNvbkNsb3NlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGluZm9CbG9jay5zbGlkZVVwKDUwMCk7XHJcbiAgICAgICAgICAgICAgICBpbmZvSWNvbi5yZW1vdmVDbGFzcygnbXktaW5mb19fcm90YXRlJyk7XHJcbiAgICAgICAgICAgICAgICBpbmZvSWNvbi5yZW1vdmVDbGFzcygnaWNvbi1yb3RhdGUnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KCkpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNsb3dkb3duIHBhZ2VcclxuXHJcbiB2YXIgc2Nyb2xsUGFnZSA9IChmdW5jdGlvbigpe1xyXG5cclxuICAgICB2YXIgYXJyb3dCb3R0b20gPSAkKCcuZm9vdGVyX19hcnJvdy11cCcpLFxyXG4gICAgICAgICBhcnJvd1RvcCA9ICQoJy5oZWFkZXItYXJyb3dfX2xpbmsnKTtcclxuXHJcblxyXG4gICAgIGFycm93VG9wLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgIHZhciBwb3NpdGlvbkJvdHRvbSA9IGFycm93Qm90dG9tLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zaXRpb25Cb3R0b219LCA4MDApO1xyXG4gICAgIH0pO1xyXG4gICAgIGFycm93Qm90dG9tLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgIHZhciBwb3NpdGlvbkJvdHRvbSA9ICQoJy5oZWFkZXItd3JhcCcpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zaXRpb25Cb3R0b219LCA4MDApO1xyXG4gICAgIH0pO1xyXG5cclxuIH0oKSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsInZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGJnID0gJCgnLmhlYWRlci1tYWluX19iZycpLFxyXG4gICAgICAgIHBvcnRmb2xpb1RleHQgPSAkKCcuaGVhZGVyLWJnX19pbWctd3JhcHBlcicpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuaGVhZGVyLWF2YXRhcicpO1xyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBtb3ZlIDogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCl7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyBzdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xyXG4gICAgICAgICAgICBibG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIC0zNSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShwb3J0Zm9saW9UZXh0LCB3U2Nyb2xsLCA2NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAtMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuIiwiLy9wcmVsb2FkZXJcclxudmFyIGltZ3MgPSBbXTtcclxuXHJcbiQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyksXHJcbiAgICAgICAgZ3JhZGllbnQgPSBiYWNrZ3JvdW5kLmluZGV4T2YoJ2xpbmVhci1ncmFkaWVudCcpO1xyXG4gICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKXtcclxuICAgICAgICBpZiAoZ3JhZGllbnQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInICwgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpbWcpIHtcclxuICAgICAgICB2YXIgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICBpZlxyXG4gICAgICAgIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcbiAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGltZ3NbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGltYWdlLm9uKCdsb2FkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgaW1hZ2Uub24oJ2Vycm9yJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cyAnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxufSk7XHJcblxyXG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHZhciBwYXJhbGxheF9mcm9udCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGljcyA9ICQoJy53cmFwcGVyJykuZmluZCgnLmZyb250X19iZycpO1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vdXNlX2R4ID0gZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZV9keSA9IGUucGFnZVk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHcgPSAod2luZG93LmlubmVyV2lkdGgvMikgLSBtb3VzZV9keCxcclxuICAgICAgICAgICAgICAgICAgICBoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlX2R5O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcGljcy5tYXAoZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aFBvc2l0aW9uID0gdyAqIChrZXkgKiAxLjYgLyAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRQb3NpdGlvbiA9IGggKiAoa2V5ICogMS42IC8gMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KCkpO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIGxvZ2luRm9ybSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY2hlY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yLWZvcm1fX2NoZWNrYm94Jyk7XHJcbiAgICB2YXIgZW50ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9ucy1sb2dpbicpO1xyXG4gICAgdmFyIGVycm9yRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1lcnJvcicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1maWVsZF9sb2cnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1maWVsZF9wYXNzJykudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZW50ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2dpbiA9PSAnYW5hdG9saWknICYmIHBhc3N3b3JkID09ICcxOTEwODAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyQnRuLnNldEF0dHJpYnV0ZSgnaHJlZicsICdhZG1pbi5odG1sJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZW50ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZmllbGRfbG9nJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZmllbGRfcGFzcycpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2dpbiA9PSAnJyB8fCBwYXNzd29yZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRmllbGQuaW5uZXJIVE1MID0gJ2xvZ2luIG9yIHBhc3N3b3JkIGZpZWxkIGNhbm5vdCBiZSBlbXB0eSc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvZ2luICE9PSAnYW5hdG9saWknICYmIHBhc3N3b3JkICE9PSAnMTkxMDgwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRmllbGQuaW5uZXJIVE1MID0gJ2xvZ2luIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrLmNoZWNrZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvckZpZWxkLmlubmVySFRNTCA9ICdjb25mb3JtIHlvdSB5b3UgYXJlIG5vdCBhIGJvdCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0oKSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZPUk0gQUpBWCBSRVFVRVNUIC0tLS0tLS0tLS0tLS1cclxuY29uc3QgY29udGFjdEZvcm1EYXRhID0gKGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCBmb3JtRWxlbXMgPSBkb2N1bWVudC5mb3Jtc1snY29udGFjdCddO1xyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBwb3N0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3JtRWxlbXMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmb3JtRWxlbXMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW2Zvcm1FbGVtc1tpXS5uYW1lXSA9IGZvcm1FbGVtc1tpXS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXRGb3JtUG9zdCgnUE9TVCcsICAnL2NvbnRhY3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZm9ybUVsZW1zLmxlbmd0aCA7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmb3JtRWxlbXNbaV0udmFsdWUgIT09ICdzdWJtaXQnICYmIGZvcm1FbGVtc1tpXS52YWx1ZSAhPT0gJ2NsZWFyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUVsZW1zW2ldLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpdkVyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250LWZvcm1fX3Jlc3BvbnNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2RXJyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtUG9zdChtYXRoLCBwYXRoLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlcywgcmVqKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKG1hdGgsIHBhdGgpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHhoci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlcyh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlaih4aHIuc3RhdHVzVGV4dClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIHNtYWxsU2xpZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgICAgIGRhdGE6IFsnL2Fzc2V0cy9pbWcvc21hbGwtc2xpZGVfMS5wbmcnLCAnL2Fzc2V0cy9pbWcvc21hbGwtc2xpZGVfMi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgJy9hc3NldHMvaW1nL3NtYWxsLXNsaWRlXzMucG5nJywgJy9hc3NldHMvaW1nL3NtYWxsLXNsaWRlXzUucG5nJywgJy9hc3NldHMvaW1nL3NtYWxsLXNsaWRlXzYuanBnJ10sXHJcbiAgICAgICAgICAgIHNsaWRlczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWxlZnRfX3NsaWRlLWl0ZW0nKSxcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyB0aGlzLmRhdGFbdGhpcy5jb3VudGVyXSArIFwiKVwiO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkb1NsaWRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvdW50ZXIgPT0gdGhpcy5kYXRhLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW1nV3JhcCA9ICQoJy5hYm91dC1sZWZ0X19zbGlkZS1pbWctd3JhcCcpO1xyXG4gICAgdmFyIGltZ0l0ZW0gPSAkKCcuYWJvdXQtbGVmdF9fc2xpZGUtaW1nJyk7XHJcbiAgICB2YXIgaW1nSGVpZ2h0ID0gaW1nSXRlbS5oZWlnaHQoKTtcclxuXHJcbiAgICBpbWdXcmFwLmNzcygnbWluLWhlaWdodCcsIGltZ0hlaWdodCk7XHJcbn0pO1xyXG5cclxuIiwidmFyIG1lbnUgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBtZW51QmxvY2sgPSAkKCcubWVudS13cmFwJyksXHJcbiAgICAgICAgbWVudUNsb3NlID0gJCgnLm1lbnVfX2Nsb3NlLWl0ZW0nKSxcclxuICAgICAgICBtZW51VHJpZ2dlciA9ICQoJy5oZWFkZXItbWVudV9fbGluaycpLFxyXG4gICAgICAgIG1lbnVJdGVtcyA9ICQoJy5tZW51LWl0ZW0nKSxcclxuICAgICAgICBhcnJJdGVtcyA9IGpRdWVyeS5tYWtlQXJyYXkobWVudUl0ZW1zKSxcclxuICAgICAgICBwYWdlTmFtZSAgICA9ICBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoMSwgNSk7XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2xpZGVUbyA6IGZ1bmN0aW9uICgpe1xyXG5cclxuICAgICAgICAgICAgbWVudVRyaWdnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG1lbnVCbG9jay5oYXNDbGFzcygnZGlzcGxheScpKXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmxvY2sucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBhZ2VOYW1lID09ICd3b3JrJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGFyckl0ZW1zWzBdKS5hZGRDbGFzcygnbWVudS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocGFnZU5hbWUgPT0gJ2Fib3UnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoYXJySXRlbXNbMV0pLmFkZENsYXNzKCdtZW51LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihwYWdlTmFtZSA9PSAnYmxvZycpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChhcnJJdGVtc1syXSkuYWRkQ2xhc3MoJ21lbnUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJsb2NrLmFuaW1hdGUoeydyaWdodCc6IDB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZU9mZiA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIG1lbnVDbG9zZS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbWVudUJsb2NrLmFuaW1hdGUoeydyaWdodCc6IC01MDB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe21lbnVCbG9jay5hZGRDbGFzcygnZGlzcGxheScpfSwgNTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0oKSk7XHJcbiIsInZhciBibHVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXJcclxuICAgICAgICBibHVyU2VjdGlvbiA9ICQoJy5zcGVha2Vycy13cmFwJyksXHJcbiAgICAgICAgYmx1ckJnID0gJCgnLmNvbnQtZm9ybV9fYmctd3JhcCcpLFxyXG4gICAgICAgIGZvcm1CbHVyID0gJCgnLmNvbnQtZm9ybV9fd3JhcCcpO1xyXG5cclxuICAgIGlmKGxvY2F0aW9uLnBhdGhuYW1lID09ICcvd29yay5odG1sJyl7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Qmx1cigpIHtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICBpbWdXaWR0aCA9ICQoJy5zcGVha2Vycy1iZ19faW1nJykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgIGltZ0hlaWdodD0gJCgnLnNwZWFrZXJzLWJnX19pbWcnKS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uTGVmdCA9IGJsdXJTZWN0aW9uLm9mZnNldCgpLmxlZnQgLSBmb3JtQmx1ci5vZmZzZXQoKS5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25Ub3AgPSBibHVyU2VjdGlvbi5vZmZzZXQoKS50b3AgLSBmb3JtQmx1ci5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBibHVyQmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXNpemUnIDogaW1nV2lkdGggKyAncHgnICsgJyAnICsgaW1nSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLXBvc2l0aW9uJyA6IHBvc2l0aW9uTGVmdCArICdweCcgKyAnICcgKyBwb3NpdGlvblRvcCArICdweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldEJsdXIoKTtcclxuICAgIH1cclxufSgpKTtcclxuIiwidmFyIGJsb2dTY3JvbGwgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciAgbmF2TGluayA9ICQoJy5uYXZfX2xpc3QtaXRlbS1saW5rJyk7XHJcbiAgICB2YXIgbmF2SXRlbSA9ICQoJy5uYXZfX2l0ZW0nKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRvU2Nyb2xsIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICBuYXZCbG9nID0gJCgnLm5hdicpLFxyXG4gICAgICAgICAgICAgICAgbmF2Q2xvbmUgPSAkKCcubmF2X191bmRlci1jbG9uZScpO1xyXG4gICAgICAgICAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3U2Nyb2xsID49IDc4MCkge1xyXG4gICAgICAgICAgICAgICAgbmF2QmxvZy5hZGRDbGFzcygnbmF2LWZpeGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG5hdkJsb2cucmVtb3ZlQ2xhc3MoJ25hdi1maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY3JvbGxQb2ludGVkIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbmF2TGluay5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkQXJ0aWNsZSA9ICR0aGlzLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgICAgICAgICBhcnRpY2xlUG9zaXRpb24gPSAkKGlkQXJ0aWNsZSkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AodHJ1ZSkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBhcnRpY2xlUG9zaXRpb259LCA2MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJy5ibG9nLWl0ZW1fX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJy5ibG9nLWl0ZW1fX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmF2QWN0aXZlTGluayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICB2YXIgbmF2TGlua3MgPSAkKCcubmF2X19saXN0LWl0ZW0tbGluaycpO1xyXG4gICAgICAgICAgICAgdmFyIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICB2YXIgbmF2SXRlbXMgPSAkKCcubmF2X19pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICAgdmFyIHNjcm9sbEl0ZW1zID0gbmF2TGlua3MubWFwKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKCQodGhpcykuYXR0cignaHJlZicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoKSB7IHJldHVybiBpdGVtOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJOdW0gPSAwO1xyXG4gICAgICAgICAgICBzY3JvbGxJdGVtcy5lYWNoKGZ1bmN0aW9uKGksIGVsZW0pe1xyXG5cclxuICAgICAgICAgICAgICAgaWYoZWxlbS5vZmZzZXQoKS50b3AgLSAxMDAgPD0gd1Njcm9sbCl7XHJcbiAgICAgICAgICAgICAgICAgICBjdXJyTnVtID0gaTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgLy8gaWYoIW5hdkl0ZW1zLmVxKGN1cnJOdW0pLmhhc0NsYXNzKCdibG9nLWl0ZW1fX2FjdGl2ZScpKXtcclxuICAgICAgICAgICAvLyAgICAgbmF2SXRlbXMuZXEoY3Vyck51bSkuYWRkQ2xhc3MoJ2Jsb2ctaXRlbV9fYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYmxvZy1pdGVtX19hY3RpdmUnKTtcclxuICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIG5hdkl0ZW1zLnJlbW92ZUNsYXNzKCdibG9nLWl0ZW1fX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBuYXZJdGVtcy5lcShjdXJyTnVtKS5hZGRDbGFzcygnYmxvZy1pdGVtX19hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0oKSk7XHJcblxyXG4iLCJpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL3dvcmsuaHRtbCcpe1xyXG5cclxuXHJcbiAgICB2YXIgYnRuTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcmlnaHRfX2J0bi1pdGVtLS1sJyk7XHJcbiAgICB2YXIgYnRuUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItcmlnaHRfX2J0bi1pdGVtLS1yJyk7XHJcbiAgICB2YXIgbGVmdERlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWxlZnRfX2Rlc2MtdGVoJyk7XHJcbiAgICB2YXIgbGVmdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1sZWZ0X19kZXNjLXRpdGxlJyk7XHJcbiAgICB2YXIgc2xpZGVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1sZWZ0X19kZXNjLWxpbmsnKTtcclxuXHJcblxyXG4gICAgdmFyIGRhdGEgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NpbmdsZSBQYWdlIEFwcGxpY2F0aW9uLiBXZWF0aGVyIHdpZGdldCcsXHJcbiAgICAgICAgICAgIGRlc2M6ICdIVE1MLCBDU1MsIGpRdWVyeSwgQWpheCcsXHJcbiAgICAgICAgICAgIGxpbms6ICdodHRwOi8vY2o4NjYxOC50bXdlYi5ydS8nLFxyXG4gICAgICAgICAgICBpbWc6ICcvYXNzZXRzL2ltZy9wcm9qLTEuanBnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0xlbmRpbmcgcGFnZScsXHJcbiAgICAgICAgICAgIGRlc2M6ICdIVE1MLCBMRVNTLCBqUXVlcnknLFxyXG4gICAgICAgICAgICBsaW5rOiAnaHR0cDovL2gtc3dlZXQuY2o4NjYxOC50bXdlYi5ydScsXHJcbiAgICAgICAgICAgIGltZzogJy9hc3NldHMvaW1nL2gtc3dlZXQucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ3dlYnNpdGUgb2YgdGhlIDMnLFxyXG4gICAgICAgICAgICBkZXNjOiAnSFRNTCwgQ1NTLCBKQVZBU0NSSVBULTMzMycsXHJcbiAgICAgICAgICAgIGxpbms6ICcjJyxcclxuICAgICAgICAgICAgaW1nOiAnL2Fzc2V0cy9pbWcvbmV3LTIucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ3dlYnNpdGUgb2YgdGhlIDQnLFxyXG4gICAgICAgICAgICBkZXNjOiAnSFRNTCwgQ1NTLCBKQVZBU0NSSVBULTQ0NDQnLFxyXG4gICAgICAgICAgICBsaW5rOiAnIycsXHJcbiAgICAgICAgICAgIGltZzogJy9hc3NldHMvaW1nL25ldy0zLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBnZXRSZXNTbGlkZXIoJ0dFVCcsICcnKS50aGVuKGZ1bmN0aW9uKHNlcnZSZXMpe1xyXG4gICAgLy8gICAgIGRhdGEucHVzaChzZXJ2UmVzKTtcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgdmFyIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuICAgICBhZGRFbGVtcygpO1xyXG5cclxuICAgIGJ0bkwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgaWYoY291bnQgPj0gZGF0YUxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNvdW50ID0gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRFbGVtcygpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGJ0blIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvdW50LS07XHJcbiAgICAgICAgaWYoY291bnQgPCAwKXtcclxuICAgICAgICAgICAgY291bnQgPSBkYXRhTGVuZ3RoIC0gMTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRFbGVtcygpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEVsZW1zKCl7XHJcbiAgICAgICAgdmFyIHNsaWRlUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXJpZ2h0X19waWMtd3JhcCcpO1xyXG4gICAgICAgIHZhciBzbWFsbFBpY0xlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWJ0bl9fc21hbGwtcGljLWxlZnQnKTtcclxuICAgICAgICB2YXIgc21hbGxQaWNSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItYnRuX19zbWFsbC1waWMtcmlnaHQnKTtcclxuXHJcbiAgICAgICAgdmFyIHByZXYgPSBjb3VudExpbWl0ZXIoY291bnQgLSAxKTtcclxuICAgICAgICB2YXIgbmV4dCA9IGNvdW50TGltaXRlcihjb3VudCArIDEpO1xyXG5cclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgZGF0YVtjb3VudF0uaW1nKTtcclxuICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLXJpZ2h0X19waWMnKTtcclxuICAgICAgICBzbGlkZVJpZ2h0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHNsaWRlUmlnaHQuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgc2xpZGVSaWdodC5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2xpZGVSaWdodC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgZGF0YVtuZXh0XS5pbWcpOyAgICAgLy8gbGVmdFxyXG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdzbGlkZXItYnRuX19zbWFsbC1waWMtaXRlbS1sZWZ0Jyk7XHJcbiAgICAgICAgc21hbGxQaWNMZWZ0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHNtYWxsUGljTGVmdC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBzbWFsbFBpY0xlZnQuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNtYWxsUGljTGVmdC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgZGF0YVtwcmV2XS5pbWcpOyAgICAvLyByaWdodFxyXG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdzbGlkZXItYnRuX19zbWFsbC1waWMtaXRlbS1sZWZ0Jyk7XHJcbiAgICAgICAgc21hbGxQaWNSaWdodC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBzbWFsbFBpY1JpZ2h0LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHNtYWxsUGljUmlnaHQuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNtYWxsUGljUmlnaHQuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgICAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1sZWZ0IHNpZGVcclxuICAgICAgICBsZWZ0VGl0bGUuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgbGVmdFRpdGxlLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGxlZnRUaXRsZS5pbm5lckhUTUwgPSBkYXRhW2NvdW50XS50aXRsZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxlZnRUaXRsZS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICBsZWZ0RGVzYy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBsZWZ0RGVzYy5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBsZWZ0RGVzYy5pbm5lckhUTUwgPSBkYXRhW2NvdW50XS5kZXNjO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGVmdERlc2Muc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgICAgc2xpZGVMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRhdGFbY291bnRdLmxpbmspO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3VudExpbWl0ZXIobnVtKXtcclxuICAgICAgICBpZihudW0gPCAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSA9IGRhdGFMZW5ndGggLTE7XHJcbiAgICAgICAgfWVsc2UgaWYobnVtID49IGRhdGFMZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtID0gMDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlc1NsaWRlcihtYXRoLCB1cmwpe1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgb3BlbihtYXRoLCB1cmwpO1xyXG4gICAgICAgICAgICB4aHIub25sb2FkZW5kID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlcyh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZWooeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbn07XHJcbiIsIiB2YXIgd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL3dvcmsuaHRtbCcpe1xyXG4gICAgICAgIHZhciBzbGlkZVJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1yaWdodCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlkZXJIZWlnaHQoaDEsIGgyKXtcclxuICAgICAgICAgICAgaWYoaDEgPiA5MjApe1xyXG4gICAgICAgICAgICAgICAgc2xpZGVSaWdodC5zdHlsZS5oZWlnaHQgPSBoMiArICdweCc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2xpZGVSaWdodC5zdHlsZS5oZWlnaHQgPSBoMSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzbGlkZXJIZWlnaHQod1dpZHRoICwgd1dpZHRoIC8gMik7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTcGVha2Vyc0JnKHdTaXplKXtcclxuICAgICAgICAgICAgdmFyIHNwZWFrZXJzQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BlYWtlcnMtYmdfX2ltZycpO1xyXG4gICAgICAgICAgICB2YXIgY29udEZvcm1CZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250LWZvcm1fX2JnLXdyYXAnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHdTaXplIDwgMTIwMCAmJiB3U2l6ZSA+IDc2OCl7XHJcbiAgICAgICAgICAgICAgICBzcGVha2Vyc0JnLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1nL3Nwa19iZzEyMDAucG5nJyk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHdTaXplIDwgNzY4ICYmIHdTaXplID4gNDIwKXtcclxuICAgICAgICAgICAgICAgIHNwZWFrZXJzQmcuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWcvc3BrX2JnNzY4LnBuZycpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih3U2l6ZSA8PTQyMCl7XHJcbiAgICAgICAgICAgICAgICBzcGVha2Vyc0JnLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1nL3Nwa19iZzQyMC5wbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRTcGVha2Vyc0JnKHdXaWR0aCk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgc2xpZGVySGVpZ2h0KHdpbmRvdy5pbm5lcldpZHRoICwgd2luZG93LmlubmVyV2lkdGggLyAyKTtcclxuICAgICAgICAgICAgc2V0U3BlYWtlcnNCZyh3aW5kb3cuaW5uZXJXaWR0aCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuLy8gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQURNSU4gUE9TVCBSRVFVRVNUUy0tLS0tLS0tLS0tLS0tXHJcblxyXG5pZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2FkbWluLmh0bWwnKXtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQb3N0KG1hdGgsIHBhdGgsIGRhdGEpe1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4obWF0aCwgcGF0aCk7XHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgICAgICB4aHIub25sb2FkZW5kID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlcyh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7cmVqKHhoci5zdGF0dXNUZXh0KX07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gUG9zdEZpbGUobWF0aCwgcGF0aCwgZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqKXtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihtYXRoLCBwYXRoKTtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJyk7XHJcbiAgICAgICAgICAgIHhoci5vbmxvYWRlbmQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmVzKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKXtyZWooeGhyLnN0YXR1c1RleHQpfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYWRtU2xpZGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkbWluLWJ1dHRvbi0tc2xpZGVyICcpO1xyXG4gICAgdmFyIGJsb2dGaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkbWluLWJsb2dfX2ltcHV0LWltZycpO1xyXG4gICAgdmFyIHNsaWRlckZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRtaW4td29ya19faW5wdXQtZmlsZScpO1xyXG4gICAgXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0gIGJsb2dcclxuICAgIGJsb2dGaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoYmxvZ0ZpbGUudmFsdWUpe1xyXG4gICAgICAgICAgICBQb3N0RmlsZSgnUE9TVCcsICcvdXBsb2FkJywgYmxvZ0ZpbGUudmFsdWUpLnRoZW4oY29uc29sZS5sb2cpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5mb3Jtc1snYmxvZyddLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGJsb2dJbnB1dHMgPSBkb2N1bWVudC5mb3Jtc1snc2tpbGxzJ10uZWxlbWVudHM7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYmxvZ0lucHV0cy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICBpZihibG9nSW5wdXRzW2ldLm5hbWUgPT0gJ2RhdGUnICYmIGJsb2dJbnB1dHNbaV0ubmFtZSA9PSAndGV4dCcgJiYgYmxvZ0lucHV0c1tpXS5uYW1lID09ICd0aXRsZScpe1xyXG4gICAgICAgICAgICAgICAgZGF0YVtibG9nSW5wdXRzW2ldLm5hbWVdID0gYmxvZ0lucHV0c1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgZ2V0UG9zdCgnUE9TVCcsICAnL2Jsb2cnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tICBzbGlkZXJcclxuICAgIHNsaWRlckZpbGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihzbGlkZXJGaWxlLnZhbHVlKXtcclxuICAgICAgICAgICAgLy8gUG9zdEZpbGUoJ1BPU1QnLCAnL3VwbG9hZCcsIHNsaWRlckZpbGUudmFsdWUpLnRoZW4oY29uc29sZS5sb2cpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRtaW4tYnV0dG9uLS1zbGlkZXInKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYWRtU2xpZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBzbGlkZXJGaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkbWluLXdvcmtfX2lucHV0LWZpbGUnKTtcclxuICAgICAgICB2YXIgZm9ybVNsaWRlciA9IGRvY3VtZW50LmZvcm1zWydzbGlkZXInXS5lbGVtZW50cztcclxuICAgICAgICB2YXIgaW5wdXRzID0ge307XHJcblxyXG4gICAgICAgIGlmKHNsaWRlckZpbGUudmFsdWUpe1xyXG4gICAgICAgICAgICBQb3N0RmlsZSgnUE9TVCcsICcvdXBsb2FkJywgc2xpZGVyRmlsZS52YWx1ZSkudGhlbihjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmb3JtU2xpZGVyLmxlbmd0aCA7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGZvcm1TbGlkZXJbaV0udHlwZSA9PSAndGV4dCcpe1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzW2Zvcm1TbGlkZXJbaV0ubmFtZV0gPSBmb3JtU2xpZGVyW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXRzLCBzbGlkZXJGaWxlLnZhbHVlKTtcclxuICAgICAgICBnZXRQb3N0KCdQT1NUJywgICcvc2xpZGVyJywgSlNPTi5zdHJpbmdpZnkoe25hbWU6IGlucHV0cy5uYW1lLCB2YWx1ZTogaW5wdXRzLnZhbHVlfSkpLnRoZW4oY29uc29sZS5sb2cpLmNhdGNoKGNvbnNvbGUubG9nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLS0tLS0tLS0gIHNraWxscyBsZXZlbFxyXG5cclxuICAgIGRvY3VtZW50LmZvcm1zWydza2lsbHMnXS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHNraWxsc0lucHV0cyA9IGRvY3VtZW50LmZvcm1zWydza2lsbHMnXS5lbGVtZW50cztcclxuICAgICAgICB2YXIgaW5wdXRzID0ge307XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBza2lsbHNJbnB1dHMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgaW5wdXRzW3NraWxsc0lucHV0c1tpXS5uYW1lXSA9IHNraWxsc0lucHV0c1tpXS52YWx1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdldFBvc3QoJ1BPU1QnLCAnL3NraWxscycsIEpTT04uc3RyaW5naWZ5KGlucHV0cykpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBza2lsbHNJbnB1dHMudmFsdWUgPSAnJztcclxuICAgICAgICB9KS5jYXRjaChjb25zb2xlLmxvZyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CTE9HIEFORCBBQk9VVCBHRVQgUkVRVUVTVFMtLVxyXG5pZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Fib3V0Lmh0bWwnKXtcclxuICAgIGdldFJlcygnR0VUJywgJy9za2lsbHMnKS50aGVuKGZ1bmN0aW9uKGNpcmNsZURhdGEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNpcmNsZURhdGEpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuIH07XHJcblxyXG5pZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Jsb2cuaHRtbCcpe1xyXG5cclxuICAgIHZhciBhcnRjbFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZXMtd3JhcCcpO1xyXG4gICAgdmFyIG5hdkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saXN0Jyk7XHJcbiAgICBnZXRSZXMoJ0dFVCcsICcvYmxvZycpLnRoZW4oZnVuY3Rpb24oYXJ0Y2xEYXRhKXtcclxuICAgICAgY29uc29sZS5sb2coYXJ0Y2xEYXRhKTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRSZXMobWF0aCwgdXJsKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKG1hdGgsIHVybCk7XHJcbiAgICAgICAgeGhyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJlcyh4aHIucmVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmVqKHhoci5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIGlmKGxvY2F0aW9uLnBhdGhuYW1lID09ICcvYWRtaW4uaHRtbCcpe1xyXG4gICAgICAgdGFicy5zZXQoKTtcclxuICAgIH07XHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Jsb2cuaHRtbCcpe1xyXG4gICAgICAgIGJsb2dTY3JvbGwuc2Nyb2xsUG9pbnRlZCgpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVUbygpO1xyXG4gICAgICAgIG1lbnUuc2xpZGVPZmYoKTtcclxuICAgIH07XHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2luZGV4Lmh0bWwnKXtcclxuICAgICAgICBsb2dpbkZvcm0udmFsaWQoKTtcclxuICAgICAgICBsb2dpbkZvcm0ucGFzcygpO1xyXG4gICAgICAgIGZsaXAuc2V0KCk7XHJcbiAgICB9O1xyXG4gICAgaWYobG9jYXRpb24ucGF0aG5hbWUgPT0gJy8jJyl7XHJcbiAgICAgICAgbG9naW5Gb3JtLnZhbGlkKCk7XHJcbiAgICAgICAgbG9naW5Gb3JtLnBhc3MoKTtcclxuICAgIH07XHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnLyMnKXtcclxuICAgICAgICBsb2dpbkZvcm0udmFsaWQoKTtcclxuICAgIH07XHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL3dvcmsuaHRtbCcpe1xyXG4gICAgICAgIGNvbnRhY3RGb3JtRGF0YS5wb3N0KCk7XHJcbiAgICAgICAgbWVudS5zbGlkZVRvKCk7XHJcbiAgICAgICAgbWVudS5zbGlkZU9mZigpO1xyXG4gICAgfTtcclxuICAgIGlmKGxvY2F0aW9uLnBhdGhuYW1lID09ICcvYWJvdXQuaHRtbCcpe1xyXG4gICAgICAgIGNvbnRhY3RzLmRvd24oKTtcclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzbWFsbFNsaWRlci5kb1NsaWRlKCk7XHJcbiAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgbWVudS5zbGlkZVRvKCk7XHJcbiAgICAgICAgbWVudS5zbGlkZU9mZigpO1xyXG4gICAgfTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG4gICAgYmxvZ1Njcm9sbC5uYXZBY3RpdmVMaW5rKCk7XHJcbiAgICBwYXJhbGxheC5pbml0KCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpKTtcclxuICAgIGJsb2dTY3JvbGwuZG9TY3JvbGwoKTtcclxuXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICBpZihsb2NhdGlvbi5wYXRobmFtZSA9PSAnL2Fib3V0Lmh0bWwnKXtcclxuICAgICAgICBmdW5jdGlvbiBpbml0TWFwKCApe1xyXG4gICAgICAgICAgICB2YXIgY29vcmQgPSB7bGF0OiAzOS43NCwgbG5nOiAtMTA0Ljk4fVxyXG4gICAgICAgICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB6b29tOiAxNCxcclxuICAgICAgICAgICAgICAgIGNlbnRlcjogY29vcmRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIG15TWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbGVtLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGNvb3JkLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBteU1hcCxcclxuICAgICAgICAgICAgICAgIGljb246ICcvYXNzZXRzL2ltZy9tYXJrZXIucG5nJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbml0TWFwKCk7XHJcbiAgICB9O1xyXG5cclxufSk7Il19
