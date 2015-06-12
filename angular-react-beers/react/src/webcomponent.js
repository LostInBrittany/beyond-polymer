import React from 'react/addons';

function uuid() {
  var d = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
}

var registrationFunction = undefined

try {
  registrationFunction = (document.registerElement || document.register || function() {
      if (window.console) console.error('[React] No registerElement function, webcomponents will not work !!!');
  }).bind(document);
} catch(e) {}

function registerWebComponent(tag, reactClass) {
  console.log(`registering WebComponent ${tag}`);
  var thatDoc = document;
  var ElementProto = Object.create(HTMLElement.prototype);
  ElementProto.createdCallback = function() {
    var props = {};
    for (var i in this.attributes) {
      var item = this.attributes[i];
      props[item.name] = item.value;    
    }
    this.props = props;
    var fragment = document.createElement('content');
    fragment.setAttribute('id', uuid());
    this.appendChild(fragment);
    var element = React.createElement(reactClass, this.props);
    this.renderedReactElement = React.render(element, fragment); 
  };
  ElementProto.attributeChangedCallback = function (attr, oldVal, newVal) {
    this.props[attr] = newVal;
    this.renderedReactElement.setProps(this.props);
  };
  registrationFunction(tag, { prototype: ElementProto });
}

if (registrationFunction) {
  exports.registerWebComponent = registerWebComponent;
} else {
  exports.registerWebComponent = function() {
    if (window.console) console.error('[React] WebComponent not available here :(');
  };
}