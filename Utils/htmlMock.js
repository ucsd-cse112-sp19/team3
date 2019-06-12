const HTMLElement = class HTMLElement {};

const document = {
  createElement: function(elem) {},
  getElementById: function(id) {},
};

const customElements = {
  define: function(a, b) {},
};

global.HTMLElement = HTMLElement;
global.customElements = customElements;
global.document = document;

require('../Components/CoreHello/CoreHello.js');
require('../Components/CustomButton/CustomButton.js');
require('../Components/CustomPopover/CustomPopover.js');
require('../Components/CustomSlider/CustomSlider.js');
