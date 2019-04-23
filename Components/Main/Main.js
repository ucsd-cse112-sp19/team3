const testLog = 'test log.';
console.log(testLog);


window.customElements.define('x-foo-with-markup', class extends HTMLElement {
/** This is a description of the foo function. */
  connectedCallback() {
    this.innerHTML = '<b>A Custom Element!</b>';
  }

  /** This is a description of the foo function. */
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', (e) => {
      alert('clicked!');
    });
  }
});
