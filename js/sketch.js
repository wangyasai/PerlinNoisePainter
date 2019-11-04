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

var sum  = 0;
let gp1,gp2,gp1_;
let w, h ;
var loc,red,green,blue,c,value;

var randomColor = [];
var color1;
var c1 = [];
var cc = [];
var bg;
var index = 0;
var between;

function p5LoadImage(dataURL){
  img = loadImage(dataURL);
   setTimeout(function(){
    setup();     
  },50);   
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


  //draw text / image on PGraphic
  if(type == 'text'){
    gp1.fill(255);
    gp1.stroke(255);
    gp1.textSize(options.TextSize);
    gp1.strokeWeight(20); 
    gp1.textAlign(CENTER,CENTER);
    gp1.text(options.Text,w/2, h/2);
  }


  if(type == 'image'){
    push();
    var scale = 0.8;
    var imgW,imgH;
     if(img.height > height && img.width > width && img.height && img.width/width > img.height/height){
        imgW = width*scale;
        imgH = img.height * width * scale /img.width;
     }else if(img.height > height && img.width > width && img.height && img.width/width < img.height/height){
        imgH = height*scale;
        imgW= img.width * height * scale /img.height;  
    }else if(img.height > height && img.width < width){
        imgH= height*scale;
        imgW= img.width * height *scale / img.height; 
     }else if(img.height < height && img.width > width){
        imgW = width * scale;
        imgH= img.height * width *scale / img.width;  
     }
   gp1.imageMode(CENTER);
   gp1.image(img, w/2, h/2, imgW,imgH);
   pop();
 }

resetSketch();

//draw mask scale
 if(type == 'text'){
  gp1_.fill(255);
  gp1_.stroke(255);
  gp1_.textSize(options.TextSize);
  gp1_.strokeWeight(120); 
  gp1_.textAlign(CENTER,CENTER);
  gp1_.text(options.Text,w/2, h/2);
}


if(type == 'image'){
  push();
   var scale = 0.8;
     var imgW,imgH;
     if(img.height > height && img.width > width && img.height && img.width/width > img.height/height){
        imgW = width*scale;
        imgH = img.height * width * scale /img.width;
     }else if(img.height > height && img.width > width && img.height && img.width/width < img.height/height){
        imgH = height*scale;
        imgW= img.width * height * scale /img.height; 
     }else if(img.height > height && img.width < width){
        imgH= height*scale;
        imgW= img.width * height *scale / img.height; 
      }else if(img.height < height && img.width > width){
        imgW = width * scale;
        imgH= img.height * width *scale / img.width;  
       }
  gp1_.imageMode(CENTER);
  gp1_.image(img, w/2, h/2 , imgW*1.1, imgH*1.1);
  pop();
}


//get mask
gp1_.loadPixels();
bg = hexToRgb(options.BgColor);
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
      gp2.fill(bg.r,bg.g,bg.b);
      gp2.noStroke();
      gp2.rectMode(CENTER);
      gp2.rect(x,y,space,space);
    }
  }
}
gp1_.updatePixels();
}



function resetSketch(){
  gp1.loadPixels();
  sum = 0;

  imageMode(CENTER);
  for(var i = 0 ; i < nums; i++){
    smallParticles[i] = new Particle(random(width),random(height),options.SmallSize,gp1);
  }

  for(var y = 0; y < gp1.height; y+=4){
    for(var x = 0 ; x < gp1.width; x+=4){
      index = int((y*gp1.width+x))*4;
        if( gp1.pixels[index+3] != 0 ){
          px2[sum] = x;
          py2[sum] = y;      
          bigParticles1[sum] = new Particle(px2[sum]+random(-5,5),py2[sum]+random(-5,5),options.BigSize +random(10),gp1,i);
          randomColor[sum] = random(0,1);
          sum ++;
        }  
      }
    }
  gp1.updatePixels();
}



function draw() {
  background(bg.r,bg.g,bg.b, 30);
  var alpha1,alpha2,alpha3 = 0;
  var counts = int(30 - int(options.Nums)*3);
  alpha += (255- alpha)*0.05;
  for (var i = 0; i < sum; i+=counts) { 
  
    bigParticles1[i].move();
    bigParticles1[i].checkEdges();
    bigParticles1[i].display(options.BigSize,i);
  }


  mask();

  for (var i = 0; i < 300; i++) {
    smallParticles[i].move();
    smallParticles[i].checkEdges2();
    smallParticles[i].display(options.SmallSize,i);
  }
}


function mask(){
  if(type == 'text'){
    gp2.loadPixels();
    push();
    translate(w/2,h/2);
    image(gp2,0,0);
    pop();
    gp2.updatePixels();
  } else{
    fill(options.BgColor);
    rectMode(CORNER);
    rect(0,0,(width-img.width)/2-40,height);
    rect(width-(width-img.width)/2 + 40,0,(width-img.width)/2,height);
    rect(0,0,width,(height-img.height)/2 - 40);
    rect(0,height-(height-img.height)/2,width,(height-img.height)/2 +40);
  }
}


function Particle(x, y, r,img,i) {
  this.loc = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.dir = new p5.Vector(0, 0);
  this.speed = random(0.5,1);
  this.run = function(r){
    this.move();
    this.checkEdges();
    this.update(r);
  }
  this.alpha = -10;
  this.randomColor = random(1);
  this.i = i;

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
     if((gp1.pixels[int((this.loc.x + this.loc.y*gp1.width))*4 + 3]) == 0 && dist(this.loc.x, this.loc.y, x, y ) > 35 ){
       this.loc.x = x+random(-2,2);
       this.loc.y = y+random(-2,2);
       this.alpha = 0;
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


 this.display = function(r,i) {
  this.alpha += (255-this.alpha)*0.05;

  if(options.ColorMode == 'Random'){
      if(this.randomColor>0.55){
        var color1 = hexToRgb(options.Color1);
        fill(color1.r, color1.g, color1.b, this.alpha);
      }else if(this.randomColor<=0.55 && this.randomColor>=0.2){
        var color2 = hexToRgb(options.Color2);
        fill(color2.r, color2.g, color2.b,this.alpha);
      }else{
        var color3 = hexToRgb(options.Color3);
        fill(color3.r, color3.g, color3.b, this.alpha);
      }
  }else if(options.ColorMode == 'Gradient'){
      if(i < sum/2){
        var percent = norm(i,0,sum/2);
        var from = color(options.Color1);
        var to = color(options.Color2);
        between = lerpColor(from, to, percent);
        fill(between.levels[0], between.levels[1], between.levels[2], this.alpha);
      }else{
        var percent = norm(i,sum/2,sum);
        var from = color(options.Color2);
        var to = color(options.Color3);
        between = lerpColor(from, to, percent);
        fill(between.levels[0], between.levels[1], between.levels[2], this.alpha);
      }
    }
    noStroke();

    ellipse(this.loc.x, this.loc.y, r,r);
  }
}
