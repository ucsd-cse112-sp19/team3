'use strict';

/**
 * @file CustomButton
 */
class CustomButton extends HTMLElement {
  /**
   * @class CustomButton
   * @classdesc Create a new CustomButton component with designated styles.
   * @extends HTMLElement
   * @summary
   * ### Usage
   * *See [CustomButton Demo]{@link https://ucsd-cse112.github.io/team3/demo_components/CustomButton/CustomButton.html} for all listing examples.*
   * ```
   * <custom-button property="value">
   *     Button Text
   * </custom-button>
   * ```
   * @property {string} style - Same as style attribute in native CSS.
   * @property {string} text-color - Change color of the text within the button.
   * @property {string} background-color - Change background color of the
   * button.
   * @property {string} border-color - Change the color of the border.
   * @property {string} font - Change the font of the text within the button.
   * @property {string} width - Change the width of the button.
   * @property {string} height - Change the height of the button.
   * @property {string} hover-text-color - Change the text color when hovering
   * over the button.
   * @property {string} hover-background-color - Change the background color
   * when hovering over the button.
   * @property {string} hover-border-color - Change the border color when
   * hovering over the button.
   * @property {string} active-text-color - Change the text color when the
   * button is being clicked.
   * @property {string} active-background-color - Change the background color
   * when the button is being clicked.
   * @property {string} active-border-color - Change the border color when the
   * button is being clicked.
   * @property {boolean} rounded - Make the button appear with rounded edges.
   * @property {boolean} circle - Make the button appear as a circle.
   * @property {boolean} disabled - Make the button unable to be clicked.
   * @property {string} href - Pass a link to the button.
   *
   * @example
   * <custom-button onclick="alert('Hello world!')">
   *      Button
   * </custom-button>
   *
   * @example
   * <custom-button active-background-color="blue">
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button active-background-color="blue"
   *                rounded>
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button active-background-color="blue"
   *                rounded
   *                font="Comic Sans MS"
   *                href="https://stackoverflow.com">
   *      stack overflow
   * </custom-button>
   *
   * @example
   * <custom-button class="btn-warning" width="112px" height="63px">
   *      Warning
   * </custom-button>
   *
   * @see [CustomButton Demo]{@link https://ucsd-cse112.github.io/team3/demo_components/CustomButton/CustomButton.html} for all listing examples.
   */
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

  /**
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
    ];
  }

  /** Called when element rendered in DOM */
  connectedCallback() {
    this.updateStyle();
    if (this.hasAttribute('rounded')) {
      this.updateRounded();
    }
    if (this.hasAttribute('circle')) {
      this.updateCircle();
    }
    if (this.hasAttribute('disabled')) {
      this.updateDisabled();
    }
  }

  /**
    * Handles attribute changes on the fly.
    * @param {string} attr - The attribute changed
    * @param {string} oldValue - The value before change
    * @param {string} newValue - The value after change
    */
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('custom-button attribute ' + attr + ' was changed');
    if (attr === 'href') {
      this.shadowRoot.querySelector('a').setAttribute('href', newValue);
    } else {
      this.updateStyle();
    }
    if (this.hasAttribute('rounded')) {
      this.updateRounded();
    }
    if (this.hasAttribute('circle')) {
      this.updateCircle();
    }
    if (this.hasAttribute('disabled')) {
      this.updateDisabled();
    }
  }

  /** Getter for style */
  get style() {
    return this.getAttribute('style');
  }
  /** Setter for style
    * @param {string} val - What to set new style to
    */
  set style(val) {
    this.setAttribute('style', val);
  }
  /** Getter for text color */
  get textColor() {
    return this.getAttribute('text-color');
  }
  /** Setter for text color
    * @param {string} val - What to set new text color to
    */
  set textColor(val) {
    this.setAttribute('text-color', val);
  }
  /** Getter for background color */
  get backgroundColor() {
    return this.getAttribute('background-color');
  }
  /** Setter for background color
    * @param {string} val - What to set new background color to
    */
  set backgroundColor(val) {
    this.setAttribute('background-color', val);
  }
  /** Getter for border color */
  get borderColor() {
    return this.getAttribute('border-color');
  }
  /** Setter for border color
    * @param {string} val - What to set new border color to
    */
  set borderColor(val) {
    this.setAttribute('border-color', val);
  }
  /** Getter for font */
  get font() {
    return this.getAttribute('font');
  }
  /** Setter for font
    * @param {string} val - What to set new font to
    */
  set font(val) {
    this.setAttribute('font', val);
  }
  /** Getter for width */
  get width() {
    return this.getAttribute('width');
  }
  /** Setter for width
    * @param {string} val - What to set new width to
    */
  set width(val) {
    this.setAttribute('width', val);
  }
  /** Getter for height */
  get height() {
    return this.getAttribute('height');
  }
  /** Setter for height
    * @param {string} val - What to set new height to
    */
  set height(val) {
    this.setAttribute('height', val);
  }
  /** Getter for hover text color */
  get hoverTextColor() {
    return this.getAttribute('hover-text-color');
  }
  /** Setter for hover text color
    * @param {string} val - What to set new hover text color to
    */
  set hoverTextColor(val) {
    this.setAttribute('hover-text-color', val);
  }
  /** Getter for hover background color */
  get hoverBackgroundColor() {
    return this.getAttribute('hover-background-color');
  }
  /** Setter for hover background color
    * @param {string} val - What to set new hover background color to
    */
  set hoverBackgroundColor(val) {
    this.setAttribute('hover-background-color', val);
  }
  /** Getter for hover border color */
  get hoverBorderColor() {
    return this.getAttribute('hover-border-color');
  }
  /** Setter for hover border color
    * @param {string} val - What to set new border color to
    */
  set hoverBorderColor(val) {
    this.setAttribute('hover-border-color', val);
  }
  /** Getter for active text color */
  get activeTextColor() {
    return this.getAttribute('active-text-color');
  }
  /** Setter for active text color
    * @param {string} val - What to set new active text color to
    */
  set activeTextColor(val) {
    this.setAttribute('active-text-color', val);
  }
  /** Getter for active background color */
  get activeBackgroundColor() {
    return this.getAttribute('active-background-color');
  }
  /** Setter for active background color
    * @param {string} val - What to set new active background color to
    */
  set activeBackgroundColor(val) {
    this.setAttribute('active-background-color', val);
  }
  /** Getter for active border color */
  get activeBorderColor() {
    return this.getAttribute('active-border-color');
  }
  /** Setter for active border color
    * @param {string} val - What to set new active border color to
    */
  set activeBorderColor(val) {
    this.setAttribute('active-border-color', val);
  }
  /** Getter for if button is rounded */
  get rounded() {
    return this.getAttribute('rounded');
  }
  /** Setter for if button is rounded
    * @param {boolean} val - Whether the button should be rounded
    */
  set rounded(val) {
    this.setAttribute('rounded', val);
  }
  /** Getter for if button is circle */
  get circle() {
    return this.getAttribute('circle');
  }
  /** Setter for if button is circle
    * @param {boolean} val - Whether the button should be a circle
    */
  set circle(val) {
    this.setAttribute('circle', val);
  }
  /** Getter for if button is disabled */
  get disabled() {
    return this.getAttribute('disabled');
  }
  /** Setter for if button is disabled
    * @param {boolean} val - Whether the button should be disabled
    */
  set disabled(val) {
    this.setAttribute('disabled', val);
  }

  /**
   * Updates the style by taking user attributes, including 'style' and our own
   * API of special attributes, and passing them to the CSS for the button.
   * If the user styles an attribute (e.g. font color) using both direct CSS
   * and our custom attribute (text-color), it prioritizes custom attributes.
   */
  updateStyle() {
    const shadow = this.shadowRoot;

    // pass class attribute into the component
    const btn = shadow.querySelector('button');
    btn.setAttribute('class', this.getAttribute('class'));

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
  }
  /**
   * Handle the inclusion of the rounded attribute.
   */
  updateRounded() {
    const shadow = this.shadowRoot;
    shadow.querySelector('style').textContent += `
      button {
        border-radius: 100px;
      }
    `;
  }
  /**
   * Handle the inclusion of the circle attribute.
   */
  updateCircle() {
    const shadow = this.shadowRoot;
    shadow.querySelector('style').textContent += `
      button {
        width: 70px;
        height: 70px;
        border-radius: 100%;
      }
    `;
  }
  /**
   * Handle the inclusion of the disabled attribute.
   */
  updateDisabled() {
    const shadow = this.shadowRoot;
    shadow.querySelector('button').setAttribute('disabled', true);
    shadow.querySelector('style').textContent += `
      button {
        cursor: not-allowed;
      }
    `;
  }
}

CustomButton.template = document.createElement('template');
customElements.define('custom-button', CustomButton);
