class Player extends Sprite{
    constructor({collisionBlocks = [], platformCollisionBlocks = [], imageSrc, frameRate, animations, loop}){
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200,
        }

        this.velocity = {
            x:0,        
            y:0,
        }

        this.sides = {
            bottom: this.position.y + this.height,
        }
        this.gravity = .55

        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
        this.health = 100
        this.isAttacking = false
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            // position: this.position,
            width: 40,
            height: 10,
        }
    }   

    update(){
        //this is bluebox
        /*c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //*/
        this.position.x += this.velocity.x
        this.attackBox.position.x = this.position.x + 85
        this.attackBox.position.y = this.position.y + 50
        this.updateHitbox ()

        this.checkHorizontalUpdate()
        this.applyGravity()

        this.updateHitbox ()

        if (this.isAttacking){
        c.fillStyle = 'rgba(255, 0, 0, .5)'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

        /*c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y,
           this.hitBox.width, this.hitBox.height) //*/

        this.checkPlatformUpdate()
        this.checkVerticalUpdate()
        this.attackUpdate()
    }
    
    handleInput(key){
        if (this.preventInput) return
        player.velocity.x = 0
        if (key.d.pressed) {
            this.switchSprite('runRight')
            this.velocity.x = 2
            this.lastDirection = 'right'
        } else if (key.a.pressed) {
            this.switchSprite('runLeft')
            this.velocity.x = -2
            this.lastDirection = 'left'
            }  
        else {
            if (this.lastDirection === 'left') this.switchSprite('idleLeft')
            else this.switchSprite('idleRight')}
    
        
        if (player.velocity.y < 0) {
            if (player.lastDirection === 'left') player.switchSprite('jumpLeft')
            else player.switchSprite ('jumpRight')}
        if (player.velocity.y > 0) {
            if (player.lastDirection === 'right') player.switchSprite('fallRight')
            else if (player.lastDirection === 'left') player.switchSprite('fallLeft')
        }
    }
    switchSprite(name) {
        console.log("Switching to", name);
        if (name === 'attackRight') {
            player.isAttacking = true
        }
        if (this.image === this.animations[name].image || !this.loaded) return 
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    updateHitbox() {
        this.hitBox = {
            position:   {
                x: this.position.x + 74.5,
                y: this.position.y + 24, //y of 24
            },
            width: 22,
            height: 63, // height of 63
        }   
    }

    attack(){
        if (this.health <= 0) {
            return; // do not attack if health is less than or equal to 0
        }
        this.switchSprite('attackRight')
        setTimeout (() => {
            this.isAttacking = false
            if (this.lastDirection === 'left') this.switchSprite('idleLeft')
            else this.switchSprite('idleRight')
        }, 200)
    } 
    
    
    checkHorizontalUpdate() {         //this check horizontal collision
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            //detect collision
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            )   {                   
                //collision on y axis going to the left 
                if (this.velocity.x < 0) {
                    const offset = this.hitBox.position.x - this.position.x
                    this.position.x = 
                    collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = 
                        this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        } 
    }
    applyGravity() {     //apply gravity

            this.velocity.y += this.gravity 
            this.position.y += this.velocity.y
    }
    checkVerticalUpdate(){      //check for vertical update
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //detect collision
            if (
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            )   {                   
                //collision on x axis going to the left 
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = 
                    collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y =
                    collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        } 
    }
    checkPlatformUpdate() {
        //platform collision blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]
            //detect collision
            if (
                this.hitBox.position.x <= platformCollisionBlock.position.x + platformCollisionBlock.width && 
                this.hitBox.position.x + this.hitBox.width >= platformCollisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= platformCollisionBlock.position.y &&
                this.hitBox.position.y + this.hitBox.height <= platformCollisionBlock.position.y + platformCollisionBlock.height
            )   {                   
                //collision on y axis going up
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y =
                    platformCollisionBlock.position.y - offset - 0.01
                    break
                }
            }
        } 
    }
    attackUpdate(){
        if (this.health > 0) {
            if (
            player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
            player.attackBox.position.x <= enemy.hitBox.position.x + enemy.hitBox.width &&
            player.attackBox.position.y + player.attackBox.height >= enemy.hitBox.position.y &&
            player.attackBox.position.y <= enemy.hitBox.position.y + enemy.hitBox.height &&
            player.isAttacking) {
                player.isAttacking = false;
                enemy.health -= 20
                gsap.to('#enemyHealth', {
                    width: enemy.health + '%',
                  })
            }
        }
    }
}
