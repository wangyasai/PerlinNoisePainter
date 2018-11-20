var myCanvas;
var color1,color2,color3,color4,color5,color6;
var cover;
var bigParticles1 = [];
var bigParticles2 = [];
var smallParticles = [];
var noiseScale = 2000;
var noiseStrength = 2;
var s =2;
var nums ;
var img;

var index;
var index2;
var pg;

var px = [];
var py = [];

var px2 = [];
var py2 = [];

var imgs = [];


var sum = 0;
var sum2  = 0;

function p5LoadImage(dataURL){
  img = loadImage(dataURL);
  console.log(img);
  setTimeout(function(){
    resetSketch();
  },2000);
  
}


function preload(){
  cover = loadImage("image/hello.png");
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
  myCanvas = createCanvas(windowWidth, windowHeight);
  background(10);
  nums = width*height;


  for(var i = 0 ; i < nums; i++){
    smallParticles[i] = new Particle(random(width),random(height),options.SmallSize,cover);
  }

  resetSketch();

}



function resetSketch(){
  if(type == 'image'){
    img.loadPixels();
    sum2 = 0;
    for(var x = 0 ; x < img.width; x+=4){
      for(var y = 0; y < img.height; y+=4){
        index2 = int((y*img.width+x))*4;
        if(brightness(img.pixels[index2]) == 100){  
          px2[sum2] = x+random(5);
          py2[sum2] = y+random(5) ;          
          bigParticles2[sum2] = new Particle(px2[sum2],py2[sum2],options.BigSize,img);
          sum2 ++;
        }
      }  
    }
  }else{
    cover.loadPixels();
    sum = 0;
    for(var x = 0 ; x < cover.width; x+=5){
      for(var y = 0; y < cover.height; y+=5){
        index = int((y*cover.width+x))*4;
        if(brightness(cover.pixels[index]) == 100){  
          px[sum] = x + random(-2,2);
          py[sum] = y + random(-2,2);          
          bigParticles1[sum] = new Particle(px[sum],py[sum],options.BigSize,cover);
          sum ++;
        }
      }  
    }
  }
}



function draw() {
  fill(options.Background[0],options.Background[1],options.Background[2], 10);
  noStroke();
  rect(0,0,width,height);

  
  if(type == "image"){
    for (var i = 0; i < sum2; i+=10) {  
      var percent = norm(i, 0, sum2);
      from = color(options.Color1);
      to = color(options.Color2);
      between = lerpColor(from, to, percent);
      fill(between);
      noStroke();
      push();
      translate(width/2-img.width/2,height/2-img.height/2);
      bigParticles2[i].move();
      bigParticles2[i].checkEdges();
      bigParticles2[i].display(px2[i],py2[i],options.BigSize);
      pop();
    } 
  }else{
    for (var i = 0; i < sum; i+=10) {  
      var percent = norm(i, 0, sum);
      from = color(options.Color1);
      to = color(options.Color2);
      between = lerpColor(from, to, percent);

      fill(between);
      noStroke();

      push();
      translate(width/2-cover.width/2,height/2-cover.height/2);
      bigParticles1[i].move();
      bigParticles1[i].checkEdges();
      bigParticles1[i].display(px[i],py[i],options.BigSize);
      pop();
    }
  }

  // imageMode(CENTER);
  // if(type == 'image'){
  //   image(img, width/2, height/2);
  // }


  // var counts = int(100-options.Nums)*36;
  // for (var i = 0; i < nums; i+= 2000 ) {
  //   var percent = norm(i, 0, nums);
  //   from = color(options.Color1);
  //   to = color(options.Color2);
  //   between = lerpColor(from, to, percent);

  //   fill(between);
  //   smallParticles[i].move();
  //   smallParticles[i].checkEdges2(0,width,0,height*1.1);
  //   smallParticles[i].display(options.SmallSize);
  // }
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
      this.angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
      this.dir.x = cos(this.angle);//dir.x的变化
      this.dir.y =sin(this.angle);//dir.y的变化
      this.vel = this.dir.copy();//获得前进的速度的方向？
      this.vel.mult(this.speed);//获得的速度的大小？
      this.loc.add(this.vel);//位置在向量的表示方式
    }

    this.checkEdges = function() {    
     if(brightness(img.pixels[int((this.loc.x+this.loc.y*img.width))*4]) == 0 && dist(this.loc.x, this.loc.y, x, y ) >30 ){
       this.loc.x = x+random(-5,5);
       this.loc.y = y+random(-5,5);
     }
   }

   this.checkEdges2 = function(){
    if(dist(this.loc.x, this.loc.y, x, y )>30){
      // if(this.loc.x < 0 || this.loc.x >width || this.loc.y<0 || this.loc.y > height ){
        this.loc.x = random(width);
        this.loc.y = random(height);
      }
    }


    this.display = function(x,y,r) {
      if(r==options.BigSize){
        var psize = map(dist(this.loc.x, this.loc.y, x, y ),0,40,r/1.5,r); 
      }else{
        var psize = r; 
      }  
      ellipse(this.loc.x, this.loc.y, psize, psize);
    }
  }
