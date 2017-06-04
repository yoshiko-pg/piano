class BaseComponent extends HTMLElement {
  constructor(state = {}) {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = state;
    this.$ = this.querySelector;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
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

class KeyComponent extends BaseComponent {
  connectedCallback() {
    const key = (this.getAttribute('key') || '').toUpperCase();
    const frequency = parseFloat(this.getAttribute('frequency')) || 0;

    if (!key) {
      throw new Error('attr key is required.');
    }

    this.key = key;
    this.oscillator = new Oscillator(frequency);

    if (this.hasAttribute('frequency')) {
      window.addEventListener('keydown', this.keydown.bind(this));
      window.addEventListener('keyup', this.keyup.bind(this));
      this.addEventListener('mousedown', this.mousedown.bind(this));
      this.addEventListener('mouseup', this.mouseup.bind(this));
    }

    this.render();
  }

  mousedown() {
    const event = new Event('keydown');
    event.key = this.key;
    window.dispatchEvent(event);
  }

  mouseup() {
    const event = new Event('keyup');
    event.key = this.key;
    window.dispatchEvent(event);
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
          cursor: pointer;
          user-select: none;
          
          border: 1px solid #555;
          background-color: #f3f3f3;
          box-shadow: inset 0 0 4px 0 #fff;
          color: #333;
        }
        
        :host-context(.black-keys) {
          border: 1px solid #333;
          background-color: #333;
          box-shadow: inset 0 0 4px 0 #555;
          color: #ddd;
        }
        
        :host-context(.bass-keys) {
          opacity: 0.8;
        }
        
        :host(:not([frequency])) {
          border: 1px solid #eee;
          background-color: #eee;
          box-shadow: none;
          color: #fff;
          cursor: default;
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
          margin: 50px 0 40px;
        }

        div {
          margin-bottom: 3px;
        }
        
        .bass-keys {
          background-color: #888;
          display: inline-block;
          padding: 4px 10px;
          border-radius: 5px;
          margin-top: 13px;
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
        <span class="white-keys">
          <my-key key="z" frequency="261.626"></my-key>
        </span>
        <span class="black-keys">
          <my-key key="x" frequency="277.183"></my-key>
        </span>
        <span class="white-keys">
          <my-key key="c" frequency="293.665"></my-key>
        </span>
        <span class="black-keys">
          <my-key key="v" frequency="311.127"></my-key>
        </span>
        <span class="white-keys">
          <my-key key="b" frequency="329.628"></my-key>
          <my-key key="n" frequency="349.228"></my-key>
        </span>
        <span class="black-keys">
          <my-key key="m" frequency="369.994"></my-key>
        </span>
        <span class="white-keys">
          <my-key key="," frequency="391.995"></my-key>
        </span>
        <span class="black-keys">
          <my-key key="." frequency="415.305"></my-key>
        </span>
        <span class="white-keys">
          <my-key key="/" frequency="440.000"></my-key>
        </span>
      </div>
    `);
  }
}

class ScoreEditorComponent extends BaseComponent {
  constructor() {
    super();
    this.value = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  }

  connectedCallback() {
    this.render();

    this.$('#play').addEventListener('click', this.play.bind(this));
    this.$('#save').addEventListener('click', this.save.bind(this));
  }

  play() {
    const text = this.$('textarea').value;
    text.split('\n').forEach((line) => {
      (async () => {
        for (const char of line.split('')) {
          const event = new Event('keydown');
          event.key = char;
          window.dispatchEvent(event);
          await this.timeout(150, () => {
            const event = new Event('keyup');
            event.key = char;
            window.dispatchEvent(event);
          });
        }
      })();
    });
  }

  timeout(msec, callback) {
    return new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, msec);
    });
  }

  save() {
    const text = this.$('textarea').value;
    const encoded = encodeURIComponent(text);
    history.pushState(null, null, `#${encoded}`);
  }

  render() {
    super.render(`
      <style>
        textarea {
          min-width: 600px;
          min-height: 80px;
          font-size: 14px;
          line-height: 1.2;
          font-family: Monaco, monospace;
        }
        
        .buttons {
          margin: 0 0 30px;
        }
        
        .buttons button {
          margin: 0 10px;
        }
      </style>

      <div class="buttons">
        <button id="play">Play</button>
        <button id="save">Save as URL</button>
      </div>
      <textarea>${this.value}</textarea>
    `);
  }
}

window.customElements.define('my-key', KeyComponent);
window.customElements.define('my-keyboard', KeyboardComponent);
window.customElements.define('my-score-editor', ScoreEditorComponent);
