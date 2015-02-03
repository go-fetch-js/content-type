
var HttpClient  = require('go-fetch');
var contentType = require('..');

HttpClient()
	.use(contentType)
	.get('https://api.github.com/repos/go-fetch-js/content-type', function(error, response) {
		console.log(error, response.getContentType());
	})
;
    