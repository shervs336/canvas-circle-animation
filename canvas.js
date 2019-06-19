let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// Circle
let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40

let colorArray = [
  '#62306E',
  '#321B45',
  '#373847',
  '#A34061',
  '#DB7448'
]

window.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

function Circle (x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx = -this.dx

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy = -this.dy

    this.x += this.dx
    this.y += this.dy

    // interactivity
    if(
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if(this.radius < maxRadius)
        this.radius += 1
    } else if (this.radius > this.minRadius){
      this.radius -= 1
    }

    this.draw()
  }
}

let circleArray = []

function init() {
  circleArray = []
  for (let i = 0; i < 800; i++)
  {
    let radius = Math.random() * 3 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let dx = (Math.random() - 0.5)
    let dy = (Math.random() - 0.5)
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < circleArray.length; i++)
  {
    circleArray[i].update()
  }

}

init()
animate()
