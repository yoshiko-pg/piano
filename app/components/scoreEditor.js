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
    text.split('\n').forEach((line) => this._playLine(line));
  }

  async _playLine(line) {
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
        
        button {
          appearance: none;
          outline: none;
          cursor: pointer;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
          color: #fff;
          background-color: #adadad;
          box-shadow: 0 3px 0 #7d7d7d;
        }

        button:hover {
          background-color: #b4b4b4;
          box-shadow: 0 2px 0 #888;
          transform: translateY(1px);
        }

        button:active {
          transform: translateY(3px);
          box-shadow: none;
        }
        
        button.primary {
          background-color: #1abc9c;
          box-shadow: 0 3px 0 #0e8c73;
        }
        
        button.primary:hover {
          background-color: #31c8aa;
          box-shadow: 0 2px 0 #23a188;
        }
        
        button.primary:active {
          transform: translateY(3px);
          box-shadow: none;
        }
        
        #play {
          padding: 12px 44px 12px 18px;
          position: relative;
          font-size: 16px;
        }
        
        #play::before {
          content: '';
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #fff;
        }
        
        #play::after {
          content: '';
          position: absolute;
          right: 21px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 6px;
          border-color: transparent transparent transparent #ffffff;
        }
      </style>

      <div class="buttons">
        <button class="primary" id="play">Play text</button>
        <button id="save">Save as URL</button>
      </div>
      <textarea>${this.value}</textarea>
    `);
  }
}
