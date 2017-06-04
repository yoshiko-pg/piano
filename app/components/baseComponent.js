export default class BaseComponent extends HTMLElement {
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
