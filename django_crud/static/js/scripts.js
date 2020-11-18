$(document).ready(function(){
	$(".main-block-header").click(function(){

		var block = $(this).parent(".main-block").find(".main-block-body");
		if (block.css("display") == "none"){
			block.css("display", "block");
		}
		else {
			block.css("display", "none");
		}
	});


	$(".execute-btn").click(function(){
		var btn = $(this);
		// GET TOKEN
		if (btn.attr("id") == "auth-get-token"){

			var url = "http://127.0.0.1:8000/auth/get-token/";
			var method = "POST";
			var data = btn.parent(".edit-value").find("#request-area").val();
			var new_data = null
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");

			try {
				new_data = jQuery.parseJSON(data)
			} catch(e) {
				new_data = null
				alert("Введите пожалуйста корректный json!")
			}
			if (new_data != null){
				var settings = {
  					"url": "http://127.0.0.1:8000/auth/get-token/",
  					"method": "POST",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json"
  					},
  					"data": JSON.stringify(new_data),
  					error: function(xhr, status, error) {
  						response_area.text(xhr.responseText);
					}
				};

				$.ajax(settings).done(function (response) {
  					console.log(response);
  					response_area.text(JSON.stringify(response));
				});
			}
		}

	});

});