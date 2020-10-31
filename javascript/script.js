const airport = new Image()
airport.src = './media/background.png'
let airportX = 0
let airportY = 0
// function draw(x,y){
//     const canvas = document.getElementById('canvas')
//     const ctx = canvas.getContext("2d")
//     ctx.clearRect(0, 0, 300, 300)
//     ctx.drawImage(airport, airportX, airportY, 50, 50);
// }
// draw()

window.onload = function(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext("2d")
    ctx.drawImage(airport, 0, 0, 1200, 533);
}

// REALIZAR CON CLASES. PRUEBA A CAMBIAR EL NOMBRE DE LA CLASE POR IMG EN LUGAR DE AIRPORT. LUEGO
// CREAS LA VARIABLE AIRPORT POR OTRO LADO.



