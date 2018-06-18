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