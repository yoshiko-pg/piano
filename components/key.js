import BaseComponent from './baseComponent.js';
import Oscillator from '../lib/oscillator.js';

export default class KeyComponent extends BaseComponent {
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
