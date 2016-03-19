var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8081;
server.listen(port);

app.use(express.static('public'));

app.get('/', function(req, res) {
	console.log('BVHJALDFH')
	res.sendFile(__dirname + '/public/index.html');

	io.on('connection', function(socket) {
		makeRequest();
		// setInterval(makeRequest, 5000); //simulation


		function makeRequest() {
			console.log('makerequest')
			//All the web scraping magic will happen here
			url = 'http://wwd.com/fashion-news/fashion-features/gallery/los-angeles-fashion-week-fall-2016-naven-10393054/';

			request(url, function(error, response, html) {

				// First we'll check to make sure no errors occurred when making the request

				if (!error) {
					// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

					var $ = cheerio.load(html);

					// Finally, we'll define the variables we're going to capture

					var images = [];
					// var json = { title : "", release : "", rating : ""};
					$('.gallery-multi img').each(function(i, img) {

						// Let's store the data we filter into a variable so we can easily see what's going on.
						var imgSrc = $(img).attr('src').split('?')[0];
						imgSrc += "?w=200";
						images.push(imgSrc);
					});

					socket.emit('images', images)
					// fs.writeFile('output.json', JSON.stringify(images, null, 4), function(err) {

					// 	console.log('File successfully written! - Check your project directory for the output.json file');

					// });
				}
			});
		}

	});
});









console.log('Magic happens on port 8081');

exports = module.exports = app;