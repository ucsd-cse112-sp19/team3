'use strict';


/** 
 * @class CustomButton
 * 
 * @summary Create a new CustomButton component with designated styles.
 * 
 * *See [CustomButton Demo]{@link https://ucsd-cse112.github.io/team3/demopages/Components/CustomButton/CustomButton.html} for all listing examples.*
 *
 * ### Usage
 * ```
 * <custom-button property="value"> Button Text </custom-button>
 * ```
 * @property {string} style - this is example
 * @property {string} text-color - this is example
 * @property {string} background-color - this is example
 * @property {string} border-color - this is example
 * @property {string} font - this is example
 * @property {string} width - this is example
 * @property {string} height - this is example
 * @property {string} hover-text-color - this is example
 * @property {string} hover-background-color - this is example
 * @property {string} hover-border-color - this is example
 * @property {string} active-text-color - this is example
 * @property {string} active-background-color - this is example
 * @property {string} active-border-color - this is example
 * @property {string} rounded - this is example
 * @property {string} circle - this is example
 * @property {string} disabled - this is example
 * @property {string} href - this is example
 * @property {string} theme - this is example
 * 
 * @example <custom-button onclick="alert('Hello world!')">Button</custom-button>
 * @example <custom-button rounded>Click Me</custom-button>
 * @example <custom-button theme="pink-lemonade" active-background-color="#ff34b3">Click Me</custom-button>
 *
 * @todo fix the property table
 */
class CustomButton extends HTMLElement {

  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CustomButton.template = document.createElement('template');
    const templateContent = CustomButton.template.content;

    // all styling performed by updateStyle() below
    CustomButton.template.innerHTML = `
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      <style></style>
      <a style='text-decoration: none'>
      <button type='button'><slot></slot></button>
      </a>
    `;
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /*
   * List of attributes supported by the component.
   * Component listens for changes to these attributes
   * and handles it using attributeChangedCallback().
   */
  static get observedAttributes() {
    return [
      'style',
      'text-color',
      'background-color',
      'border-color',
      'font',
      'width',
      'height',
      'hover-text-color',
      'hover-background-color',
      'hover-border-color',
      'active-text-color',
      'active-background-color',
      'active-border-color',
      'rounded',
      'circle',
      'disabled',
      'href',
      'theme',
    ];
  }

  /* Called when element rendered in DOM */
  connectedCallback() {
    console.log('Rendered custom-button');
    this.updateStyle();
  }

  /* Called when element destroyed */
  disconnectedCallback() {
    console.log('custom-button removed');
  }

  /* Handles attribute changes on the fly. */
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('custom-button attribute ' + attr + ' was changed');
    if (attr === 'href') {
      this.shadowRoot.querySelector('a').setAttribute('href', newValue);
    } else {
      this.updateStyle();
    }
  }

  /* Getters and setters for observed attributes because WHY NOT */
  get style() {
    return this.getAttribute('style');
  }
  set style(val) {
    this.setAttribute('style', val);
  }
  get textColor() {
    return this.getAttribute('text-color');
  }
  set textColor(val) {
    this.setAttribute('text-color', val);
  }
  get backgroundColor() {
    return this.getAttribute('background-color');
  }
  set backgroundColor(val) {
    this.setAttribute('background-color', val);
  }
  get borderColor() {
    return this.getAttribute('border-color');
  }
  set borderColor(val) {
    this.setAttribute('border-color', val);
  }
  get font() {
    return this.getAttribute('font');
  }
  set font(val) {
    this.setAttribute('font', val);
  }
  get width() {
    return this.getAttribute('width');
  }
  set width(val) {
    this.setAttribute('width', val);
  }
  get height() {
    return this.getAttribute('height');
  }
  set height(val) {
    this.setAttribute('height', val);
  }
  get hoverTextColor() {
    return this.getAttribute('hover-text-color');
  }
  set hoverTextColor(val) {
    this.setAttribute('hover-text-color', val);
  }
  get hoverBackgroundColor() {
    return this.getAttribute('hover-background-color');
  }
  set hoverBackgroundColor(val) {
    this.setAttribute('hover-background-color', val);
  }
  get hoverBorderColor() {
    return this.getAttribute('hover-border-color');
  }
  set hoverBorderColor(val) {
    this.setAttribute('hover-border-color', val);
  }
  get activeTextColor() {
    return this.getAttribute('active-text-color');
  }
  set activeTextColor(val) {
    this.setAttribute('active-text-color', val);
  }
  get activeBackgroundColor() {
    return this.getAttribute('active-background-color');
  }
  set activeBackgroundColor(val) {
    this.setAttribute('active-background-color', val);
  }
  get activeBorderColor() {
    return this.getAttribute('active-border-color');
  }
  set activeBorderColor(val) {
    this.setAttribute('active-border-color', val);
  }
  get rounded() {
    return this.getAttribute('rounded');
  }
  set rounded(val) {
    this.setAttribute('rounded', val);
  }
  get circle() {
    return this.getAttribute('circle');
  }
  set circle(val) {
    this.setAttribute('circle', val);
  }
  get disabled() {
    return this.getAttribute('disabled');
  }
  set disabled(val) {
    this.setAttribute('disabled', val);
  }
  get theme() {
    return this.getAttribute('theme');
  }
  set theme(val) {
    this.setAttribute('theme', val);
  }
  
  /*
   * Updates the style by taking user attributes, including 'style' and our own
   * API of special attributes, and passing them to the CSS for the button.
   * If the user styles an attribute (e.g. font color) using both direct CSS
   * and our custom attribute (text-color), it prioritizes custom attributes.
   */
  updateStyle() {
    console.log('Updating custom-button styles');

    const shadow = this.shadowRoot;

    // pass class attribute into the component
    const btn = shadow.querySelector('button');
    if (this.hasAttribute('class')) {
      btn.setAttribute('class', this.getAttribute('class'));
    }

    // provides default styles in case the user doesn't provide one
    shadow.querySelector('style').textContent = `
      :host {
        --hover-text-color: ${this.hoverTextColor ?
                            this.hoverTextColor : '#ffffff'};
        --hover-background-color: ${this.hoverBackgroundColor ?
                            this.hoverBackgroundColor : '#1f57a4'};
        --hover-border-color: ${this.hoverBorderColor ?
                                this.hoverBorderColor : '#c8daf4'};
        --active-text-color: ${this.activeTextColor ?
                                this.activeTextColor : '#ffffff'};
        --active-background-color: ${this.activeBackgroundColor ?
                                this.activeBackgroundColor : '#25467a'};
        --active-border-color: ${this.activeBorderColor ?
                                this.activeBorderColor : '#ffffff'};
      }
      button {
        ${this.style};
        color: ${this.textColor ? this.textColor : '#ffffff'};
        background-color: ${this.backgroundColor ?
                                this.backgroundColor : '#2d74da'};
        border: solid ${this.borderColor ? this.borderColor : '#cccccc'} 1px;
        font-family: ${this.font ? this.font : 'Georgia'};
        display: block;
        width: ${this.width ? this.width : '90px'};
        height: ${this.height ? this.height : '45px'};
      }
      button:hover {
        color: var(--hover-text-color);
        background-color: var(--hover-background-color);
        border-color: var(--hover-border-color);
      }
      button:active {
        color: var(--active-text-color);
        background-color: var(--active-background-color);
        border-color: var(--active-border-color);
        box-shadow: ${this.activeBackgroundColor ?
                '0px 0px 0px 3px this.activeBackgroundColor inset,' +
                '0px 0px 0px 4px white inset' :
                '0px 0px 0px 3px #25467a inset, 0px 0px 0px 4px white inset'};  
      }
      button:focus {
        outline: none;
      }
    `;
    if (this.hasAttribute('rounded')) {
      shadow.querySelector('style').textContent += `
        button {
          border-radius: 100px;
        }
      `;
    }
    if (this.hasAttribute('circle')) {
      shadow.querySelector('style').textContent += `
        button {
          width: 70px;
          height: 70px;
          border-radius: 100%;
        }
      `;
    }
    if (this.hasAttribute('disabled')) {
      shadow.querySelector('button').setAttribute('disabled', true);
      shadow.querySelector('style').textContent += `
        button {
          cursor: not-allowed;
        }
      `;
    }
    if (this.hasAttribute('theme')) {
      let textColor = '';
      let backgroundColor = '';
      let borderColor = '';
      let hoverTextColor = '';
      let hoverBackgroundColor = '';
      let hoverBorderColor = '';
      let activeTextColor = '';
      let activeBackgroundColor = '';
      let activeBorderColor = '';

      switch (this.theme) {
        case 'mad-queen':
          textColor = '#dd0000';
          backgroundColor = '#000000';
          borderColor = '#dd0000';
          hoverTextColor = '#000000';
          hoverBackgroundColor = '#dd0000';
          hoverBorderColor = '#000000';
          activeTextColor = '#000000';
          activeBackgroundColor = '#ff0000';
          activeBorderColor = '#000000';
          break;
        case 'desert':
          textColor = '#a52a2a';
          backgroundColor = '#ffdead';
          borderColor = '#a52a2a';
          hoverTextColor = '#ffdead';
          hoverBackgroundColor = '#a52a2a';
          hoverBorderColor = '#ffdead';
          activeTextColor = '#ffdead';
          activeBackgroundColor = '#c54a4a';
          activeBorderColor = '#ffdead';
          break;
        case 'ocean':
          textColor = '#7fffd4';
          backgroundColor = '#00379b';
          borderColor = '#7fffd4';
          hoverTextColor = '#00379b';
          hoverBackgroundColor = '#7fffd4';
          hoverBorderColor = '#00379b';
          activeTextColor = '#00379b';
          activeBackgroundColor = '#9ffff4';
          activeBorderColor = '#00379b';
          break;
        case 'pink-lemonade':
          textColor = '#ff1493';
          backgroundColor = '#ffff00';
          borderColor = '#ff1493';
          hoverTextColor = '#ffff00';
          hoverBackgroundColor = '#ff1493';
          hoverBorderColor = '#ffff00';
          activeTextColor = '#ffff00';
          activeBackgroundColor = '#ff34b3';
          activeBorderColor = '#ffff00';
          break;
        case 'forest':
          textColor = '#52ed32';
          backgroundColor = '#a52a2a';
          borderColor = '#52ed32';
          hoverTextColor = '#a52a2a';
          hoverBackgroundColor = '#52ed32';
          hoverBorderColor = '#a52a2a';
          activeTextColor = '#a52a2a';
          activeBackgroundColor = '#72ff52';
          activeBorderColor = '#a52a2a';
          break;
        case 'ghost':
          textColor = '#aaaaaa';
          backgroundColor = '#ffffff';
          borderColor = '#aaaaaa';
          hoverTextColor = '#ffffff';
          hoverBackgroundColor = '#aaaaaa';
          hoverBorderColor = '#ffffff';
          activeTextColor = '#ffffff';
          activeBackgroundColor = '#cccccc';
          activeBorderColor = '#ffffff';
          break;
        case 'flame':
          textColor = '#ffbb00';
          backgroundColor = '#ff2400';
          borderColor = '#ffbb00';
          hoverTextColor = '#ff2400';
          hoverBackgroundColor = '#ffbb00';
          hoverBorderColor = '#ff2400';
          activeTextColor = '#ff2400';
          activeBackgroundColor = '#ffdb00';
          activeBorderColor = '#ff2400';
          break;
        case 'triton':
          textColor = '#ffd700';
          backgroundColor = '#000080';
          borderColor = '#ffd700';
          hoverTextColor = '#000080 ';
          hoverBackgroundColor = '#ffd700';
          hoverBorderColor = '#000080 ';
          activeTextColor = '#000080 ';
          activeBackgroundColor = '#fff700';
          activeBorderColor = '#000080 ';
          break;
        default:
      }
      shadow.querySelector('style').textContent += `
        button {
          color: ${textColor};
          background-color: ${backgroundColor};
          border-color: ${borderColor};
        }
        button:hover {
          color: ${hoverTextColor};
          background-color: ${hoverBackgroundColor};
          border-color: ${hoverBorderColor};
        }
        button:active {
          color: ${activeTextColor};
          background-color: ${activeBackgroundColor};
          border-color: ${activeBorderColor};
        }
      `;
    }
  }
}

CustomButton.template = document.createElement('template');
customElements.define('custom-button', CustomButton);
