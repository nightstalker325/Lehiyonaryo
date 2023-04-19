class Enemy extends Sprite{
    constructor({collisionBlocks = [], x, y, speed, imageSrc, frameRate, animations, loop}) {
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

        this.x = x
        this.y = y
        this.speed = 1;

        this.collisionBlocks = collisionBlocks
        this.playerCollision
        this.collisionDetected

        this.health = 100
        this.isAttacking
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 40,
            height: 30,
        }

        setInterval(() => {
            if (this.direction === 'left') {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }, 1000)
    }

    update() {
        /*c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //*/
        this.position.x += this.velocity.x
        this.attackBox.position.x = this.position.x - 20
        this.attackBox.position.y = this.position.y + 50

        this.updateHitbox()

        /*c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y,
           this.hitBox.width, this.hitBox.height)//*/
        
        if (this.isAttacking && 
          enemy.attackBox.position.x <= player.position.x + player.width &&
          enemy.attackBox.position.x + enemy.attackBox.width <= player.position.x + player.width
          //enemy.attackBox.position.x >= player.position.x + player.width
          ){
            c.fillStyle = 'rgba(255, 0, 0, .5)'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)}

        this.checkHorizontalUpdate()
        this.applyGravity()
        this.updateHitbox()
        this.checkVerticalUpdate()
        this.attackUpdate()
        //this.moveLeft()
        /*if (this.direction === 'left') {
            this.velocity.x += -.1;
        } else if (this.direction === 'right') {
            this.velocity.x += .1;
        }*/
        
    }

    moveLeft() {
        this.direction = 'left';
        this.velocity.x -= 0.01;
    }
    
    moveRight() {
        this.direction = 'right';
        this.velocity.x += 0.01;
    }
  
    idle() {
      // do nothing
    }
  
/* 
    switchSprite(name) {
        if (this.image === this.animations[name].image || !this.loaded) return  
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }
 */
    updateHitbox() {
        this.hitBox = {
            position:   {
                x: this.position.x + 15,
                y: this.position.y + 47,
            },
            width: 60,
            height: 43,
        }   
    }

    checkHorizontalUpdate() {
        // stop moving if enemy health is 0 or less
        if (this.health <= 0 || player.health <= 0) {
          this.velocity.x = 0;
          return;
        }
      
        let collisionDetected = false;
        for (let i = 0; i < this.collisionBlocks.length; i++) {
          const collisionBlock = this.collisionBlocks[i];
      
          // detect collision
          if (
            this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
            this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
            this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
            this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
          ) {
            collisionDetected = true;
            // collision on x-axis going to the left
            if (this.velocity.x < 0) {
              const offset = this.hitBox.position.x - this.position.x;
              this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
              this.velocity.x += 1; // change direction
              break;
            }
            // collision on x-axis going to the right
            else if (this.velocity.x > 0) {
              const offset = this.hitBox.position.x - this.position.x + this.hitBox.width;
              this.position.x = collisionBlock.position.x - offset - 0.01;
              this.velocity.x -= 1; // change direction
              break;
            }
          }
        }
      
        // check for collision with player
        if (
          this.hitBox.position.x <= player.hitBox.position.x + player.hitBox.width &&
          this.hitBox.position.x + this.hitBox.width >= player.hitBox.position.x &&
          this.hitBox.position.y + this.hitBox.height >= player.hitBox.position.y &&
          this.hitBox.position.y <= player.hitBox.position.y + player.hitBox.height
        ) {
          collisionDetected = true;
          if (this.velocity.x < 0) {
            this.position.x = player.hitBox.position.x + player.hitBox.width + 0.01;
          } else if (this.velocity.x > 0) {
            this.position.x = player.hitBox.position.x - this.hitBox.width - 0.01;
          }
        }
      
        if (collisionDetected) {
          this.velocity.x = 0; // stop moving
        } else {
          if (this.velocity.x === 0) { // enemy is not moving
            const randomDirection = Math.random() < 0.5 ? 'left' : 'right'; // choose a random direction
            if (randomDirection === 'left') {
              this.moveLeft();
            } else {
              this.moveRight();
            }
          } else {
            this.velocity.x += this.direction === 'left' ? -0.006 : 0.006;
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
    
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
          this.isAttacking = false;
        }, 300);
      }
      
      attackUpdate() {
        if (this.isAttacking  && this.health > 0) {
          if (enemy.attackBox.position.x + enemy.attackBox.width >= player.hitBox.position.x &&
              enemy.attackBox.position.x <= player.hitBox.position.x + player.hitBox.width &&
              enemy.attackBox.position.y + enemy.attackBox.height >= player.hitBox.position.y &&
              enemy.attackBox.position.y <= player.hitBox.position.y + player.hitBox.height &&
              enemy.isAttacking) {
            enemy.isAttacking = false;
            //console.log("player hit");
            player.health -= 5
            gsap.to('#playerHealth', {
              width: player.health + '%',
            })
            setTimeout(() => {
              enemy.isAttacking = true;
              //console.log("not attacking");
            }, 3000);
          }
        } else if (!enemy.isAttacking) {
        enemy.isAttacking = true;
        this.velocity.x = 0;
        //console.log("fighting with player")
        }
      }

}
console.log('this is doglant')

