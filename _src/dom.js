import {subj} from './core/function.js';
import * as dom from './core/dom.js';
export {parent, text, tag} from './core/dom.js';
export const append      = subj(dom.append);
export const prepend     = subj(dom.prepend);
export const get         = subj(dom.get);
export const assoc       = subj(dom.assoc);
export const hasClass    = subj(dom.hasClass);
export const addClass    = subj(dom.addClass);
export const removeClass = subj(dom.removeClass);
export const closest     = subj(dom.closest);
export const query       = subj(dom.query);
export const find        = subj(dom.find);
export const style       = subj(dom.style);
export const remove      = dom.remove;
export const show        = style(["display", "inherit"]);
export const hide        = style(["display", "none"]);