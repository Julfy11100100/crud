$(document).ready(function(){
	$(".main-block-header").click(function(){

		var block = $(this).parent(".main-block").find(".main-block-body");
		if (block.css("display") == "none"){
			block.css("display", "block");
			$(this).css({
				'border-radius': '20px 20px 0px 0px',
				'-webkit-border-radius': '20px 20px 0px 0px',
				'-moz-border-radius': '20px 20px 0px 0px'
			});
		}
		else {
			block.css("display", "none");
			$(this).css({
				'border-radius': '20px',
				'-webkit-border-radius': '20px',
				'-moz-border-radius': '20px'
			});
		}
	});

	$(".token-btn").click(function(){

		var input = $(this).parent(".auth").find(".token-input");

		if (input.prop("disabled") == true) {
			input.prop("disabled", false);
			$(this).css("background", "green");
			$(this).text("upload token");
			$(this).parent(".auth").css("background", "red");
		}
		else {
			input.prop("disabled", true);
			$(this).css("background", "red");
			$(this).text("another token");
			$(this).parent(".auth").css("background", "green");
		}

	});


	$(".execute-btn").click(function(){

		var btn = $(this);
		var token = "";
		if ($(".token-input").prop("disabled") == true) {
			token = $(".token-input").val();
		};

		// GET TOKEN
		if (btn.attr("id") == "auth-get-token"){

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

		// GET USERS
		else if (btn.attr("id") == "api-users") {
			
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");
			var settings = {
  				"url": "http://127.0.0.1:8000/api/users/",
  				"method": "GET",
  				"timeout": 0,
  				"headers": {
  				  "Content-Type": "application/json",
  				  "Authorization": "Bearer " + token
  				},
  				error: function(xhr, status, error) {
  					response_area.text(xhr.responseText);
				}
			};
			$.ajax(settings).done(function (response) {
  				console.log(response);
  				response_area.text(JSON.stringify(response));
			});	
		}

		// USER CREATE
		else if (btn.attr("id") == "api-user-create") {
			
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
  					"url": "http://127.0.0.1:8000/api/user-create/",
  					"method": "POST",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json",
  					  "Authorization": "Bearer " + token
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

		// GET USER BY ID
		else if (btn.attr("id") == "api-user-get") {
			
			var id = btn.parent(".edit-value").find(".input-number").val();
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");

			if (id > 0 && $.isNumeric(id)){
				var settings = {
  					"url": "http://127.0.0.1:8000/api/user-get/" + id + "/",
  					"method": "GET",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json",
  					  "Authorization": "Bearer " + token
  					},
  					error: function(xhr, status, error) {
  						response_area.text(xhr.responseText);
					}
				};

				$.ajax(settings).done(function (response) {
  					console.log(response);
  					response_area.text(JSON.stringify(response));
				});
			}
			else { alert("Введите пожалуйста корректное число!");}	
		}

		// USER UPDATE PUT
		else if (btn.attr("id") == "api-user-update-put") {
			
			var id = btn.parent(".edit-value").find(".input-number").val();
			var data = btn.parent(".edit-value").find("#request-area").val();
			var new_data = null
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");

			try {
				new_data = jQuery.parseJSON(data)
			} catch(e) {
				new_data = null
				alert("Введите пожалуйста корректный json!")
			}
			if (new_data != null && id > 0 && $.isNumeric(id)){
				var settings = {
  					"url": "http://127.0.0.1:8000/api/user-update-put/" + id + "/",
  					"method": "PUT",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json",
  					  "Authorization": "Bearer " + token
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

		// USER UPDATE PATCH
		else if (btn.attr("id") == "api-user-update-patch") {
			
			var id = btn.parent(".edit-value").find(".input-number").val();
			var data = btn.parent(".edit-value").find("#request-area").val();
			var new_data = null
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");

			try {
				new_data = jQuery.parseJSON(data)
			} catch(e) {
				new_data = null
				alert("Введите пожалуйста корректный json!")
			}
			if (new_data != null && id > 0 && $.isNumeric(id)){
				var settings = {
  					"url": "http://127.0.0.1:8000/api/user-update-patch/" + id + "/",
  					"method": "PATCH",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json",
  					  "Authorization": "Bearer " + token
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

		//USER DELETE
		else if (btn.attr("id") == "api-user-delete") {
			
			var id = btn.parent(".edit-value").find(".input-number").val();
			var response_area = btn.parent(".edit-value").parent(".parameters").find(".responses-data").find(".response-area");

			if (id > 0 && $.isNumeric(id)){
				var settings = {
  					"url": "http://127.0.0.1:8000/api/user-delete/" + id + "/",
  					"method": "DELETE",
  					"timeout": 0,
  					"headers": {
  					  "Content-Type": "application/json",
  					  "Authorization": "Bearer " + token
  					},
  					error: function(xhr, status, error) {
  						response_area.text(xhr.responseText);
					}
				};

				$.ajax(settings).done(function (response) {
  					console.log(response);
  					response_area.text(JSON.stringify(response));
				});
			}
			else { alert("Введите пожалуйста корректное число!");}	
		}

	});

});