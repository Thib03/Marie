//------------------------------------------------------------------------------
//              Variables
//------------------------------------------------------------------------------

var homeButtons = [];
  var solfegeButtons = [];
    var aleatoireButtons = [];
    var gammeButtons = [];
    var rythmeButtons = [];
  var cartesButtons = [];
  var lutherieButtons = [];
  var compositeursButtons = [];

var manager;

var clefSol;

var yt;

var solfegeMenu      = [0,[0,0,0],0];
var cartesMenu       = [0,0];
var lutherieMenu     = [0,0];
var compositeursMenu = [0];

var black = 87;

var font;

//------------------------------------------------------------------------------
//              Classes
//------------------------------------------------------------------------------

class Button {
  constructor(t,/*i,*/x,y,l,h) {
    this.button = new Clickable(width /2+x-l/2,
                                height/2+y-h/2);
    this.button.resize(l,h);
    this.button.color = 217;
    this.button.cornerRadius = 5;
    this.button.strokeWeight = 0;
    this.button.stroke = 0;
    this.button.text = '';

    this.t = t;
    this.tc = black;
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
    fill(this.tc);
    textAlign(CENTER,CENTER);
    textSize(0.045*dimension());
    textFont(font);
    text(this.t,width/2+this.x,
                   height/2+this.y-0.009*dimension());//+0.3*this.h);
  }

  draw() {
    this.button.draw();
    this.drawText();
    //image(this.i,0,0,50,200);
  }

  toggle(bool) {
    if(bool) {
      this.button.color = black;
      this.tc = 217;
    }
    else {
      this.button.color = 217;
      this.tc = black;
    }
  }
}

//------------------------------------------------------------------------------
//              Functions
//------------------------------------------------------------------------------

function dimension() {
  return sqrt(width*height);
}

function drawPortee() {
  noStroke();
  fill(255);

  let y = height / 2 + 1.6 * dy;

  rect(0, y - 5 * marge, width, 10 * marge);

  stroke(noir);
  strokeWeight(marge / 10);
  line(marge, y - 2 * marge,
    width - marge, y - 2 * marge);
  line(marge, y - marge,
    width - marge, y - marge);
  line(marge, y,
    width - marge, y);
  line(marge, y + marge,
    width - marge, y + marge);
  line(marge, y + 2 * marge,
    width - marge, y + 2 * marge);

  imageMode(CENTER);
  switch (clef) {
    case 0:
      image(clefSol, 3 * marge, y + marge / 6,
        117 / 25 * marge, 200 / 25 * marge);
      break;
    case 1:
      image(clefFa, 3 * marge, y - 0.35 * marge,
        180 / 59 * marge, 200 / 59 * marge);
      break;
    case 2:
      image(clefUt, 3 * marge, y,
        135 / 50 * marge, 200 / 50 * marge);
  }
}

function preload() {
  //clefSol = loadImage('clef_sol.png');
  //clefSol = createImg('https://ibb.co/LQKk4N1');
  font = loadFont('AmaticSC-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  manager = new SceneManager();

  manager.addScene(homeScene);
    manager.addScene(solfegeMenuScene);
    manager.addScene(solfegeGameScene);
    manager.addScene(cartesScene);
    manager.addScene(lutherieScene);
    manager.addScene(compositeursScene);
  manager.showScene(homeScene);

  let e = 40;
  let y0 = -(height/5+e)/2;
  let y1 = (height/5+e)/2;
  let y = y0;
  var l;
  function largeur(n) {
    l = (width-(n+1)*e)/n;
  }
  var h;
  function hauteur(n) {
    h = (height/5-(n-1)*e)/n;
  }

  //let

  let yr = height/2.6;
  let lr = (width-4*e)/3;
  let hr = h;

  yt = height/8.5;

  var button;

  //----------------------------------------------------------------------------
  //                            Home Buttons
  //----------------------------------------------------------------------------

  largeur(2);
  hauteur(1);

  button = new Button('Solfège',    -(l+e)/2,y0,l,h);
  button.button.onPress = function() {
      manager.showScene(solfegeMenuScene);
  }
  homeButtons.push(button);

  button = new Button('Cartes',      (l+e)/2,y0,l,h);
  button.button.onPress = function() {
      manager.showScene(cartesScene);
  }
  homeButtons.push(button);

  button = new Button('Lutherie',      -(l+e)/2,y1,l,h);
  button.button.onPress = function() {
      manager.showScene(lutherieScene);
  }
  homeButtons.push(button);

  button = new Button('Compositeurs', (l+e)/2,y1,l,h);
  button.button.onPress = function() {
      manager.showScene(compositeursScene);
  }
  homeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Solfège Buttons
  //----------------------------------------------------------------------------

  largeur(3);

  function update(buttons,state,first=0,last=buttons.length-1) {
    for(let b = first; b <= last; b++) {
      if(b == state+first) {
        buttons[b].toggle(true);
      }
      else {
        buttons[b].toggle(false);
      }
    }
  }

  button = new Button('Aléatoire',   -(l+e),y0,l,h);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[0] = 0;
    update(solfegeButtons,0);
  }
  solfegeButtons.push(button);

  button = new Button('Gamme',    0,y0,l,h);
  button.button.onPress = function() {
    solfegeMenu[0] = 1;
    update(solfegeButtons,1);
  }
  solfegeButtons.push(button);

  button = new Button('Rythme',    l+e,y0,l,h);
  button.button.onPress = function() {
    solfegeMenu[0] = 2;
    update(solfegeButtons,2);
  }
  solfegeButtons.push(button);

  button = new Button('Retour',    -(l+e),yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  button = new Button('Jouer',    l+e,yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  solfegeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Aléatoire Buttons
  //----------------------------------------------------------------------------

  button = new Button('Aucune\nrestriction',   -(l+e),y1,l,h);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 0;
    update(aleatoireButtons,0);
  }
  aleatoireButtons.push(button);

  button = new Button('Restriction\npar position',    0,y1,l,h);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 1;
    update(aleatoireButtons,1);
  }
  aleatoireButtons.push(button);

  button = new Button('Restriction\npar tonalité',    l+e,y1,l,h);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 2;
    update(aleatoireButtons,2);
  }
  aleatoireButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Gamme Buttons
  //----------------------------------------------------------------------------

  largeur(4);

  button = new Button('Majeur',    -3*(l+e)/2,y1,l,h);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 0;
    update(gammeButtons,0);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nnaturel',     -  (l+e)/2,y1,l,h);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 1;
    update(gammeButtons,1);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nharmonique',      (l+e)/2,y1,l,h);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 2;
    update(gammeButtons,2);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nmélodique',3*(l+e)/2,y1,l,h);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 3;
    update(gammeButtons,3);
  }
  gammeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Rythme Buttons
  //----------------------------------------------------------------------------

  largeur(2);

  button = new Button('Binaire',    -(l+e)/2,y1-(h+e)/4,l,(h-e)/2);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][2] = 0;
    update(rythmeButtons,0,0,1);
  }
  rythmeButtons.push(button);

  button = new Button('Ternaire',     (l+e)/2,y1-(h+e)/4,l,(h-e)/2);
  button.button.onPress = function() {
    solfegeMenu[1][2] = 1;
    update(rythmeButtons,1,0,1);
  }
  rythmeButtons.push(button);

  button = new Button('Lecture',      -(l+e)/2,y1+(h+e)/4,l,(h-e)/2);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][2][0] = 0;
    update(rythmeButtons,0,2);
  }
  rythmeButtons.push(button);

  button = new Button('Écriture',     (l+e)/2,y1+(h+e)/4,l,(h-e)/2);
  button.button.onPress = function() {
    solfegeMenu[1][2][0] = 2;
    update(rythmeButtons,1,2);
  }
  rythmeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Cartes Buttons
  //----------------------------------------------------------------------------

  largeur(3);

  button = new Button('Retour',    -(l+e),yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  cartesButtons.push(button);

  button = new Button('Jouer',    l+e,yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  cartesButtons.push(button);

  //----------------------------------------------------------------------------
  //                          Lutherie Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',    -(l+e),yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  lutherieButtons.push(button);

  button = new Button('Jouer',    l+e,yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  lutherieButtons.push(button);

  //----------------------------------------------------------------------------
  //                        Compositeurs Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',    -(l+e),yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  compositeursButtons.push(button);

  button = new Button('Jouer',    l+e,yr,l,h/3);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  compositeursButtons.push(button);
}

function draw() {
  manager.draw();
}

function homeScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Nom de l'appliation",width/2,yt);

    for(let b = 0; b < homeButtons.length; b++) {
      homeButtons[b].draw();
    }
  }
}

function solfegeMenuScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Solfège",width/2,yt);

    for(let b = 0; b < solfegeButtons.length; b++) {
      solfegeButtons[b].draw();
    }

    var buttons = [];
    switch(solfegeMenu[0]) {
      case 0: buttons = aleatoireButtons; break;
      case 1: buttons = gammeButtons; break;
      case 2: buttons = rythmeButtons; break;
    }
    for(let b = 0; b < buttons.length; b++) {
      buttons[b].draw();
    }
  }
}

function solfegeGameScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Not yet...",width/2,yt);
    textSize(0.03*dimension());
    text("(actualise la page)",width/2,2*yt);
  }
}

function cartesScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Cartes",width/2,yt);

    for(let b = 0; b < cartesButtons.length; b++) {
      cartesButtons[b].draw();
    }
  }
}

function lutherieScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Lutherie",width/2,yt);

    for(let b = 0; b < lutherieButtons.length; b++) {
      lutherieButtons[b].draw();
    }
  }
}

function compositeursScene() {
  this.draw = function() {
    background(255);

    fill(black);
    textAlign(CENTER,CENTER);
    textSize(0.075*dimension());
    text("Compositeurs",width/2,yt);

    for(let b = 0; b < compositeursButtons.length; b++) {
      compositeursButtons[b].draw();
    }
  }
}
