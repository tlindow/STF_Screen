var img;
var speed = [];
var rspeed = [];
var x = [];
var y = [];
var angle = [];
var l = [];
var n = 12;

function preload() {
  img = loadImage("src/STF_slide.jpg");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  for (var i = 0; i < n; i++) {
    x[i] = random(20,width-20);
    angle[i] = random(0,TWO_PI);
    speed[i] = random(.5,5);
    rspeed[i] = random(0.05,0.1);
    y[i] = -60;
    l[i] = random(30,80);
  }
}

function draw() {
  image(img,0,0,width,height);
  rectMode(CENTER);
  fill('#85C456');
  noStroke();

  for (var i = 0; i < n; i++) {
    push();
    translate(x[i],y[i]);
    rotate(angle[i]);
    y[i] += speed[i];
    rect(0,0,l[i],l[i],10);
    angle[i] += rspeed[i];
    pop();
    if (y[i] > height + 60) {
      y[i] = -60;
      x[i] = random(20,width-20);
      speed[i] = random(.5,5);
    }
  }
}

//
// var output;
//
// function setup() {
//   createCanvas(720,480);
//   //create new file
//   output = createWriter("botArmy.tsv");
//   //write header line with the column titles
//   output.print("type\tx\ty");
//   for (var y = 0; y <= height; y += 60) {
//     for (var x = 0; x <=width; x +=20) {
//       var robotType = int(random(1,4));
//       output.print(robotType + "\t" + x + "\t" + y);
//       ellipse(x,y,12,12);
//     }
//   }
//   output.close(); //finish the file
// }

// var weatherData;
// function preload() {
//   weatherData = loadJSON("cincinnati.json");
// }
//
// function setup() {
//   var temp = getTemp(weatherData);
//   print(temp);
// }
//
// function getTemp(data) {
//   return data.list[0].main.temp;
// }
// var films = [];
// var filmData;
//
// function preload() {
//   filmData = loadJSON("src/films.json")
// }
//
// function setup() {
//   createCanvas(480,120);
//   for (var i = 0; i<12; i++) {
//     var o = filmData[i];
//   // print(o);
//     films[i] = new Film(o);
//   }
//   noStroke();
// }
//
// function draw() {
//   background(0);
//   for (var i = 0; i <films.length; i++) {
//     var x = i*32 + 32;
//     films[i].display(x,105);
//   }
// }
//
// function Film(f) {
//   this.title = f.title;
//   this.director = f.director;
//   this.year = f.year;
//   this.rating = f.rating;
//
//   this.display = function(x,y) {
//     var ratingGray = map(this.rating, 6.5, 8.1, 102, 255);
//     push();
//     translate(x,y);
//     rotate(-QUARTER_PI);
//     fill(ratingGray);
//     text(this.title,0,0);
//     pop();
//   };
// }
// function setup() {
//   createCanvas(displayWidth,displayHeight);
//   print(width);
//   var rowCount = stats.getRowCount();
//   homeRuns = []
//   for (var i = 0; i < rowCount; i++) {
//     homeRuns[i] = stats.getNum(i,1);
//     //print("It is" + homeRuns);
//     var l = homeRuns.length - 1;
//   }
//   for (var i = 0; i < rowCount; i++) {
//     x[i] = map(i,0,l,20,1260);
//     y[i] = map(homeRuns[i],0,60,height-20,20);
//   }
// }
//
// function draw() {
//   background(204);
//   fill("white");
//   stroke("black");
//   for (var i = 0; i < homeRuns.length; i++) {
//       bugs[i] = new JitterBug(x[i],y[i],homeRuns[i]);
//       // bugs[i].move();
//       x[i] += random(-5,1);
//       y[i] += random(-1);
//       bugs[i].display();
//   }
// }
