//smooth scrolling

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
                var html = document.getElementsByTagName('html')[0]; //body not work
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

var arrowDown = document.getElementsByClassName('arrow-down')[0]
var headBottomAnimation = bodymovin.loadAnimation({
    container: arrowDown,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'arrowDown.json'
})




//for nav bar scrolling
var nav = document.getElementsByClassName('nav')[0]
window.onscroll = function(){
    console.log('test')
    if(document.documentElement.scrollTop > 784){
        nav.classList.add('fix-nav')
    }
    else{
        nav.classList.remove('fix-nav')
    }
}