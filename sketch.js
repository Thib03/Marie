class Button {
  constructor(t,/*i,*/x,y,l,h) {
    this.button = new Clickable(width /2+x-l/2,
                                height/2+y-h/2);
    this.button.resize(l,h);
    this.button.color = 255;
    this.button.cornerRadius = 0;
    this.button.strokeWeight = 2;
    this.button.stroke = 0;
    this.button.text = '';

    this.t = t;
    //this.i = i;
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;

    this.button.onOutside = function() {
      cursor(ARROW);
    }

    this.button.onHover = function(){
      cursor(HAND);
    }

    /*this.button.onRelease = function(){
      this.color = 255;
    }*/
  }

  drawText() {
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(18);
    text(this.t,width/2+this.x,
                   height/2+this.y);//+0.3*this.h);
  }

  draw() {
    this.button.draw();
    this.drawText();
    //image(this.i,0,0,50,200);
  }
}

var homeButtons = [];
var solfegeButtons = [];
var cartesButtons = [];
var lutherieButtons = [];
var compositeursButtons = [];

var manager;

var clefSol;

function preload() {
  //clefSol = loadImage('clef_sol.png');
  //clefSol = createImg('https://ibb.co/LQKk4N1');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  manager = new SceneManager();

  manager.addScene(homeScene);
  manager.addScene(solfegeScene);
  manager.addScene(cartesScene);
  manager.addScene(lutherieScene);
  manager.addScene(compositeursScene);

  manager.showScene(homeScene);

  let e = 20;
  let y = height/8;
  let l = (width-5*e)/4;
  let h = height/5;

  var button;

  //----------------------------------------------------------------------------
  //                            Home Buttons
  //----------------------------------------------------------------------------

  button = new Button('Solfège',    -3*(l+e)/2,y,l,h);
  button.button.onPress = function() {
      manager.showScene(solfegeScene);
  }
  homeButtons.push(button);

  button = new Button('Cartes',     -  (l+e)/2,y,l,h);
  button.button.onPress = function() {
      manager.showScene(cartesScene);
  }
  homeButtons.push(button);

  button = new Button('Lutherie',      (l+e)/2,y,l,h);
  button.button.onPress = function() {
      manager.showScene(lutherieScene);
  }
  homeButtons.push(button);

  button = new Button('Compositeurs',3*(l+e)/2,y,l,h);
  button.button.onPress = function() {
      manager.showScene(compositeursScene);
  }
  homeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Solfège Buttons
  //----------------------------------------------------------------------------

  l = (width-4*e)/3;

  button = new Button('Retour',    0,height/2.8,l,h/3);
  button.button.onPress = function() {
      manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  button = new Button('Aléatoire',   -(l+e),y,l,h);
  button.button.onPress = function() {
      //manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  button = new Button('Gamme',    0,y,l,h);
  button.button.onPress = function() {
      //manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  button = new Button('Rythme',    l+e,y,l,h);
  button.button.onPress = function() {
      //manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Cartes Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',    0,height/2.8,l,h/3);
  button.button.onPress = function() {
      manager.showScene(homeScene);
  }
  cartesButtons.push(button);

  //----------------------------------------------------------------------------
  //                          Lutherie Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',    0,height/2.8,l,h/3);
  button.button.onPress = function() {
      manager.showScene(homeScene);
  }
  lutherieButtons.push(button);

  //----------------------------------------------------------------------------
  //                        Compositeurs Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',    0,height/2.8,l,h/3);
  button.button.onPress = function() {
      manager.showScene(homeScene);
  }
  compositeursButtons.push(button);
}

function draw() {
  manager.draw();
}

function homeScene() {
  this.draw = function() {
    background(255);

    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("Nom de l'appliation",width/2,height/3.5);

    for(let b = 0; b < homeButtons.length; b++) {
      homeButtons[b].draw();
    }
  }
}

function solfegeScene() {
  this.draw = function() {
    background(255);

    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("Solfège",width/2,height/3.5);

    for(let b = 0; b < solfegeButtons.length; b++) {
      solfegeButtons[b].draw();
    }
  }
}

function cartesScene() {
  this.draw = function() {
    background(255);

    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("Cartes",width/2,height/3.5);

    for(let b = 0; b < cartesButtons.length; b++) {
      cartesButtons[b].draw();
    }
  }
}

function lutherieScene() {
  this.draw = function() {
    background(255);

    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("Lutherie",width/2,height/3.5);

    for(let b = 0; b < lutherieButtons.length; b++) {
      lutherieButtons[b].draw();
    }
  }
}

function compositeursScene() {
  this.draw = function() {
    background(255);

    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("Compositeurs",width/2,height/3.5);

    for(let b = 0; b < compositeursButtons.length; b++) {
      compositeursButtons[b].draw();
    }
  }
}
