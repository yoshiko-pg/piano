import BaseComponent from './baseComponent.js';

export default class KeyboardComponent extends BaseComponent {
  render() {
    super.render(`
      <style>
        :host {
          display: block;
          text-align: center;
          margin: 50px 0;
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
