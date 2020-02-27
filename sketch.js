//------------------------------------------------------------------------------
//              Variables
//------------------------------------------------------------------------------

var marge, pas, dy, factor;
var fps, difficulty, limit;

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

var clef = 0;

var notes = [];

var yt;

var solfegeMenu      = [0,[0,0,0],0];
var cartesMenu       = [0,0];
var lutherieMenu     = [0,0];
var compositeursMenu = [0];

var grey = 87;
var black = 0;

var font;

var colorSolfege = '#6D9EEB';
var colorCartes = '#92C47D';
var colorLutherie = '#E06665';
var colorCompositeurs = '#FED966';

var buttonColor = '#53a4f5';

//------------------------------------------------------------------------------
//              Classes
//------------------------------------------------------------------------------

class Button {
  constructor(t,i,c) {
    this.button = new Clickable();
    this.button.color = 255;//255;//217;
    this.button.strokeWeight = 0;
    this.button.stroke = 0;
    this.button.text = '';

    this.t = t;
    this.tc = c?c:black;//grey;
    this.i = i;
  }

  set(x,y,l,h) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.button.locate(width /2+x-l/2,
                       height/2+y-h/2);
    this.button.resize(l,h);
    this.button.cornerRadius = 10*dimension();
  }

  drawText() {
    fill(this.tc);
    textAlign(CENTER,CENTER);
    textSize(0.1*pow(pow(this.l,2)*this.h,1/3));
    textFont(font);
    text(this.t,width/2+this.x,
                height/2+this.y-0.035*sqrt(this.l*this.h)+(this.i?this.h/3.5:0.02*this.h));
  }

  draw() {
    this.button.draw();
    this.drawText();
    if(this.i) {
      let l = this.i.width*height/2000;
      let h = this.i.height*height/2000;
      image(this.i,width/2+this.x-l/2,height/2+this.y-this.h/2.5,l,h);
    }
  }

  toggle(bool) {
    if(bool) {
      this.button.color = 217;//grey;
      //this.tc = 217;
    }
    else {
      this.button.color = 255;//217;
      //this.tc = grey;
    }
  }
}

class Note {
  constructor() {
    this.nMin = 26;
    this.nMid = 34;
    this.nMax = 42;

    this.pitch = floor(random(this.nMin,this.nMax+1));
    this.x = width - 1.8 * marge;

    this.adjustY();
    this.colour = black;
  }

  adjustY() {
    this.y = height/2 + (this.nMid-this.pitch)*marge/2 + 1.6*dy;
  }

  setColour(c) {
    this.colour = c;
  }

  draw() {
    //console.log(this.pitch, middlePitch);

    noStroke();
    fill(this.colour);

    translate(this.x + sqrt(marge) / 40, this.y + sqrt(marge) / 40);
    rotate(-0.4);
    ellipse(0, 0, 1.2 * marge, 0.9 * marge);
    rotate(0.4);
    translate(-this.x - sqrt(marge) / 40, -this.y - sqrt(marge) / 40);

    stroke(this.colour);

    var hauteur = this.pitch;

    if (hauteur <= this.nMid) {
      line(this.x + 0.54 * marge, this.y - 0.1 * marge,
           this.x + 0.54 * marge, this.y - 3 * marge);
      while(hauteur < this.nMid-4) {
        if((this.nMid-hauteur)%2 == 0) {
          line(this.x - 0.8 * marge, this.y - (hauteur-this.pitch)*marge/2,
               this.x + 0.8 * marge, this.y - (hauteur-this.pitch)*marge/2);
        }
        hauteur++;
      }
    } else {
      line(this.x - 0.54 * marge, this.y + 0.1 * marge,
           this.x - 0.54 * marge, this.y + 3 * marge);
      while(hauteur > this.nMid+4) {
        if((hauteur-this.nMid)%2 == 0) {
          line(this.x - 0.8 * marge, this.y + (this.pitch-hauteur)*marge/2,
               this.x + 0.8 * marge, this.y + (this.pitch-hauteur)*marge/2);
        }
        hauteur--;
      }
    }
  }

  move(v) {
    this.x -= v;
  }

  position() {
    return this.x;
  }

  getY() {
    return this.y - 0.35 * marge;
  }
}

//------------------------------------------------------------------------------
//              Functions
//------------------------------------------------------------------------------

function dimension() {
  return sqrt(width*height);
}

function resize(type) {
  var e = 20;
  var y0 = -(height/5+e)/2;
  var y1 = (height/5+e)/2;
  var y = y0;
  var l;
  function largeur(n) {
    l = (width-(n+1)*e)/n;
  }
  var h;
  function hauteur(n) {
    h = (height/5-(n-1)*e)/n;
  }

  //let

  var yr = height/2.6;
  var lr = (width-4*e)/3;
  var hr = h;

  yt = height/8.5;

  switch(type) {
    case 'home':
    largeur(2);
    hauteur(1);
    let dy0 = height/15;
    homeButtons[0].set(-(l+e)/2,y0+dy0-h/10,l,1.2*h);
    homeButtons[1].set((l+e)/2,y0+dy0-h/10,l,1.2*h);
    homeButtons[2].set(-(l+e)/2,y1+dy0+h/10,l,1.2*h);
    homeButtons[3].set((l+e)/2,y1+dy0+h/10,l,1.2*h);
    break;
    case 'solfege':
    largeur(3);
    hauteur(1);
    solfegeButtons[0].set(-(l+e),y0,l,h);
    solfegeButtons[1].set(0,y0,l,h);
    solfegeButtons[2].set(l+e,y0,l,h);
    largeur(2);
    solfegeButtons[3].set(-(l+e)/2,yr,l,h/2);
    solfegeButtons[4].set((l+e)/2,yr,l,h/2);
    largeur(3);
    aleatoireButtons[0].set(-(l+e),y1,l,h);
    aleatoireButtons[1].set(0,y1,l,h);
    aleatoireButtons[2].set(l+e,y1,l,h);
    largeur(4);
    gammeButtons[0].set(-3*(l+e)/2,y1,l,h);
    gammeButtons[1].set(-(l+e)/2,y1,l,h);
    gammeButtons[2].set((l+e)/2,y1,l,h);
    gammeButtons[3].set(3*(l+e)/2,y1,l,h);
    largeur(2);
    rythmeButtons[0].set(-(l+e)/2,y1-(h+e)/4,l,(h-e)/2);
    rythmeButtons[1].set((l+e)/2,y1-(h+e)/4,l,(h-e)/2);
    rythmeButtons[2].set(-(l+e)/2,y1+(h+e)/4,l,(h-e)/2);
    rythmeButtons[3].set((l+e)/2,y1+(h+e)/4,l,(h-e)/2);
    break;
    case 'cartes':
    largeur(2);
    hauteur(1);
    cartesButtons[0].set(-(l+e)/2,y0,l,h);
    cartesButtons[1].set((l+e)/2,y0,l,h);
    cartesButtons[2].set(-(l+e)/2,y1,l,h);
    cartesButtons[3].set((l+e)/2,y1,l,h);
    cartesButtons[4].set(-(l+e)/2,yr,l,h/2);
    cartesButtons[5].set((l+e)/2,yr,l,h/2);
    break;
    case 'lutherie':
    largeur(2);
    hauteur(1);
    lutherieButtons[0].set(-(l+e)/2,y0,l,h);
    lutherieButtons[1].set((l+e)/2,y0,l,h);
    lutherieButtons[2].set(-(l+e)/2,y1,l,h);
    lutherieButtons[3].set((l+e)/2,y1,l,h);
    lutherieButtons[4].set(-(l+e)/2,yr,l,h/2);
    lutherieButtons[5].set((l+e)/2,yr,l,h/2);
    break;
    case 'compositeurs':
    largeur(2);
    hauteur(1);
    compositeursButtons[0].set(-(l+e)/2,yr,l,h/2);
    compositeursButtons[1].set((l+e)/2,yr,l,h/2);
    break;
  }
}

function setMarge() {
  if (width / height > 2.8) {
    marge = width / 250;
  } else if (height > width) {
    marge = width / 53;
  } else {
    marge = width / 150;
    marge = width / 120;
  }
  pas = height / 150;
  dy = -15 * pas;
  factor = sqrt(pow(marge + pas, 2), pow(marge + pas, 2)) / 1.5;
}

function drawPortee() {
  noStroke();
  fill(255);

  let y = height / 2 + 1.6 * dy;

  rect(0, y - 5 * marge, width, 10 * marge);

  stroke(black);
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
  clefSol = loadImage('clef_sol.png');
  imageSolfege = loadImage('solfege.png');
  imageCartes = loadImage('cartes.png');
  imageLutherie = loadImage('lutherie.png');
  imageCompositeurs = loadImage('compositeurs.png');
  //clefSol = createImg('https://ibb.co/LQKk4N1');
  //font = loadFont('AmaticSC-Bold.ttf');
  font = loadFont('OLDSH___.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  setMarge();

  manager = new SceneManager();

  manager.addScene(homeScene);
    manager.addScene(solfegeMenuScene);
    manager.addScene(solfegeGameScene);
    manager.addScene(cartesScene);
    manager.addScene(lutherieScene);
    manager.addScene(compositeursScene);

  manager.showScene(homeScene);

  var button;

  //----------------------------------------------------------------------------
  //                            Home Buttons
  //----------------------------------------------------------------------------

  button = new Button('Solfège',imageSolfege,colorSolfege);
  button.button.onPress = function() {
      manager.showScene(solfegeMenuScene);
  }
  homeButtons.push(button);

  button = new Button('Cartes',imageCartes,colorCartes);
  button.button.onPress = function() {
      manager.showScene(cartesScene);
  }
  homeButtons.push(button);

  button = new Button('Lutherie',imageLutherie,colorLutherie);
  button.button.onPress = function() {
      manager.showScene(lutherieScene);
  }
  homeButtons.push(button);

  button = new Button('Compositeurs',imageCompositeurs,colorCompositeurs);
  button.button.onPress = function() {
      manager.showScene(compositeursScene);
  }
  homeButtons.push(button);

  resize('home');

  //----------------------------------------------------------------------------
  //                           Solfège Buttons
  //----------------------------------------------------------------------------

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

  button = new Button('Aléatoire',null,colorSolfege);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[0] = 0;
    update(solfegeButtons,0);
  }
  solfegeButtons.push(button);

  button = new Button('Gamme',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[0] = 1;
    update(solfegeButtons,1);
  }
  solfegeButtons.push(button);

  button = new Button('Rythme',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[0] = 2;
    update(solfegeButtons,2);
  }
  solfegeButtons.push(button);

  button = new Button('Retour',null,colorSolfege);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  solfegeButtons.push(button);

  button = new Button('Jouer',null,colorSolfege);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  solfegeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Aléatoire Buttons
  //----------------------------------------------------------------------------

  button = new Button('Aucune\nrestriction',null,colorSolfege);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 0;
    update(aleatoireButtons,0);
  }
  aleatoireButtons.push(button);

  button = new Button('Restriction\npar position',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 1;
    update(aleatoireButtons,1);
  }
  aleatoireButtons.push(button);

  button = new Button('Restriction\npar tonalité',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][0] = 2;
    update(aleatoireButtons,2);
  }
  aleatoireButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Gamme Buttons
  //----------------------------------------------------------------------------

  button = new Button('Majeur',null,colorSolfege);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 0;
    update(gammeButtons,0);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nnaturel',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 1;
    update(gammeButtons,1);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nharmonique',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 2;
    update(gammeButtons,2);
  }
  gammeButtons.push(button);

  button = new Button('Mineur\nmélodique',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][1] = 3;
    update(gammeButtons,3);
  }
  gammeButtons.push(button);

  //----------------------------------------------------------------------------
  //                           Rythme Buttons
  //----------------------------------------------------------------------------

  button = new Button('Lecture',null,colorSolfege);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[1][2] = 0;
    update(rythmeButtons,0,0,1);
  }
  rythmeButtons.push(button);

  button = new Button('Ecriture',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[1][2] = 1;
    update(rythmeButtons,1,0,1);
  }
  rythmeButtons.push(button);

  button = new Button('Binaire',null,colorSolfege);
  button.toggle(true);
  button.button.onPress = function() {
    solfegeMenu[2] = 0;
    update(rythmeButtons,0,2);
  }
  rythmeButtons.push(button);

  button = new Button('Ternaire',null,colorSolfege);
  button.button.onPress = function() {
    solfegeMenu[2] = 1;
    update(rythmeButtons,1,2);
  }
  rythmeButtons.push(button);

  resize('solfege');

  //----------------------------------------------------------------------------
  //                           Cartes Buttons
  //----------------------------------------------------------------------------

  button = new Button('Main\ndroite',null,colorCartes);
  button.toggle(true);
  button.button.onPress = function() {
    cartesMenu[0] = 0;
    update(cartesButtons,0,0,1);
  }
  cartesButtons.push(button);

  button = new Button('Main\ngauche',null,colorCartes);
  button.button.onPress = function() {
    cartesMenu[0] = 1;
    update(cartesButtons,1,0,1);
  }
  cartesButtons.push(button);

  button = new Button('Littéral\n(nom)',null,colorCartes);
  button.toggle(true);
  button.button.onPress = function() {
    cartesMenu[1] = 0;
    update(cartesButtons,0,2);
  }
  cartesButtons.push(button);

  button = new Button('Carte\n(image)',null,colorCartes);
  button.button.onPress = function() {
    cartesMenu[1] = 1;
    update(cartesButtons,1,2);
  }
  cartesButtons.push(button);

  button = new Button('Retour',null,colorCartes);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  cartesButtons.push(button);

  button = new Button('Jouer',null,colorCartes);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  cartesButtons.push(button);

  resize('cartes');

  //----------------------------------------------------------------------------
  //                          Lutherie Buttons
  //----------------------------------------------------------------------------

  button = new Button('Violon',null,colorLutherie);
  button.toggle(true);
  button.button.onPress = function() {
    lutherieMenu[0] = 0;
    update(lutherieButtons,0,0,1);
  }
  lutherieButtons.push(button);

  button = new Button('Archet',null,colorLutherie);
  button.button.onPress = function() {
    lutherieMenu[0] = 1;
    update(lutherieButtons,1,0,1);
  }
  lutherieButtons.push(button);

  button = new Button('Par image',null,colorLutherie);
  button.toggle(true);
  button.button.onPress = function() {
    lutherieMenu[1] = 0;
    update(lutherieButtons,0,2);
  }
  lutherieButtons.push(button);

  button = new Button('Par nom',null,colorLutherie);
  button.button.onPress = function() {
    solfegeMenu[1] = 1;
    update(lutherieButtons,1,2);
  }
  lutherieButtons.push(button);

  button = new Button('Retour',null,colorLutherie);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  lutherieButtons.push(button);

  button = new Button('Jouer',null,colorLutherie);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  lutherieButtons.push(button);

  resize('lutherie');

  //----------------------------------------------------------------------------
  //                        Compositeurs Buttons
  //----------------------------------------------------------------------------

  button = new Button('Retour',null,colorCompositeurs);
  button.button.onPress = function() {
    manager.showScene(homeScene);
  }
  compositeursButtons.push(button);

  button = new Button('Jouer',null,colorCompositeurs);
  button.button.onPress = function() {
    manager.showScene(solfegeGameScene);
  }
  compositeursButtons.push(button);

  resize('compositeurs');
}

function draw() {
  manager.draw();
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  resize('home');
  resize('solfege');
  resize('cartes');
  resize('lutherie');
  resize('compositeurs');
}

function homeScene() {
  this.draw = function() {
    background(255);

    fill(/*grey*/black);
    textAlign(CENTER,CENTER);
    textSize(0.12*dimension());
    text("The Violin App",width/2,yt);

    for(let b = 0; b < homeButtons.length; b++) {
      homeButtons[b].draw();
    }
  }
}

function solfegeMenuScene() {
  this.draw = function() {
    background(255);

    fill(colorSolfege);
    textAlign(CENTER,CENTER);
    textSize(0.1*dimension());
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

var buf = new Float32Array( 1024 );
var MIN_SAMPLES = 0;
var GOOD_ENOUGH_CORRELATION = 0.9;
var mic;

function solfegeGameScene() {
  this.setup = function() {
    notes = [new Note()];

    mic = new p5.AudioIn()
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
  }

  this.draw = function() {
    background(255);

    buf = fft.waveform();
    freq = autoCorrelate(buf, sampleRate() );

    console.log(mic.getLevel());

    /*fps = frameRate();
    if (fps > 10) {
      difficulty = (Math.log(notes.length / 5 + 2) + 0.5);
      vitesse = 0.05 * difficulty * (width - 7 * marge) / fps;
    }

    drawPortee();

    for (let n = 0; n < notes.length; n++) {
      notes[n].move(vitesse);
      notes[n].draw();
    }

    if (notes[notes.length - 1].position() < 5 * marge + 8.5 * (width - 7 * marge) / 10) {
      notes.push(new Note());
    }

    if (notes[0].position() < 5 * marge) { // a atteint la clef
      //notes.splice(0,1);
      if (button != -1) {
        checkAnswer();
      } else if (!hasLost){
        lostMessage = '';
        loose();
        time = millis();
      }
    }*/
  }
}

function cartesScene() {
  this.draw = function() {
    background(255);

    fill(colorCartes);
    textAlign(CENTER,CENTER);
    textSize(0.1*dimension());
    text("Cartes",width/2,yt);

    for(let b = 0; b < cartesButtons.length; b++) {
      cartesButtons[b].draw();
    }
  }
}

function lutherieScene() {
  this.draw = function() {
    background(255);

    fill(colorLutherie);
    textAlign(CENTER,CENTER);
    textSize(0.1*dimension());
    text("Lutherie",width/2,yt);

    for(let b = 0; b < lutherieButtons.length; b++) {
      lutherieButtons[b].draw();
    }
  }
}

function compositeursScene() {
  this.draw = function() {
    background(255);

    fill(colorCompositeurs);
    textAlign(CENTER,CENTER);
    textSize(0.1*dimension());
    text("Compositeurs",width/2,yt);

    for(let b = 0; b < compositeursButtons.length; b++) {
      compositeursButtons[b].draw();
    }
  }
}

//----------------------------------------------------------------------------
//                        Pitch detection
//----------------------------------------------------------------------------

function autoCorrelate( buf, sampleRate ) {
          var SIZE = buf.length;
      var MAX_SAMPLES = Math.floor(SIZE/2);
          var best_offset = -1;
      var best_correlation = 0;
      var rms = 0;
      var foundGoodCorrelation = false;
      var correlations = new Array(MAX_SAMPLES);

for (var i=0;i<SIZE;i++) {
	var val = buf[i];
	rms += val*val;
}
rms = Math.sqrt(rms/SIZE);
if (rms<0.01) // not enough signal
	return -1;

var lastCorrelation=1;
for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
	var correlation = 0;

	for (var i=0; i<MAX_SAMPLES; i++) {
		correlation += Math.abs((buf[i])-(buf[i+offset]));
	}
	correlation = 1 - (correlation/MAX_SAMPLES);
	correlations[offset] = correlation; // store it, for the tweaking we need to do below.
	if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
		foundGoodCorrelation = true;
		if (correlation > best_correlation) {
			best_correlation = correlation;
			best_offset = offset;
		}
	} else if (foundGoodCorrelation) {
		// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
		// Now we need to tweak the offset - by interpolating between the values to the left and right of the
		// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
		// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
		// (anti-aliased) offset.

		// we know best_offset >=1,
		// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
		// we can't drop into this clause until the following pass (else if).
		var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
		return sampleRate/(best_offset+(8*shift));
	}
	lastCorrelation = correlation;
}
if (best_correlation > 0.01) {
	// console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
	return sampleRate/best_offset;
}
return -1;
   //	var best_frequency = sampleRate/best_offset;
      }
