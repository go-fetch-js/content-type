var parseHeader = require('parse-http-header');

/**
 * Parse the `Content-Type` header and add `.getContentType()` and `.getCharset()` methods to the request and response objects
 * @param   {Client} client
 */
module.exports = function(client) {

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
	};

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
	};


	/**
	 * Check (one of) the content type(s) match
	 * @param   {string|Array.<string>}  type  The mime content type(s)
	 * @returns {string}
	 */
	function isContentType(type) {
		if (Array.isArray(type)) {
			return type.indexOf(this.getContentType()) !== -1;
		} else {
			return this.getContentType() === type;
		}
	};

	client.on('before', function (event) {

		var
			request   = event.request,
			response  = event.response
		;

		request.getContentType  = getContentType;
		request.getCharset      = getCharset;
		request.isContentType   = isContentType;

		response.getContentType = getContentType;
		response.getCharset     = getCharset;
		response.isContentType  = isContentType;

	});

};