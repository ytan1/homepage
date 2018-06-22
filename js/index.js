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
window.onload = function(){
    lastScrollTop = window.pageYOffset || html.scrollTop
}
var nav = document.getElementsByClassName('nav')[0]
var background = document.getElementsByClassName('background')[0]
var scrollTop = 0
var clientHeight = 0
var scrollHeight = document.documentElement.scrollHeight;
var contents = document.getElementsByClassName('content-block')
window.onscroll = function(){
    scrollTop =  window.pageYOffset || html.scrollTop
    clientHeight = html.clientHeight
    if(scrollTop > 784){
        nav.classList.add('fix-nav')        //fix nav after scrolling down to first content
    }
    else{
        nav.classList.remove('fix-nav')     //unfix it
    }
    background.style.top = 0.5*scrollTop + 'px'        //parallax scrolling
    background.style.height = scrollHeight - 0.5*scrollTop + 'px'   //parallax scrolling set the background height

    console.log(clientHeight)
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
}







//contact ejection
var contacts = document.getElementsByClassName('nav-item')[3]
var contactItem = document.getElementsByClassName('contact-item')
contacts.onclick = function(){
    Array.prototype.forEach.call(contactItem, function(ele){
        ele.classList.toggle('eject')
    })
}