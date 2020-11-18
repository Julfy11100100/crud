$(document).ready(function(){
	$(".main-block-header").click(function(){

		var a = $(this).parent(".main-block").find(".main-block-body");
		if (a.css("display") == "none"){
			a.css("display", "block");
		}
		else {
			a.css("display", "none");
		}
	});
});