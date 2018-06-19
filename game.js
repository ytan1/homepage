var Game = function(container){

    //some constant or flag
    var t = 0
    var cactusINTERVAL = 1750
    var movingINTERVAL = 10
    var MOVEMENT = 2
    var newCactus
    var rightLimit = container.offsetWidth/120*110
    var isJump = false

    //start the game, inserting cactus
    var start = function(){

        //insert the dinosaur div, build an extra div 'dinosaurInside' to workaround the scaling of svg from Affter effects
        var dinosaur = document.createElement('div')
        dinosaur.classList.add('dinosaur')
        var dinosaurInside = document.createElement('div')
        dinosaurInside.classList.add('dinosaur-inside')
        container.append(dinosaur)
        dinosaur.append(dinosaurInside)
        var runAmin = bodymovin.loadAnimation({
            container: dinosaurInside,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'dinosaur.json'
        })

        //minimal time frame of the game
        setInterval(function(){

            //generate random num to check if insert a new cactus, every .8s
            if(t%cactusINTERVAL === 0){
                if(Math.floor(Math.random()*2) === 0){
                    newCactus = document.createElement('div')
                    newCactus.classList.add('cactus')
                    //add inline style, for changing position below
                    newCactus.style.right = '0px'
                    container.append(newCactus)
                }
            }

            //let cactus move
            var allCactus = document.getElementsByClassName('cactus')
            //convert HTMLcollection to an array
            Array.from(allCactus).forEach(function(element){
                element.style.right = parseInt(element.style.right) + MOVEMENT + 'px'
                //check if the cactus is outside of game zone
                if(parseInt(element.style.right) > rightLimit){
                    element.remove()
                    return
                }
            })
            

            t = t + movingINTERVAL
        }, movingINTERVAL)

        //bindevent
        bindEvent()
    }

    //this function add a css class containing translateY to let the dinosaur jump
    var jump = function(){
        //find the element
        var dinosaur = document.getElementsByClassName('dinosaur')[0]
        if(dinosaur != null){

            if(dinosaur.classList.contains('jump')){
               console.log(dinosaur.classList)
            }else{
                dinosaur.classList.add('jump')
                console.log(dinosaur.classList)
                setTimeout(function(){
                    dinosaur.classList.remove('jump')
                }, 1000)

            }
            
        }
        

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
                jump()

            }
        }
    }





    //API export
    this.start = start
}