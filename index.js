//smooth scrolling
document.getElementsByClassName('nav')[0].onclick = function(e){
    var element = e.target || e.which;
    var href = element.getAttribute('href');
    if(href && href.indexOf('#') >= 0){
        if(element.pathname.replace(/^\//, '') === location.pathname.replace(/^\//, '') && element.hostname === location.hostname){
            var target = document.getElementById(href.match(/#\w*$/)[0].slice(1));
            if(target){
                e.preventDefault();
                var html = document.getElementsByTagName('html')[0];
                var start = html.scrollTop;
                var diff = target.offsetTop - start;
                var s = setInterval(function(){
                    html.scrollTop = html.scrollTop + diff/30;

                }, 10);
                setTimeout(function(){
                    window.clearInterval(s)
                }, 300);

            }
        }
    }
}

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
gameContainer.onmouseover = function(){
    titleContainer.classList.add('semi-transparent')
}
gameContainer.onmouseout = function(){
    titleContainer.classList.remove('semi-transparent')
}

//game 
var gameHorizon = document.getElementById('game-horizon')
var game = new Game(gameHorizon)
game.start()


