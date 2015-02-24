var parseHeader = require('parse-http-header');
var typeIs      = require('type-is');

/**
 * Get the content type
 * @returns {string}
 */
function getContentType() {
	var header = parseHeader(this.getHeader('Content-Type'));
	if (typeof(header[0]) !== 'undefined') {
		return header[0];
	} else {
		return null;
	}
}

/**
 * Get the content charset
 * @returns {string}
 */
function getCharset() {
	var header = parseHeader(this.getHeader('Content-Type'));
	if (typeof(header['charset']) !== 'undefined') {
		return header['charset'];
	} else {
		return null;
	}
}

/**
 * Check (one of) the content type(s) match
 * @param   {string|Array.<string>}  type  The mime content type(s)
 * @returns {bool}
 */
function isContentType(type) {
	return Boolean(typeIs.is(this.getContentType(), type));
}

/**
 * Mixin the content type methods to AN object
 * @param   {Object} object
 * @returns {Object}
 */
function mixin(object) {
	object.getContentType  = getContentType;
	object.getCharset      = getCharset;
	object.isContentType   = isContentType;
	return object;
};

/**
 * Parse the `Content-Type` header and add `.getContentType()` and `.getCharset()` methods to the request and response objects
 * @param   {Client} client
 */
module.exports = function(client) {

	client.on('before', function (event) {
		mixin(event.request);
		mixin(event.response);
	});

};

module.exports.mixin = mixin;