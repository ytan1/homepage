(function(){
    //smooth scrolling
    var html = document.documentElement
    var smoothScroll = function(e){
        var element = e.target || e.which;
        while(element !=null && element.tagName.toLowerCase() != 'a'){      //<a><div><svg>...</svg></div></a>   iterate to get a tag or null
            element = element.parentElement;  
        }
        if(element ==null){
            return;
        }
               
        var href = element.getAttribute('href');
        if(href && href.indexOf('#') >= 0){
            if(element.pathname.replace(/^\//, '') === location.pathname.replace(/^\//, '') && element.hostname === location.hostname){
               
                var target = document.getElementById(href.match(/#\w*$/)[0].slice(1));
                if(target){
                    
                    e.preventDefault();
                    // var html = document.getElementsByTagName('html')[0]; //body not work
                    var start = html.scrollTop;
                    var diff = target.offsetTop + target.offsetParent.offsetTop - start;  //target.offsetParent is div.content
                    //scroll 15px for 5ms
                    var INTERVAL= 4;   //5ms
                    var VELOCITY = 20; //px for every INTERVAL
                    var segments = diff/VELOCITY
                    if(diff < 0){
                        segments = - segments
                        VELOCITY = - VELOCITY
                    }
                    var s = setInterval(function(){
                        html.scrollTop = html.scrollTop + VELOCITY; //length

                    }, INTERVAL); //interval time
                    setTimeout(function(){
                        window.clearInterval(s)
                        location.hash = href
                    }, segments*INTERVAL);

                }
            }
        }
    }
    document.getElementsByClassName('nav')[0].onclick = function(e){ smoothScroll(e) }
    document.getElementsByClassName('header-bottom')[0].onclick = function(e){ smoothScroll(e) }
    // document.getElementsByClassName('intro')[0].getElementsByTagName('a')[0].onclick = function(e){ smoothScroll(e) }
    var goTop = document.getElementsByClassName('gotop')[0]
    goTop.onclick = function(e){ smoothScroll(e) }







    //insert animation to title
    var titleContainer = document.getElementsByClassName('title-anim')[0]
    var animation = bodymovin.loadAnimation({
        container: titleContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'title.json'
    })
    // for infinite of animation from 9s~15s, frame rate is 30
    animation.playSegments([280,450], false)
    //for hover on title
    var gameContainer = document.getElementsByClassName('title-game')[0]
    gameContainer.onmouseover = function(){                 // hover on game element to control a silbing element
        titleContainer.classList.add('semi-transparent')
    }
    gameContainer.onmouseout = function(){
        titleContainer.classList.remove('semi-transparent')
    }
    //game 
    var isPlaying = false
    gameContainer.onclick = function(){
        if(isPlaying){
            return
        }
        isPlaying = true //avoid generate game more than once
        titleContainer.style.display = 'none'
        gameContainer.classList.add('non-transparent')
        var gameHorizon = document.getElementById('game-horizon')
        var game = new Game(gameHorizon)

        game.start()

    }
    //scrolling down arrow in the header bottom
    var arrowDown = document.getElementsByClassName('arrow-down')[0]
    var headBottomAnimation = bodymovin.loadAnimation({
        container: arrowDown,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'arrowDown.json'
    })




    //for nav bar scrolling, parallax scrolling and (fake) rendering after scroll
    var lastScrollTop = 0
    var beginTop = 2700, endTop = 2800, beginOrigin = -250, endOrigin = 350, ratio = (endOrigin - beginOrigin)/(endTop - beginTop)
    var skills = document.getElementsByClassName('skill')
    window.onload = function(){
        lastScrollTop = window.pageYOffset || html.scrollTop
        //for perspective-origin of skill cards
        var perspectiveOrigin = '50% 50%'
        if(lastScrollTop > beginTop && lastScrollTop < endTop){
            perspectiveOrigin = '200% ' + (ratio * (lastScrollTop - beginTop) + beginOrigin) + '%' // horizontal vertical
            Array.prototype.forEach.call(skills, function(ele){
                ele.style.perspectiveOrigin = perspectiveOrigin
            })
        }else if(lastScrollTop < beginTop){
            perspectiveOrigin = '200% ' + beginOrigin + '%' // horizontal vertical
            Array.prototype.forEach.call(skills, function(ele){
                ele.style.perspectiveOrigin = perspectiveOrigin
            })
        }else if(lastScrollTop > endTop){
            perspectiveOrigin = '200% ' + endOrigin + '%' // horizontal vertical
            Array.prototype.forEach.call(skills, function(ele){
                ele.style.perspectiveOrigin = perspectiveOrigin
            })
        }

    }
    var nav = document.getElementsByClassName('nav')[0]
    var background = document.getElementsByClassName('background')[0]
    var scrollTop = 0, scrollLeft = 0
    var clientHeight = 0
    var scrollHeight = document.getElementsByTagName('body')[0].scrollHeight;
    var contents = document.getElementsByClassName('content-block')
    var altNav = document.getElementsByClassName('alt-nav')[0]
    
    window.onscroll = function(){
        scrollLeft = window.PageXOffset || html.scrollLeft || document.body.scrollLeft
        scrollTop =  window.pageYOffset || html.scrollTop || document.body.scrollTop
        clientHeight = html.clientHeight
        if(scrollTop > 500){
            goTop.classList.add('showup')
        }else{
            goTop.classList.remove('showup')
        }
        if(scrollTop > 784){
            nav.classList.add('fix-nav')        //fix nav after scrolling down to first content
        }
        else{
            nav.classList.remove('fix-nav')     //unfix it
        }
        background.style.top = 0.5*scrollTop + 'px'        //parallax scrolling
        // background.style.height = scrollHeight - 0.5*scrollTop + 'px'   //parallax scrolling set the background height
        // background.style.bottom = 0 + 'px'
        //render content block when scrolling into
        if(scrollTop > lastScrollTop){
            //scrolling down 

            Array.prototype.forEach.call(contents, function(ele){
                if((scrollTop + clientHeight - 100) > (ele.offsetTop + ele.offsetParent.offsetTop)){
                    if(!ele.classList.contains('fade-in')){
                        
                        ele.classList.add('fade-in')
                    }
                }
                if(scrollTop + 100 > (ele.offsetTop + ele.offsetParent.offsetTop + ele.offsetHeight)){
                    if(ele.classList.contains('fade-in')){
                        ele.classList.remove('fade-in')
                    }
                }
            })
        }else{
            //scrolling up
            Array.prototype.forEach.call(contents, function(ele){
                //the order of two if blocks must not be changed !!!
                if(scrollTop + 100 < (ele.offsetTop + ele.offsetParent.offsetTop + ele.offsetHeight)){
                    if(!ele.classList.contains('fade-in')){
                        ele.classList.add('fade-in')
                    }
                }
                if((scrollTop + clientHeight - 100) < (ele.offsetTop + ele.offsetParent.offsetTop)){
                    if(ele.classList.contains('fade-in')){
                        ele.classList.remove('fade-in')
                    }
                }
            })
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        //perspective of flip card
        // var beginTop = 2500, endTop = 3136, beginOrigin = -200, endOrigin = 300, ratio = (endOrigin - beginOrigin)/(endTop - beginTop) move to top
        // var skills = document.getElementsByClassName('skill') move to top
        var perspectiveOrigin = '50% 50%'
        if(scrollTop > beginTop && scrollTop < endTop){
            perspectiveOrigin = '200% ' + (ratio * (scrollTop - beginTop) + beginOrigin) + '%' // horizontal vertical
            Array.prototype.forEach.call(skills, function(ele){
                ele.style.perspectiveOrigin = perspectiveOrigin
            })
        }
        
        //the fix alt-nav scroll on x-axis
        altNav.style.left = -scrollLeft + 'px'
    }







    //contact ejection
    var contacts = document.getElementsByClassName('nav-item')[3]
    var contactItem = document.getElementsByClassName('contact-item')
    contacts.onclick = function(){
        Array.prototype.forEach.call(contactItem, function(ele){
            ele.classList.toggle('eject')
        })
    }
    var altContacts = document.getElementsByClassName('alt-nav-item')[3]
    var altContactItem = document.getElementsByClassName('alt-contact-item')
    altContacts.onclick = function(){
        Array.prototype.forEach.call(altContactItem, function(ele){
            ele.classList.toggle('eject')
        })
    }
    //carousel in app
    var carousel = new Carousel()
    carousel.build(document.getElementsByClassName('app-carousel')[0])



    //scartch behaviour
    var canvas = document.getElementById('canvas')
    var top = document.getElementById('scratch-top')
    var scratchCard = new ScratchCard()
    scratchCard.build(canvas)



    //flip behaviour
    var flipCard = new FlipCard()
    var skill2 = document.getElementById('skill2')
    flipCard.build(skill2, '#5E9AF9', 0.7)
    var skill3 = document.getElementById('skill3')
    var skill4 = document.getElementById('skill4')
    var skill5 = document.getElementById('skill5')
    var skill6 = document.getElementById('skill6')
    flipCard.build(skill3, '#1A2A4C', 0.7, true) //true means flip vertically
    flipCard.build(skill4, '#25FC66', 0.7)
    flipCard.build(skill5, '#FEFFF7', 0.7, true)
    flipCard.build(skill6, '#4D2493', 0.7)
    


})()  