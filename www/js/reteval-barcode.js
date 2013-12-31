
$(document).bind('touchmove', function(e) {
	e.preventDefault();
});

function renderBarcode(scale) {
	var canvas = $('#barcode-canvas');
	canvas.hide();
	$.mobile.loading('show');
	var patientId = $('#patient-id').val();
	var dob = $('#dob').val();
	var text = dob + patientId;
	
	var opts = {};

	var bw = new BWIPJS;

	opts = {
/*	rows: bw.value("16"), 
			columns: bw.value("16"),  */
			inkspread: bw.value(0)};

	bw.bitmap(new Bitmap);
	
	bw.scale(scale,scale);

	bw.push(text);
	bw.push(opts);

	bw.call('datamatrix');
	bw.bitmap().show('barcode-canvas', 'N');
	$.mobile.loading('hide');
	canvas.show();

	centerBarcode();
}

function centerBarcode()
{
	var canvas = $('#barcode-canvas');
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var canvasHeight = canvas.height();
	var canvasWidth = canvas.width();
	var marginLeftRight = (windowWidth-canvas.width())/2;
	canvas.css('margin-left', marginLeftRight + 'px');
	canvas.css('margin-right', marginLeftRight + 'px');
	var hHeight = $('#header').outerHeight() || 0;
	var fHeight = $('#footer').outerHeight() || 0;
	var marginTopBottom = (windowHeight - canvas.height() - hHeight - fHeight)/2 - 2;
	canvas.css('margin-top', marginTopBottom + 'px');
	canvas.css('margin-bottom', marginTopBottom + 'px');		
}

$(window).bind('resize', function() { centerBarcode(); });

$( document ).on( "pageinit", "#entry-page", function( event ) {
	$("#patient-info-form").submit( function (e) {
			e.preventDefault();
			$.mobile.changePage("#show-barcode-page");
	});
});

$( document ).on( "pageinit", "#show-barcode-page", function( event ) {

	$( "#scale-slider" ).bind( "change", function(event, ui) {
		renderBarcode($(this).val());
	});
});

$( document ).on( "pageshow", "#show-barcode-page", function( event ) {
	renderBarcode($( "#scale-slider" ).val());	
} );

