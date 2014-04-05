$(document).ready(function(){



	$("#listing").click(function(){
		$("#content").empty();
		$("#form").hide();
		$("#edit-form").hide();
		$('#content').append("<table id='listing-table' class='table table-hover'>\
            <tbody>\
            <tr>\
                <th>Username</th>\
                <th>Email</th>\
                <th>Telephone</th>\
                <th>Address</th>\
                <th></th>\
                <th></th>\
            </tr>\
            </tbody>\
        </table>");
		$.ajax({
			url: 'http://localhost:8080/',
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			$.each(data, function(index, elem){
					$('#listing-table > tbody:last').append("<tr data-src='"+elem._id+"'>\
                					<td>"+elem.username+"</td>\
                					<td>"+elem.email+"</td>\
                					<td>"+elem.telephone+"</td>\
                					<td>"+elem.address+"</td>\
                					<td><button class='btn btn-primary btn-edit' id='"+elem._id+"'>Edit</button></td><td><button class='btn btn-primary btn-delete' id='"+elem._id+"'>Destroy</button></td>\
            				</tr>");
			});
			$(".btn-delete").on('click', function(){
				delete_api(this.id);
			});

			$(".btn-edit").on('click', function(){
				get_one(this.id);
			});

		});
		

	});

	$("#adding").click(function(){
		$("#content").empty();
		$("#form").show();
		$("#edit-form").hide();
	});

	$("#form-first").submit(function(e){
		e.preventDefault();
		var email = $("#email-first").val();
		var username = $("#username-first").val();
		$.ajax({
			url: 'http://localhost:8080',
			type: 'POST',
			dataType: 'json',
			data: {username: username, email: email},
		})
		.done(function() {
			$("#listing").trigger('click');
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	$("#form-second").submit(function(e){
		e.preventDefault();
		var email = $("#email-second").val();
		var username = $("#username-second").val();
		var telephone = $("#telephone-second").val();
		$.ajax({
			url: 'http://localhost:8080',
			type: 'POST',
			dataType: 'json',
			data: {username: username, email: email, telephone: telephone},
		})
		.done(function() {
			$("#listing").trigger('click');
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	$("#form-edit").submit(function(e){
		e.preventDefault();
		var email = $("#email-edit").val();
		var username = $("#username-edit").val();
		var telephone = $("#telephone-edit").val();
		var address = $("#address-edit").val();
		var id = $("#id-edit").val();



		$.ajax({
			url: 'http://localhost:8080',
			type: 'PUT',
			dataType: 'json',
			data: {_id: id, email: email, username: username, telephone: telephone, address: address},
		})
		.done(function() {
			$("#listing").trigger('click');
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		


	})

	$("#form-third").submit(function(e){
		e.preventDefault();
		var email = $("#email-third").val();
		var username = $("#username-third").val();
		var telephone = $("#telephone-third").val();
		var address = $("#address-third").val();
		$.ajax({
			url: 'http://localhost:8080',
			type: 'POST',
			dataType: 'json',
			data: {username: username, email: email, telephone: telephone, address:address},
		})
		.done(function() {
			$("#listing").trigger('click');
			$("#form").hide();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});


	var get_one = function(id){
		console.log('troll');
		$.ajax({
			url: 'http://localhost:8080/' + id ,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			$("#content").empty();
			$("#edit-form").show();
			console.log(data[0].username);
			$("#username-edit").val(data[0].username);
			$("#email-edit").val(data[0].email);
			$("#telephone-edit").val(data[0].telephone);
			$("#address-edit").val(data[0].address);
			$("#id-edit").val(data[0]._id);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	};

	var delete_api = function(id){
		$.ajax({
			url: 'http://localhost:8080',
			type: 'DELETE',
			dataType: 'json',
			data: {_id: id}
		})
		.done(function(data) {
			console.log("success");
			$("[data-src='"+id + "']").hide();
		})
		.fail(function() {
			console.log("error");
		})		
	};

	$("#listing").trigger('click');
});