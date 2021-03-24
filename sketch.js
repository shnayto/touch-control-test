var audio;
var fmOsc = new Tone.FMOscillator({
  frequency:200,
  type: "sine",
  modulationType: "sine",
}).toDestination();
var fmOsc2 = new Tone.FMOscillator({
  frequency : 200,
  type: "sine",
  modulationType: "sine",
}).toDestination();
const harmonicityVal = [0.25, 0.5, 1, 2, 4, 8, 16];
let harmonicityMap;
let prevHarmonicityMap;
let frequencyMap = 0;
let modulationIndexMap = 10;
let started = false;
let breakMe = false;
let fade = 155;


function setup() {
  createCanvas(windowWidth, windowHeight);
  fmOsc.harmonicity.value = harmonicityVal[2]
  fmOsc2.harmonicity.value = harmonicityVal[2]

}

function mousePressed() {
  if (started == true) {
      return false;
  } else {
    Tone.start();
    fmOsc.start();
    fmOsc2.start();
    started = true;
  }
}

function touchStarted(){
  if (started == true) {
      return false;
  } else {
    Tone.start();
    fmOsc.start();
    fmOsc2.start();
    started = true;
  }
}


function startScreen() {
  if (started == false) {
    graphics();
  } else if (started == true) {
    fade -= 5;
    graphics();
    if (fade < 1) {
      breakMe = true;
    }
  }
}

function graphics(){
  let gradient;
  let welcomeText;
  fill(50, fade);
  gradient = rect(0, 0, width, height);
  fill(250, fade);
  textSize(width/20);
  textAlign(CENTER, CENTER);
  welcomeText = text("Touch to Begin", width/2, height/2);
}

function draw() {
  background(205);
  fill(225, 15, 33, 200);
  ellipse(width/2, height/2, 200);
  startScreen();
  //console.log(fade);
  noStroke();
  prevHarmonicityMap = harmonicityMap;
  for (var i = 0  ;  i < touches.length  ;  i++) {
     modulationIndexMap = map(touches[0].x, 0, width, 0.02, 20);
     frequencyMap = map(touches[0].y, 0, height, -2, 2);

  }
  // harmonicityMap = map(touches[i].y, 0, height, 0, 6);
  // harmonicityMap = round(harmonicityMap);
  // if (harmonicityMap !== prevHarmonicityMap) {
  //   //harmonictyRamp();
  // }

   fmOsc.modulationIndex.value = modulationIndexMap;
   fmOsc2.modulationIndex.value = modulationIndexMap;
   fmOsc2.frequency.value = 200 + frequencyMap;

//  partialAmpMap = map(mouseX, 0, width, )

  //messing with harmonicity & partials
  /*
  harmonicityMap = map(mouseX, 0, width, 0.5, 2);
  amOsc.harmonicity.value = harmonicityMap;

  partialMap = map(mouseY, 0, height, 0, 10);
  partialMap = round(partialMap);
  console.log(partialMap);
  amOsc.partialCount = partialMap;
  partialAmpMap = map(mouseX, 0, width, )
  */
}

function touchMoved(){
  return false;
}

function touchEnded(){
  return false;
}
