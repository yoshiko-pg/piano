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
    // console.log('play');
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
          width: 450px;
          height: 150px;
          font-size: 14px;
          line-height: 1.2;
        }
        
        .buttons {
          margin: 10px 0 20px;
        }
      </style>

      <textarea>${this.value}</textarea>
      <div class="buttons">
        <button id="play">Play</button>
        <button id="save">Save as URL</button>
      </div>
    `);
  }
}
