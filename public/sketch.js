var numFrames = 3;
var images = []; //image variable
var currentFrame=0;
var imageName = [];
var a; //variable to switch between images
var slider; //slider to change number of cubes
var start; //initiate cycling through slides
var start1;
var socket;

// Various parameters for rectangles (falling cubes)
var speed = []; //array of various speeds
var rspeed = []; //array of various rotational speeds
var x = []; //array of x positions
var y = []; //array of y positions
var angle = []; //array of starting angles
var l = []; //array of side lengths (for rectangles)
// var n; //max number of rectangles

function preload() {
  for (var i = 0; i <numFrames;i++) {
    imageName[i] = "src/STF_slide" + i + ".jpg";
    images[i] = loadImage(imageName[i]);
  }
  // img_0 = loadImage("src/STF_slide0.jpg");
  // img_1 = loadImage("src/STF_slide1,jpg");
  // img_2 = loadImage("src/STF_slide2.jpg");
}

function setup() {

  //socket = socket.io.connect('localhost:3000')
  createCanvas(displayWidth,displayHeight); //full size of monitor screen
  a = images[0];//initial background image
  background(a);
  //slider.value();

  socket.on('cubes', newFalling);

  slider = createSlider(0,100,5,1); //Bottom slider for controlling number of falling cubes
  slider.parent('slideContainer');
  slider.class('slider');
  slider.position(125,height-50)

  for (var i = 0; i < 100; i++) {
    x[i] = random(20,width-20); //set random x-positions for each cube
    angle[i] = random(0,TWO_PI); //set random starting angles for each cube
    speed[i] = random(.5,5); //set random speeds for each cube
    rspeed[i] = random(0.05,0.1); //set random speeds for each cube
    y[i] = -60; //set falling cubes to begin at above top of the screen
    l[i] = random(30,80); //set random side lengths for each cube
  }
}

function newFalling(data) {

  slider.value(data.n);
  rectMode(CENTER); //set cube pivot points to the center
  fill('white'); //white
  noStroke();

  for (var i = 0; i < data.n; i++) { //put cubes in motion with previously set parameters
    push();
    translate(x[i],y[i]);
    rotate(angle[i]);
    y[i] += speed[i];
    rect(0,0,l[i],l[i],10);
    angle[i] += rspeed[i];
    pop();
    if (y[i] > height + 60) { //if cube has reached the bottom of screen...
      y[i] = -60; //reset to the top
      x[i] = random(20,width-20); //set a new x position
      speed[i] = random(.5,5); //set a new speed
    }
  }
}

function mouseDragged() {
  var data = {
    n: slider.value()
  }
//controls the number of cubes on the screen, n being the max number
console.log('Sending slider value: ' + slider.value());
socket.emit('cubes', data);
}

function Cycle() { //cycling through slides ("frames")
  currentFrame--;
  a = images[currentFrame];
  print(currentFrame);
  if (currentFrame < 0) {
    currentFrame=2;
    print(currentFrame);
    a = images[currentFrame];
  }
}

function keyTyped() {
  if (key=='q') { //manually cycle through slides when "q" pressed
    start = new Cycle();
  }
}

var myTimer = setInterval(Cycle,10000); //auto cycle through slides, switch at 10 seconds

function draw() {

background(a);
fill('green');

  rectMode(CENTER); //set cube pivot points to the center
  fill('white'); //white
  noStroke();

  for (var i = 0; i < slider.value(); i++) { //put cubes in motion with previously set parameters
    push();
    translate(x[i],y[i]);
    rotate(angle[i]);
    y[i] += speed[i];
    rect(0,0,l[i],l[i],10);
    angle[i] += rspeed[i];
    pop();
    if (y[i] > height + 60) { //if cube has reached the bottom of screen...
      y[i] = -60; //reset to the top
      x[i] = random(20,width-20); //set a new x position
      speed[i] = random(.5,5); //set a new speed
    }
  }
}
