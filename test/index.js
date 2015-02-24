var assert = require('assert');
var Client = require('go-fetch');
var plugin = require('..');

describe('content-type', function() {

	it('should add methods to the request and response objects', function() {

		var client  = new Client();
		var event   = new Client.Event({
			name:     'before',
			request:  new Client.Request('GET', 'https://api.github.com/users/digitaledgeit/repos', {'Content-Type': 'application/json; charset=utf-8'}),
			response: new Client.Response(),
			emitter:  client
		});

		//init the plugin
		plugin(client);

		//execute the plugin
		client.emit(event);

		//check the result
		assert.equal(event.request.getContentType(),  'application/json');
		assert.equal(event.request.getCharset(),      'utf-8');
		assert(event.request.isContentType('application/json'));

	});

	describe('.isContentType()', function() {

		it('should return false when the content-type does not match', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'text/html');
			assert(!response.isContentType('application/json'));
		});

		it('should return true when the content-type matches', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'application/json');
			assert(response.isContentType('application/json'));
		});

		it('should return false when the content-type matches any', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'text/html');
			assert(response.isContentType(['text/plain', 'text/html']));
		});

		it('should return true when the content-type matches a double wildcard', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'text/html');
			assert(response.isContentType('*/*'));
		});

		it('should return true when the content-type matches a single wildcard', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'text/html');
			assert(response.isContentType('text/*'));
		});

		it('should return false when the content-type does not match a single wildcard', function() {
			var response = plugin.mixin(new Client.Response());
			response.setHeader('Content-Type', 'applicaiton/html');
			assert(!response.isContentType('text/*'));
		});

	});

});
