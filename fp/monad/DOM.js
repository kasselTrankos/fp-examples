// DOM is
import {h} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function DOM(tag, text, child) {
    this.tag = tag;
    this.text = text || '';
    this.child = child || [];
    this.h = h(tag, {value: text});
}

DOM.prototype.concat = function(b) {
    return new DOM(this.tag, this.text, [...this.child, b]);
}

DOM.epmty = function() {
    return new DOM('spam');
}

DOM.prototype.html = function() {
    console.log(this.h);
    return createElement(this.h)
}

module.exports = DOM;