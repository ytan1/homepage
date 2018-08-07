
var Game = function(container){

    //some constant or flag
    var t = 0
    var cactusINTERVAL = 1750
    var movingINTERVAL = 10
    var MOVEMENT = 3
    var newCactus, cactusInside
    var rightLimit = container.offsetWidth/120*110
    var isJump = false
    var gameRunning = null
    
    var feet, dinoLeft, dinoRight, cactusLeft, cactusRight, cactusTop
    var jumping = new Jumping()
    //the animation from ae
    var runAmin = null
    var hintAmin = null

    var dinosaur = document.createElement('div')
    var dinosaurInside = document.createElement('div')
    var gameover = document.createElement('div')
    var gameoverInside = document.createElement('div')
    //insert the dinosaur div, build an extra div 'dinosaurInside' to workaround the scaling of svg from Affter effects
    dinosaur.classList.add('dinosaur')
    dinosaurInside.classList.add('dinosaur-inside')
    gameover.classList.add('gameover')
    gameoverInside.classList.add('gameover-inside')
    container.appendChild(dinosaur)         //notice: append work in chrome, not in IE mozilla. Use appendChild instead
    dinosaur.appendChild(dinosaurInside)
    container.appendChild(gameover)
    gameover.appendChild(gameoverInside)
    var controllHeader = container.parentElement.parentElement.parentElement //for click event on header to jump

    //start the game, inserting cactus
    var start = function(){
        
        dinosaur.style.bottom = '0px'
        //this controls the jumping action of dinosaur
        jumping.addjumper(dinosaur)
        //load animation  , clear if there is dinosaurInTears animation
        if(runAmin != null){
            runAmin.destroy()
        }
        runAmin = bodymovin.loadAnimation({
            container: dinosaurInside,
            renderer: 'html',            // not using svg or canvas because of blurry image bug in Chrome when transformed, still rendered a svg?
            loop: true,
            autoplay: true,
            path: 'dinosaur.json'
        })
        //minimal time frame of the game
        cactusMoving()
        //bindevent
        bindEvent()
    }

    var cactusMoving = function(){
        gameRunning = setInterval(function(){
            //generate random num to check if insert a new cactus, every .8s
            if(t%cactusINTERVAL === 0){
                
                generateCactus(Math.floor(Math.random()*2))
                
            }
            //let cactus move
            var allCactus = document.getElementsByClassName('cactus')
            //convert HTMLcollection to an array and Array.from(allcactus) not for IE and moz
            Array.prototype.forEach.call(allCactus, function(element){
                element.style.right = parseInt(element.style.right) + MOVEMENT + 'px'
                //check if the cactus is outside of game zone
                if(parseInt(element.style.right) > rightLimit){
                    element.remove()
                    return
                }
                //check collision
                check(dinosaur, element)
            })
            //record the time to generate a cactus
            t = t + movingINTERVAL
        }, movingINTERVAL)
    }

    var check = function(dinosaur, ele){
        //check collision of dinosaur and cactus   there is no offsetBottom or offsetRight!!!!!!!!!
        feet = dinosaur.offsetHeight + dinosaur.offsetTop
        dinoLeft = dinosaur.offsetLeft
        dinoRight = dinosaur.offsetWidth + dinoLeft - 25
        cactusLeft = ele.offsetLeft
        cactusRight = ele.offsetWidth + cactusLeft
        cactusTop = ele.offsetTop
        if(feet > cactusTop &&
               ((cactusLeft > dinoLeft && cactusLeft < dinoRight) || (cactusRight > dinoLeft && cactusRight < dinoRight))){
           //stop the game
            console.log('stop')
           stop()
        }
    }

    var stop = function(){
        clearInterval(gameRunning)
        gameRunning = null
        //stop jumping stay on cactus
        jumping.stayInAir()
        document.onkeydown = function(e){
            if(e.keyCode == 32){
                //don't scroll down
                e.preventDefault()
            }
        }
        controllHeader.onclick = null
        //dinosaur in tears
        runAmin.destroy()
        runAmin = bodymovin.loadAnimation({
            container: dinosaurInside,
            renderer: 'html',            // not using svg or canvas because of blurry image bug in Chrome when transformed, still rendered a svg?
            loop: true,
            autoplay: true,
            path: 'dinosaurInTears.json'
        })
        //add gameover and restart sign
        gameover.style.display = 'block'
        gameover.onclick = function(){ startAgain() }
        if( hintAmin != null){
            hintAmin.destroy()
        }
        hintAmin = bodymovin.loadAnimation({
            container: gameoverInside,
            renderer: 'html',            // not using svg or canvas because of blurry image bug in Chrome when transformed, still rendered a svg?
            loop: true,
            autoplay: true,
            path: 'gameover.json'
        })
    }
  
    //keyboard and mouse control
    var bindEvent = function(){
        //press space to jump
        document.onkeydown = function(e){
            if(e.keyCode == 32){
                //don't scroll down
                e.preventDefault()
                //can not jump in the air so 
                if(isJump == true){
                    return
                }
                //otherwise
                isJump = true
                setTimeout(function(){
                    isJump = false
                }, 1000)
                //jump!
                jumping.start()
            }
        }
        //click or tap to jump
        setTimeout(function(){
            controllHeader.onclick = function(e){
                e.preventDefault()
                //same thing as above
                if(isJump == true){
                    return
                }
                //otherwise
                isJump = true
                setTimeout(function(){
                    isJump = false
                }, 1000)
                //jump!
                jumping.start()
            }
        }, 200)
        
       
    }

    var generateCactus = function(number){
        if(number != 0 && number != 1){
            return
        }
        newCactus = document.createElement('div')
        newCactus.classList.add('cactus')
        newCactus.classList.add('cactus' + number) //type of the cactus
        cactusInside = document.createElement('div')
        cactusInside.classList.add('cactusInside')
        //add inline style, for changing position above
        newCactus.style.right = '0px'
        container.appendChild(newCactus)
        newCactus.appendChild(cactusInside)
        cactusAmin = bodymovin.loadAnimation({
            container: cactusInside,
            renderer: 'svg',            // not using svg or canvas because of blurry image bug in Chrome when transformed, still rendered a svg?
            loop: true,
            autoplay: true,
            path: 'cactus' + number + '.json'
        })
    }

    var startAgain = function(){
        gameover.onclick = null 
        var allCactus = document.getElementsByClassName('cactus')
        //remove cactus
        Array.prototype.forEach.call(allCactus, function(element){
            element.remove()
        })
        allCactus = document.getElementsByClassName('cactus')   //a bug here: cactus div in the middle need to remove twice. ???
        //remove cactus
        Array.prototype.forEach.call(allCactus, function(element){
            element.remove()
        })
        //start
        gameover.style.display = 'none'
        start()
        
        
    }

    //API export
    this.start = start
}

var Jumping = function(){  
    //set some constants
    var jumpHeight = 160   // px
    var jumpTime = 700  //  ms
    // var jumpInitVelo = 10   //  px/ms
    var jumpINTERVAL = 5  // ms
    var gravity = 8*jumpHeight/jumpTime/jumpTime          
    var jumpInitV = 0.5*jumpTime*gravity
    //calculate the gravity and initial velocity  (1/125px/ms^2, 4 px/ms according to constants above) 
    var time = 0
    var c = null
    var jumper = null

    var addjumper = function(container){
        jumper = container
    }

    var start = function(){
        if(jumper == null){
            console.log('No jumper container is assigned')
            return
        }
        c = setInterval(function(){
            time = time + jumpINTERVAL
            jumper.style.bottom = Math.round(jumpInitV*time - 0.5*gravity*time*time) + 'px'
            if(parseInt(jumper.style.bottom) < 0){
                onGround()          
            }
        }, jumpINTERVAL)
    }
    
    
    var onGround = function(){
        clearInterval(c)
        //must set c to null, otherwise will not jump again
        c = null
        time = 0
        jumper.style.bottom = '0px'
    }

    var stayInAir = function(){
        if(c != null){
            clearInterval(c)
            c = null
            time = 0
        }
        
    }

    //api
    this.stayInAir = stayInAir
    this.start = start
    this.addjumper = addjumper
}