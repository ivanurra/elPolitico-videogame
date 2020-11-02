// VARIABLES
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let health = 100
let interval
const gravity = 0.8
const policemen = [] 
const keys = {}

// CLASSES

class Airport {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img1 = new Image()
        this.img1.src = './media/background.png'
        this.img2 = new Image()
        this.img2.src= './media/background.png'
        this.img1.onload = () => {
            this.draw()
        }
        this.img2.onload = () => {
            this.draw()
        }
    }

    draw() {
        this.x -=2
        if(this.x < -(canvas.width*2)){
            this.x = -canvas.width
        }
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img2, this.x + canvas.width, this.y, this.width, this.height)
        ctx.drawImage(this.img2, this.x + canvas.width + canvas.width, this.y, this.width, this.height)
    }
}

class Player {
    constructor(type){
        this.x = 10
        this.y = 360
        this.width = 77
        this.height = 73
        this.type = type
        this.img = new Image()
        this.img.src = './media/politico.png'
        this.velY = 0
        this.grounded = false
        this.jumping = false
        this.jumpStrength = 10
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    touch(obstacle){
        return (
            this.x < obstacle.x + obstacle.width && 
            this.x + this.width > obstacle.x && 
            this.y < obstacle.y + obstacle.height && 
            this.y + this.height > obstacle.y 
        )
    }
}

class Enemy {
    constructor(x, y){
        this.x = x
        this.y = y 
        this.width = 77
        this.height = 73
        this.damage = 25
        this.img = new Image()
        this.img.src = './media/enemy.png'
    }

    draw(){
        this.x -=6
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

// DECLARATIONS

const airport = new Airport()
let player = new Player()
const music = new Audio('./media/music.mp3')

// FUNCTIONS

function start() {
    interval = setInterval(update, 400 / 60)
}

function stop() {
    clearInterval(interval)
    interval = null
}

function move(){
    if(!player.grounded){
        player.y += player.velY
        player.velY += gravity
    }
    if(player.y>=360){
        player.grounded = true
        player.jumping = false
        player.y = 360
    }
    if(keys[74]){
        if(!player.jumping){
            player.velY = 0
            player.grounded = false
            player.jumping = true
            player.velY += -player.jumpStrength*2
        }
    }
}

function gameOver() {
    let looser = new Image()
    looser.src = './media/gameover.png'
    let looserX = canvas.width  / 2 -200
    let looserY = canvas.height / 2 -100
    clearInterval(interval)
    looser.onload = () => {
        ctx.drawImage(looser, looserX, looserY, 410, 319)
    }
    setTimeout(() => {
        location.reload()    
    }, 5000);
}

function checkHealth() {
    policemen.forEach((pol,i) => {
        if(player.touch(pol)) {
            policemen.splice(i,1) 
        return health -= pol.damage
        }
    })
    if(health <= 0) return gameOver()
}

function drawHealth(){
    ctx.font = '24px Arial'
    ctx.fillText('HEALTH:', 15, 30)
    ctx.fillText(health, 120, 30)
    ctx.fillStyle = "white"
}

function createPolicemen() {
    if (frames % 350 === 0) {
        policemen.push(new Enemy(canvas.width, 360))
    }
    if (frames % 550 === 0) {
        policemen.push(new Enemy(canvas.width, 360))
    }
    if (frames % 650 === 0) {
        policemen.push(new Enemy(canvas.width, 360))
    }
    if (frames % 850 === 0) {
        policemen.push(new Enemy(canvas.width, 360))
    }
}

function drawPolicemen() {
    policemen.forEach(policemen => {
        policemen.draw()
    })
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frames++
    airport.draw()
    player.draw()
    createPolicemen()
    drawPolicemen()
    drawHealth()
    checkHealth() 
    move()
    music.play()
}

// START

  addEventListener('keydown', controls=>{
    if(controls.keyCode === 32){
        if(interval){
            stop()
        } else { 
            start()
        }
    }
    keys[controls.keyCode] = true
  })
  
  addEventListener('keyup', controls=>{
    keys[controls.keyCode] = false
  })