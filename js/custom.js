$( document ).ready(function() {
	var images = $('img');
	$('img').each(function(){
		var img = this;
		var downloadingImage = new Image();
		downloadingImage.src = $(img).data('src');
		downloadingImage.onload = function(){
			$(img).attr('src',this.src);
		};
	});
});


