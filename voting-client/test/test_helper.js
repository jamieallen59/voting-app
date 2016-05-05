/**
 * We need a bit of setup code for jsdom before it's ready for React
 * to use. We need to create jsdom versions of the document and
 * window objects that would normally be provided by the web browser. Then
 * put them on the global object, so that they will be discovered
 * by React when it accesses document or window. We can set up a test helper
 * file for this kind of setup code:
 */

import jsdom from 'jsdom';
//enable chai:
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

/**
 * Additionally, we need to take all the properties that the jsdom window
 * object contains, such as navigator, and hoist them on to the Node.js
 * global object. This is done so that properties provided by window can
 * be used without the window. prefix, which is what would happen in a
 * browser.
 */

 Object.keys(window).forEach((key) => {
	 if(!(key in global)) {
		 global[key] = window[key];
	 }
 });

// activiate chai immutable
chai.use(chaiImmutable);
