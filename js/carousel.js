var Carousel = function(){
    var build = function(ele){
        if(!!isElement(ele)){
            var slider = tns({
                container: ele,
                items: 1,
                slideBy: 'page',
                mode: 'gallery',
                controls: false,
                nav:true,
                navContainer: ele.parentElement.getElementsByClassName('dots')[0],
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause:true,
                autoplayButton: false,
                autoplayButtonOutput: false
                
                
            });
        }
    }
    //check if is a HTML DOM element
    function isElement(o){
        return (
            typeof HTMLElement === "function" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }

    this.build = build
}