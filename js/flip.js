var FlipCard = function(){
    var container, side, width, height, thickness = 20
    var build = function(con, color, vertical){
        container = con
        var frontDiv = container.children[0]
        var backDiv = container.children[1]
        width = parseInt(container.style.width)
        height = parseInt(container.style.height)
        

        if(navigator.sayswho.indexOf('IE') === -1){
            //non IE support transform style perspective
            //class for container
            //class for container
            if(!vertical){
                container.classList.add('flip-container')
                console.log(backDiv)
                backDiv.setAttribute('style', addTransform('rotateY(180deg) translateZ(' + thickness/2 + 'px)', width, height, color))
            }else{
                container.classList.add('flip-container-vertical')
                backDiv.setAttribute('style', addTransform('rotateX(180deg) translateZ(' + thickness/2 + 'px)', width, height, color))
            }
            
            //set the size of side facets
            frontDiv.setAttribute('style', addTransform('translateZ(' + thickness/2 + 'px)', width, height, color))
            
            //for left side
            side = document.createElement('div')
            side.setAttribute('style', addTransform('rotateY(-90deg) ' + 'translateZ(' + width/2 + 'px)', thickness, height, color))
            container.append(side)

            //for right side
            side = document.createElement('div')
            side.setAttribute('style', addTransform('rotateY(90deg) ' + 'translateZ(' + width/2 + 'px)', thickness, height, color))
            container.append(side)
            //for top side
            side = document.createElement('div')
            side.setAttribute('style', addTransform('rotateX(90deg) ' + 'translateZ(' + height/2 + 'px)', width, thickness, color))
            container.append(side)
            //for bottom side
            side = document.createElement('div')
            side.setAttribute('style', addTransform('rotateX(-90deg) ' + 'translateZ(' + height/2 + 'px)', width, thickness, color))
            container.append(side)
        }
        else{
            //IE workaround, only front and back
            //class for container
            if(!vertical){
                container.classList.add('flip-container')
                console.log(backDiv)
                backDiv.setAttribute('style', addTransform('rotateY(180deg) translateZ(' + thickness/2 + 'px)', width, height, color))
                backDiv.style.opacity = '0';

            }else{
                container.classList.add('flip-container-vertical')
                backDiv.setAttribute('style', addTransform('rotateX(180deg) translateZ(' + thickness/2 + 'px)', width, height, color))
                backDiv.style.opacity = '0';
            }
            var parent = container.parentElement
            console.log(parent)
            parent.onmouseover = function(){
                setTimeout(function(){
                    backDiv.style.opacity = '1'
                    frontDiv.style.opacity = '0'
                }, 300)
            }
            parent.onmouseout = function(){
                setTimeout(function(){backDiv.style.opacity = '0';frontDiv.style.opacity = '1'}, 300)
            }
            //set the size of side facets
            frontDiv.setAttribute('style', addTransform('translateZ(' + thickness/2 + 'px)', width, height, color))
        }
    }
    //add some inline style 
    var addTransform = function(transform, width, height, color){
        return (
            'width:' + width + 'px;' + 
            'height:' + height + 'px;' + 
            'position: absolute;' + 
            'top: 50%;' + 
            'left: 50%;' + 
            'margin-left: -' + width/2 + 'px;' +
            'margin-top: -' + height/2 + 'px;' +
            'transform:' + transform + ';' + 
            'MozTransform:' + transform + ';' + 
            'msTransform:' + transform + ';' + 
            'Webkittransform:' + transform + ';' + 
            'background:' + color + ';' 
        )
    }

    this.build = build
}

//check the browser version https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();