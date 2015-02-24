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

		it('should return true for a string', function() {

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
			assert(event.request.isContentType('application/json'));

		});

		it('should return false for a string', function() {

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
			assert(!event.request.isContentType('text/html'));

		});

		it('should return true for an item in an array', function() {

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
			assert(event.request.isContentType(['text/html', 'application/json']));

		});

		it('should return false for an item in an array', function() {

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
			assert(!event.request.isContentType(['text/html', 'text/plain']));

		});

	})

});
