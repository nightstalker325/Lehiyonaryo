const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedPlatforms
let parsedCollisions
let platformCollisionBlocks
let collisionBlocks
let background
let doors

/* const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
} */



const player = new Player({ 
    platformCollisionBlocks,
    imageSrc: './img/Knight_1/idle.png',
    frameRate: 11,
    animations: {
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/Knight_1/IdleLeft.png',
        },
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/Knight_1/IdleRight.png',
        },
        runLeft: {
            frameRate: 7,
            frameBuffer: 7,
            loop: true,
            imageSrc: './img/Knight_1/RunLeftM.png',
        },
        runRight: {
            frameRate: 7,
            frameBuffer: 6,
            loop: true,
            imageSrc: './img/Knight_1/RunRightM.png',
        },
        jumpRight: {
            frameRate: 3,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/Knight_1/jumpRight.png',
        },
        fallRight: {
            frameRate: 3,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/Knight_1/fallRight.png',
        },
        jumpLeft: {
            frameRate: 3,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/Knight_1/jumpLeft.png',
        },
        fallLeft: {
            frameRate: 3,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/Knight_1/fallLeft.png',
        },
        attackRight: {
            frameRate: 5,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/Knight_1/attackRight.png',
        },
        enterIdle: {
            frameRate: 6,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/Knight_1/IdleRight.png',
            onComplete: () => {
                console.log('MAP COMPLETED!')
                gsap.to(overlay, {
                    opacity:1,
                    onComplete: () => {
                        level++

                        if (level === 3) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    },
                })
            },
        },
    },
})


const enemy = new Enemy({
    imageSrc: './img/DogPlant/Idle1.png',
    frameRate: 8,
    animations: {
        walkLeft: {
            frameRate: 6,
            frameBuffer: 7,
            loop: true,
            imageSrc: './img/DogPlant/Walk.png',
        },
        idleLeft: {
            frameRate: 8,
            frameBuffer: 9,
            loop: true,
            imageSrc: './img/DogPlant/Idle1.png',
        },
    },
})


let level = 1
let levels = {
    1: {
        init: ()=> {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            parsedPlatforms = platformCollisionsLvl1.platform2D()
            platformCollisionBlocks = parsedPlatforms.createPlatformFrom2D()
            player.platformCollisionBlocks = platformCollisionBlocks
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false
            player.position.x = 100
            player.position.y = 296
            background = new Sprite ({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/background_lvl1N.png',
            })
            doors = [
                new Sprite ({
                    position: {
                        x:900,
                        y:300,
                    },
                    imageSrc: './img/fenceOpen.png',
                    frameRate: 4,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
            
        },
    },
    2: {
        init: ()=> {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            parsedPlatforms = platformCollisionsLvl2.platform2D()
            platformCollisionBlocks = parsedPlatforms.createPlatformFrom2D()
            player.platformCollisionBlocks = platformCollisionBlocks
            player.collisionBlocks = collisionBlocks
            enemy.collisionBlocks = collisionBlocks
            player.position.x = 15
            player.position.y = 296
            enemy.position.x = 600
            enemy.position.y = 250

            if (player.currentAnimation) player.currentAnimation.isActive = false
            background = new Sprite ({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/bg_lvl2.png',
            })
            doors = [
                new Sprite ({
                    position: {
                        x:900,
                        y:234,
                    },
                    imageSrc: './img/fenceOpen.png',
                    frameRate: 4,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
            
        },
    },
    3: {
        init: ()=> {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectFrom2D()
            parsedPlatforms = platformCollisionsLvl3.platform2D()
            platformCollisionBlocks = parsedPlatforms.createPlatformFrom2D()
            player.platformCollisionBlocks = platformCollisionBlocks
            player.collisionBlocks = collisionBlocks
            player.position.x = 15
            player.position.y = 25

            if (player.currentAnimation) player.currentAnimation.isActive = false
            background = new Sprite ({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/bg_lvl3.png',
            })
            doors = [
                new Sprite ({
                    position: {
                        x:889,
                        y:364,
                    },
                    imageSrc: './img/sideWallOpen.png',
                    frameRate: 4,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
            
        },
    },
}

const key = {
    w: {
       pressed: false, 
    },
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

const overlay = {
    opacity: 0 
}

function determineWinner({player,enemy, timerId }) {
    clearTimeout(timerId) 
    document.querySelector('#displayText').style.display = "flex"
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = "TIE"
    }
    else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = "YOU WIN!"
        document.querySelector('#displayText').style.display = "flex"
    }
    else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = "YOU LOSE!"
        document.querySelector('#displayText').style.display = "flex"
    }
}
let timer = 51
let timerId
function decreaseTimer() {
    
    if (timer > 0) {
        timerId = setTimeout (decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player,enemy,timerId})
    }
}
decreaseTimer()
function animate(){
    window.requestAnimationFrame(animate)
    c.save()
    background.draw()
    c.restore()

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw()
    })

    platformCollisionBlocks.forEach((platformCollisionBlock) => {
        platformCollisionBlock.draw()
    })

    doors.forEach((door) => {
        door.draw()
    })


    player.handleInput(key)
    player.draw()
    player.update()

    enemy.draw()
    enemy.update()

    if (enemy.health <=0 || player.health <=0) {
        determineWinner({player,enemy,timerId})
    }
    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect (0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()

