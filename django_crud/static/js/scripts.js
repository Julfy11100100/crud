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
  				  "Content-Type": "application/json"
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
  					  "Content-Type": "application/json"
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
  					  "Content-Type": "application/json"
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