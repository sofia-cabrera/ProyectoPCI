let points = []; // Array para almacenar los puntitos caminantes

//variables de los caminantes
let posX, posY;
let velX, velY;

//variables del portal
let n = 256;
let minRad = 30;
let maxRad = 300;
let nfAng = 0.05;
let nfTime = 0.005;

let slide;

function setup() {
  createCanvas(windowWidth, windowHeight); // Crear lienzo de dibujo
  background(0); // Estable color de fondo negro
  
  cam = createCapture(VIDEO);
  cam.hide();
  
  
  //texto inicial
  fill(255);
  textSize(15);
  text('Esto es simple, tú no tienes el control ', 20, 100);
  text('solo un margen de posible interacción ', 25, 120);
  text(' tienes que elegír que hacer con eso, ', 25, 140);
  text('sin duda esto mejora si participas ', 25, 260);
  text(' en vez de solo dejar que el tiempo pase', 30, 280);
  text(' No te apures----------yo me iré y tu te quedarás', 35, 310);
  
}

function draw() {
  
  //camaras en pantalla
  image(cam,40,40,40, 20);
  image(cam,0,200,0, 20);
  image(cam,150,150,40, 20);
  image(cam,200,40,40, 20);
  image(cam,300,400,0, 20);
  image(cam,150,40,40, 20);
  image(cam,500,300,40, 20);
  image(cam,600,300,40, 20);
  image(cam,600,330,40, 100);
  image(cam,700,50,60,160);
  
  //funciones elipse caminante y su comportamiento
  dibujaEllipse();
  movimiento();
  reubicar();
  
  
  for (let i = 0; i < points.length; i++) {
    let pt = points[i]; // Obtener el punto actual del array
    let x = pt.x; // Coordenada x del punto
    let y = pt.y; // Coordenada y del punto
    
    stroke(255,150); // Establecer color de trazo a blanco
    strokeWeight(2); // Establecer grosor del trazo
    point(x, y); // Dibujar el punto actual
    
    // Mover las coordenadas del punto actual
    x += random(-5, 5); // Moverse aleatoriamente en el eje x
    y += random(-5, 5); // Moverse aleatoriamente en el eje y
    
    // Limitar las coordenadas dentro del lienzo
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    
    // Actualizar las coordenadas del punto en el array
    pt.x = x;
    pt.y = y;
  }
   
   translate(width/2, height/2);//ubica el centro del portal en medio de la pantalla
  
  //portal:
  noFill(); // No rellenar la forma
  stroke(255,15); // Establecer color de trazo
  beginShape();
  for (let i = 0; i < n; i++) {
    let ang = map(i, 0, n, 0, TWO_PI);// Mapear el índice a un ángulo entre 0 y 2PI
    let rad = map(noise(i * nfAng, frameCount * nfTime), 0, 1, minRad, maxRad);// Generar un valor de ruido y mapearlo al rango de los radios
    let x = rad * cos(ang);// Calcular la coordenada x del punto
    let y = rad * sin(ang);// Calcular la coordenada y del punto
    curveVertex(x, y);// Agregar el punto a la forma
  }
  endShape(CLOSE);
}


//a partir de acá programo el ellipse interactivo qeu se comporta como los caminantes cuando lo dejas pero si el mouse esta presionado lo arrastras 
function dibujaEllipse() {
  noFill(); // No rellenar la forma
  stroke(255,50); // Establecer color de trazo
  ellipse(posX, posY, 20, 20);
  
  
  fill(255);
  textSize(15);
  text('Esto es simple, tú no tienes el control ', 20, 100);

  fill(0);
  textSize(10);
  text('Clickea y arrastra para dar vida/apreta la barra espaciadora para respirar un poco', 20, windowHeight-50);
  

}


function movimiento(){
  velX = random(-5,5);
  velY = random(-5,5);
  posX = posX + velX;
  posY = posY + velY;
  
}

function reubicar(){
  if (mouseIsPressed){
  posX = mouseX;
  posY = mouseY;
  dibujaEllipse();
  movimiento();
  
}}



function mouseClicked() {
  background(0, 50);
  let newPoint = { // Crear un nuevo objeto punto
    x: mouseX,
    y: mouseY
  };
  points.push(newPoint); // Agregar el nuevo punto al array
}



function keyPressed() {
  if (key === ' ') {
    background(0); // Limpiar el lienzo al presionar la barra espaciadora
    points = []; // Reiniciar el array de puntos
  }
}






