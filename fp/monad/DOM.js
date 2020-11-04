// DOM is

function DOM(tag, text, child) {
    this.tag = tag;
    this.text = text || '';
    this.child = child || [];
}

DOM.prototype.concat = function(b) {
    return new DOM(this.tag, this.text, [...this.child, b]);
}

DOM.epmty = function() {
    return new DOM('spam');
}

DOM.prototype.html = function() {
    return `<${this.tag}>${this.text}${this.child.map(x=>x.html()).join('')}</${this.tag}>`
}

module.exports = DOM;