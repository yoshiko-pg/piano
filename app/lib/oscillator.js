let context;

export default class Oscillator {
  constructor(frequency = 880) {
    if (!context) {
      context = new AudioContext();
    }

    this.frequency = frequency;
    this.context = context;
    this.gain = context.createGain();
    this.gain.gain.value = frequency < 300 ? 0.3 : 0.03;
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
