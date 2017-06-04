class BaseComponent extends HTMLElement {
  constructor(state = {}) {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = state;
  }

  connectedCallback() {
    this.render();
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    this.render();
  }

  render(template) {
    this.shadowRoot.innerHTML = template;
  }
}

let context;

class Oscillator {
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

class KeyComponent extends BaseComponent {
  constructor() {
    super();

    const key = this.getAttribute('key').toUpperCase();
    const frequency = parseFloat(this.getAttribute('frequency')) || 0;

    if (!key) {
      throw new Error('attr key is required.');
    }

    this.key = key;
    this.oscillator = new Oscillator(frequency);

    window.addEventListener('keydown', this.keydown.bind(this));
    window.addEventListener('keyup', this.keyup.bind(this));
  }

  keydown(event) {
    if (event.code === 'ShiftLeft') {
      this.oscillator.frequency /= 2;
    }
    if (event.code === 'ShiftRight') {
      this.oscillator.frequency *= 2;
    }
    if (this.hasAttribute('pressing')) {
      return;
    }
    if (event.key.toUpperCase() === this.key) {
      this.setAttribute('pressing', true);
      this.oscillator.start(this.key);
      this.render();
    }
  }

  keyup(event) {
    if (event.code === 'ShiftLeft') {
      this.oscillator.frequency *= 2;
    }
    if (event.code === 'ShiftRight') {
      this.oscillator.frequency /= 2;
    }
    if (event.key.toUpperCase() === this.key) {
      this.removeAttribute('pressing');
      this.oscillator.stop();
      this.render();
    }
  }

  render() {
    super.render(`
      <style>
        :host {
          display: inline-flex;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          margin: 3px;
          border-radius: 3px;
        }
        
        :host-context(.black-keys) {
          border: 1px solid #333;
          background-color: #333;
          box-shadow: inset 0 0 4px 0 #555;
          color: #ddd;
        }
        
        :host-context(.white-keys) {
          border: 1px solid #555;
          background-color: #f3f3f3;
          box-shadow: inset 0 0 4px 0 #fff;
          color: #333;
        }
        
        :host-context(.bass-keys) {
          border: 1px solid #888;
          background-color: #888;
          color: #fff;
        }
        
        :host(:not([frequency])) {
          border: 1px solid #eee;
          background-color: #eee;
          box-shadow: none;
          color: #fff;
        }
        
        :host([pressing]) {
          background-color: #FF7B00;
          font-weight: bold;
          box-shadow: none;
          color: #fff;
          transform: translateY(2px);
        }
      </style>

      ${this.key}
    `);
  }
}

class KeyboardComponent extends BaseComponent {
  render() {
    super.render(`
      <style>
        :host {
          display: block;
          text-align: center;
          margin-top: 50px;
        }

        div {
          margin-bottom: 3px;
        }
      </style>

      <div class="black-keys">
        <my-key key="q" frequency="466.164"></my-key>
        <my-key key="w"></my-key>
        <my-key key="e" frequency="554.365"></my-key>
        <my-key key="r" frequency="622.254"></my-key>
        <my-key key="t"></my-key>
        <my-key key="y" frequency="739.989"></my-key>
        <my-key key="u" frequency="830.609"></my-key>
        <my-key key="i" frequency="932.328"></my-key>
        <my-key key="o"></my-key>
        <my-key key="p" frequency="1108.731"></my-key>
        <my-key key="[" frequency="1174.659"></my-key>
        <my-key key="]"></my-key>
      </div>
      <div class="white-keys">
        <my-key key="a" frequency="493.88"></my-key>
        <my-key key="s" frequency="523.25"></my-key>
        <my-key key="d" frequency="587.33"></my-key>
        <my-key key="f" frequency="659.26"></my-key>
        <my-key key="g" frequency="698.46"></my-key>
        <my-key key="h" frequency="783.99"></my-key>
        <my-key key="j" frequency="880.00"></my-key>
        <my-key key="k" frequency="987.767"></my-key>
        <my-key key="l" frequency="1046.502"></my-key>
        <my-key key=";" frequency="1174.659"></my-key>
        <my-key key="'" frequency="1318.510"></my-key>
      </div>
      <div class="bass-keys">
        <my-key key="z" frequency="123.471"></my-key>
        <my-key key="x" frequency="130.813"></my-key>
        <my-key key="c" frequency="146.832"></my-key>
        <my-key key="v" frequency="164.814"></my-key>
        <my-key key="b" frequency="174.614"></my-key>
        <my-key key="n" frequency="195.998"></my-key>
        <my-key key="m" frequency="220.000"></my-key>
        <my-key key="," frequency="246.942"></my-key>
        <my-key key="." frequency="261.626"></my-key>
        <my-key key="/" frequency="293.665"></my-key>
      </div>
    `);
  }
}

window.customElements.define('my-key', KeyComponent);
window.customElements.define('my-keyboard', KeyboardComponent);
