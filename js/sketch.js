var myCanvas;
var cover;
var bigParticles1 = [];
var bigParticles1_ = [];
var bigParticles2 = [];
var bigParticles2_ = [];
var smallParticles = [];
var s =2;
var nums = 1000;
var img;
var loading;

var index;
var index2;

var px = [];
var py = [];

var px_ = [];
var py_ = [];  

var px2 = [];
var py2 = [];

var px2_ = [];
var py2_ = [];

var smallcounts;
var sum = 0;
var sum_ = 0;
var sum2  = 0;
var sum2_ = 0;
let gp1,gp2,gp1_;
let w, h ;
var loc,red,green,blue,c,value;

var randomColor = [];
var color1;
var c1 = [];
var cc = [];

function p5LoadImage(dataURL){
  img = loadImage(dataURL);
  console.log(img);
  setTimeout(function(){
    resetSketch();
  },500);
  
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}



function setup() {
  background(0,0,0);
  w = windowWidth;
  h = windowHeight;

  myCanvas = createCanvas(w,h);

  gp1 = createGraphics(w,h);
  gp2 = createGraphics(w,h);
  gp1_ = createGraphics(w,h);

  pixelDensity(1);

  gp1.pixelDensity(pixelDensity());
  gp2.pixelDensity(pixelDensity());
  gp1_.pixelDensity(pixelDensity());
  var n = map(w,300,2000,0,170);


  gp1.background(0);
  gp1.fill(255);
  gp1.stroke(255);
  gp1.textSize(options.TextSize);
  gp1.strokeWeight(20); 
  gp1.textAlign(CENTER,CENTER);
  gp1.text(options.Text,w/2, h/2);

  gp1_.background(0);
  gp1_.fill(255);
  gp1_.stroke(255);
  gp1_.textSize(options.TextSize);
  gp1_.strokeWeight(120); 
  gp1_.textAlign(CENTER,CENTER);
  gp1_.text(options.Text,w/2, h/2);


  gp1_.loadPixels();
  var space = 10;
  for(var y = 0 ; y < h; y+=space){
    for(var x= 0; x< w; x+=space){
      loc = (x + y * w)*4;
      red =  gp1_.pixels[loc];
      green =  gp1_.pixels[loc+1];
      blue = gp1_.pixels[loc+2];
      c = color(red, green, blue);
      value = brightness(c);
      if(value == 0){
        gp2.fill(0,0,0);
        gp2.rect(x,y,space,space);
      }
    }
  }
  gp1_.updatePixels();
  resetSketch();
}

function resetSketch(){
  gp1.loadPixels();
  sum2 = 0;
  imageMode(CENTER);
  for(var i = 0 ; i < nums; i++){

    smallParticles[i] = new Particle(random(width),random(height),options.SmallSize,gp1);
  }

  for(var x = 0 ; x < w; x+=4){
    for(var y = 0; y < h; y+=4){
      index2 = int((y*w+x))*4;
      if(brightness(gp1.pixels[index2]) == 100){  
        px2[sum2] = x;
        py2[sum2] = y;      
        bigParticles1[sum2] = new Particle(px2[sum2]+random(-5,5),py2[sum2]+random(-5,5),options.BigSize +random(10),gp1);
        randomColor[sum2] = random(0,1);
        sum2 ++;
      }
    }  
  }
  gp1.updatePixels();
}



function draw() {
  background(0,0,0, 20);
  var counts = int(30 - int(options.Nums)*3);
  for (var i = 0; i < sum2; i+=counts) { 
    if(randomColor[i]>0.55){
      fill(options.Color1);
    }else if(randomColor[i]<=0.55 && randomColor[i]>=0.2){
      fill(options.Color2);
    }
    else{
      fill(options.Color3);
    }

    noStroke(0);
    bigParticles1[i].move();
    bigParticles1[i].checkEdges();
    bigParticles1[i].display(options.BigSize);

  }

  mask();

  for (var i = 0; i < 300; i++) {
    if(randomColor[i]>0.55){
      fill(options.Color1);
    }else if(randomColor[i]<=0.55 && randomColor[i]>=0.2){
      fill(options.Color2);
    }
    else{
      fill(options.Color3);
    }
    smallParticles[i].move();
    smallParticles[i].checkEdges2();
    smallParticles[i].display(options.SmallSize);
  }


}


function mask(){
  push();
  translate(w/2,h/2);
  image(gp2,0,0);
  pop();
}





function Particle(x, y, r,img) {
  this.loc = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.dir = new p5.Vector(0, 0);
  this.speed = random(0.5,1);
  this.run = function(r){
    this.move();
    this.checkEdges();
    this.update(r);
  }

  this.move = function() {
      //noise 影响angle的变化，从而影响dir和loc，noise(x,y,z);
      this.angle = noise(this.loc.x/options.noiseScale, this.loc.y/options.noiseScale, frameCount/options.noiseScale)*TWO_PI;
      this.dir.x = cos(this.angle);//dir.x的变化
      this.dir.y = sin(this.angle);//dir.y的变化
      this.vel = this.dir.copy();//获得前进的速度的方向？
      this.vel.mult(this.speed);//获得的速度的大小？
      this.loc.add(this.vel);//位置在向量的表示方式
    }

    this.checkEdges = function() {    
     if((gp1.pixels[int((this.loc.x+this.loc.y*gp1.width))*4]) !=255 && dist(this.loc.x, this.loc.y, x, y ) > 40 ){
       this.loc.x = x+random(-2,2);
       this.loc.y = y+random(-2,2);
     }else if(brightness(gp1.pixels[int((this.loc.x+this.loc.y*gp1.width))*4]) == 100){
      if(this.loc.x < 0 || this.loc.x > gp1.width || this.loc.y <0 || this.loc.y >gp1.height ){
        this.loc.x = x+random(-2,2);
        this.loc.y = y+random(-2,2);
      }
    }
  }


  this.checkEdges2 = function(){
    if(this.loc.x > w && this.loc.x < width-w && this.loc.y >h && this.loc.y <height-h ){
      this.loc.x = random(width);
      this.loc.y = random(height);
    }else if(this.loc.x <0  || this.loc.x > width || this.loc.y <0 || this.loc.y > height){
     this.loc.x = random(width);
     this.loc.y = random(height);
   }
 }


 this.display = function(r) {
  if(r==options.BigSize){
    var psize = map(dist(this.loc.x, this.loc.y, x, y ),0,40,r/1.5,r); 
  }else{
    var psize = r;
  }  
  ellipse(this.loc.x, this.loc.y, psize, psize);
}
}
