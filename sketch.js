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


function setup() {
  createCanvas(300, 300);
  background(215);
  audio = true;
  var button = createButton('button');
  document.querySelector('button')?.addEventListener('click', async () => {
  	await Tone.start()
  	console.log('audio is ready')
    audio = false;
  })
  fmOsc.harmonicity.value = harmonicityVal[2]
  fmOsc2.harmonicity.value = harmonicityVal[2]

}

function mousePressed() {
  if (audio == false) {
    const now = Tone.now();
    fmOsc.start();
    fmOsc2.start();
    audio = true;
  } else if (audio == true) {
    fmOsc.stop();
    fmOsc2.stop();
    audio = false;
  }

}

function harmonictyRamp() {
    fmOsc.harmonicity.linearRampToValueAtTime(harmonicityVal[harmonicityMap], Tone.now() + 0.25);
}

function draw() {
  ellipse(20 , 20, 20);
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

function touchStarted(){
  return false;
}

function touchMoved(){
  return false;
}

function touchEnded(){
  return false;
}
