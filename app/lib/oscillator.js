let context;

export default class Oscillator {
  constructor(frequency = 880) {
    if (!context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
    }

    this.frequency = frequency;
    this.context = context;
    this.gain = context.createGain();
    this.gain.gain.value = 0.03;
    this.gain.connect(context.destination);
  }

  createOscillator() {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'triangle';
    this.oscillator.frequency.value = this.frequency;
    this.oscillator.connect(this.gain);
  }

  start() {
    this.createOscillator();
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop();
  }
}
