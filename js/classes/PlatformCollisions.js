class platformCollisionBlock {
    constructor({position, height = 40}) {
        this.position = position
        this.width = 64
        this.height = height
    }
    draw() {
        c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}