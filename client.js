var Masonry = require('masonry-layout');
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin( $ );
jQueryBridget( 'masonry', Masonry, $ );

// element argument can be a selector string
//   for an individual element
$('.grid').masonry({
	// options
	itemSelector: '.grid-item',
	percentPosition: true,
	columnWidth: '.grid-sizer'

});
console.log('blah')
var imageQueue = [];

  
var socket = io.connect('http://localhost:8080');

socket.on('images', function(imageArr) {
	console.log(imageArr);
	addImagesToQueue(imageArr);

});

socket.emit('images', "blah from client itself");
setInterval(renderImage, 200);


function addImagesToQueue(imageArr) {
	imageQueue = imageQueue.concat(imageArr);
}

function renderImage() {
	if(imageQueue.length) {
		var imageSrc = imageQueue.shift();
		var $newImage = $('<img>').attr('src', imageSrc);
		var $newGridItem = $('<div class="grid-item grid-item--width' + randomRange(1,3) + '">');
		$newGridItem.append($newImage);
		$newGridItem.hide();
		console.log($newGridItem);

		$('.grid').append($newGridItem);
		$newGridItem.hide();


		$newGridItem.imagesLoaded().progress(function(imgLoad, image ){
			console.log('DONnE')
			
			 var $item = $( image.img ).parents('.grid-item');
			 $item.show();
			$('.grid').masonry('appended', $item);

		});
	}

}

function randomRange(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}




