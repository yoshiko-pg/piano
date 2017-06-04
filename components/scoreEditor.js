import BaseComponent from './baseComponent.js';

export default class ScoreEditorComponent extends BaseComponent {
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
          })
        }
      })();
    });
  }

  timeout(msec, callback) {
    return new Promise((resolve) => {
      setTimeout(() => {
        callback();
        resolve();
      }, msec)
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
