import * as array  from './array.js';
import * as object from './object.js';
import * as index  from './index.js';

export function append(el, child){
  el.appendChild(object.is(child, String) ? document.createTextNode(child) : child);
  return el;
}

export function prepend(el, child){
  el.insertBefore(object.is(child, String) ? document.createTextNode(child) : child, el.firstChild);
  return el;
}

export function get(el, key){
  var attr = el.attributes.getNamedItem(key);
  return attr && attr.value;
}

export function assoc(el, key, value){
  var attr  = document.createAttribute(key);
  attr.value = value;
  el.attributes.setNamedItem(attr);
  return el;
}

export function hasClass(el, str){
  return el.classList.contains(str);
}

export function addClass(el, str){
  el.classList.add(str);
  return el;
}

export function removeClass(el, str){
  el.classList.remove(str);
  return el;
}

export function parent(el){
  return el.parentNode;
}

export function query(el, selector){
  return el.querySelectorAll(selector);
}

export function find(el, selector){
  return el.querySelector(selector);
}

export function style(el, pair){
  var key = pair[0], value = pair[1];
  el.style[key] = value;
  return el;
}

export function text(el){
  return el.textContent;
}

export function remove(el){
  el.parentElement.removeChild(el);
  return el;
}

//TODO use lazy list of parents -- also create lazy seq of nextSibling and previousSibling
export function closest(el, selector){
  var node = el
  while (node) {
    if (node.matches(selector))
      return node;
    node = node.parentNode;
  }
  return node;
}
//TODO extract logic in util.js tag for passing in unrealized functions until non-functions are passed in and all results are fully resolved
export function tag(name){
  return function(){
    var el = document.createElement(name);
    array.each(arguments, function(item){
      object.is(item, Object) ? object.each(item, function(pair){
        assoc(el, pair[0], pair[1]);
      }) : append(el, item);
    });
    return el;
  }
}