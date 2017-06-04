import BaseComponent from './baseComponent.js';

export default class KeyboardComponent extends BaseComponent {
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
