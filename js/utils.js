Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 16 ) {
        rows.push(this.slice(i, i + 16 ))
    }
    return rows 
}

Array.prototype.createObjectFrom2D = function (){
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1){
                objects.push(
                    new collisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }  
                }))
            }
        })    
    })
    return objects
}

Array.prototype.platform2D = function (){
    const platformCollisions2D = []
    for (let i = 0; i < this.length; i += 16 ) {
        platformCollisions2D.push(this.slice(i, i + 16 )) 
    }
    return platformCollisions2D 
}

Array.prototype.createPlatformFrom2D = function (){
    const platform = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1){
                platform.push(
                    new platformCollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    },
                    height: 2
                }))
            }
        })    
    })
    return platform
}


/* const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 16 ) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 16 )) 
}
console.log (platformCollisions2D)

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1){
            platformCollisionBlocks.push(
                new platformCollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64,
                },
                height: 2
            }))
        }
    })    
}) */
