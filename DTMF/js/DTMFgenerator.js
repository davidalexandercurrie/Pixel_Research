var contextClass =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext;

if (contextClass) {
  // Web Audio API is available.
  var context = new contextClass();
}
let stopNote;
let noteEnded = true;
var oscillator1, oscillator2;

var dialTone = function (freq1, freq2, duration) {
  if (!noteEnded) {
    clearTimeout(stopNote);
    stop();
  }
  init();
  noteEnded = false;
  oscillator1.frequency.value = freq1;
  oscillator2.frequency.value = freq2;

  stopNote = setTimeout(() => {
    noteEnded = true;
    stop();
  }, duration);
};

function stop() {
  oscillator1.disconnect();
  oscillator2.disconnect();
  noteEnded = true;
}

function init() {
  oscillator1 = context.createOscillator();

  gainNode = context.createGain
    ? context.createGain()
    : context.createGainNode();
  oscillator1.connect(gainNode, 0, 0);
  gainNode.connect(context.destination);
  gainNode.gain.value = 0.1;
  oscillator1.start ? oscillator1.start(0) : oscillator1.noteOn(0);

  oscillator2 = context.createOscillator();
  gainNode = context.createGain
    ? context.createGain()
    : context.createGainNode();
  oscillator2.connect(gainNode);
  gainNode.connect(context.destination);

  gainNode.gain.value = 0.1;
  oscillator2.start ? oscillator2.start(0) : oscillator2.noteOn(0);
  gainNode.gain.value = 0.1;
}
