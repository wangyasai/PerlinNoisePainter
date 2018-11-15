
var myCanvas;
var color1,color2,color3,color4,color5,color6;
var cover;
var bigParticles = [];
var smallParticles = [];
var noiseScale = 2000;
var noiseStrength = 2;
var s =2;
var nums = 360000;
var img,yourcolor;


function p5LoadImage(dataURL){
  img = loadImage(dataURL);
  yourcolor = loadImage(dataURL);
}


function preload(){
  cover = loadImage("image/shark.png");
}



function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  background(10,10,10);


  background(10);

  for(var i = 0 ; i < nums; i++){
    bigParticles[i] = new Particle(random(width/7,width/7*6),random(height*0.1,height*0.9),2);
    smallParticles[i] = new Particle(random(width),random(height),random(4));
  }
}




function draw() {
  fill(10, 20);
  noStroke();
  rect(0,0,width,height);
  var counts = int(100-options.Nums)*4;
    for (var i = 0; i < nums; i+=counts) {  
    var percent = norm(i, 0, nums);
    from = color(options.Color1);
    to = color(options.Color2);
    between = lerpColor(from, to, percent);

    fill(between);
    noStroke();
    bigParticles[i].move();
    bigParticles[i].checkEdges(0,width,0,height*0.4);
    bigParticles[i].display(options.BigSize);
  }
  imageMode(CENTER);
  if(type == 'image'){
    image(img, width/2, height/2,width,height);
  }else {
    image(cover, width/2, height/2,width,height);
 }


for (var i = 0; i < nums; i+=counts ) {
  var percent = norm(i, 0, nums);
  from = color(options.Color1);
  to = color(options.Color2);
  between = lerpColor(from, to, percent);

  fill(between);
  smallParticles[i].move();
  smallParticles[i].checkEdges(0,width,0,height*1.1);
  smallParticles[i].display(options.SmallSize);
}

}





function Particle(x, y, r) {
  this.loc = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.dir = new p5.Vector(0, 0);
  if (width < 640) {
    this.speed = random(0.5,2.5);
  } else {
    this.speed = random(0.5,2.5);
  }



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
        if (this.loc.x<0||this.loc.x>width||this.loc.y<0||this.loc.y>height) {
          this.loc.x = random(width);
          this.loc.y = random(height);
        }
      }

      this.display = function(r) {
        ellipse(this.loc.x, this.loc.y, r, r);
      }
    }
