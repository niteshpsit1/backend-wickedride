var services = {
	superAdminLogin:function (url, data){
		return new RSVP.Promise(function(fulfill, reject) {
			var responseData = {};
			$.ajax({
		        url: url,
		        method: 'POST',
		        data: $.param({"options":data}),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        success: function (data, textStatus, jqXHR) {
		            if( textStatus == "success") {
		                fulfill(JSON.parse(jqXHR.responseText));
		            }
		            else {
		      			reject(JSON.parse(jqXHR.responseText));
		    		}
		        },
		        error: function (xhr,status,error){
	      			reject(JSON.parse(xhr.responseText));
		        }
			});
		});
	},
	POST:function (url, data){
	
		return new RSVP.Promise(function(fulfill, reject) {
			$.ajax({
		        url: url,
		        method: 'POST',
		        data: data,
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        success: function (data, textStatus, jqXHR) {
		        	
		            if( textStatus == "success") {
		            	console.log("service in");
		            	console.log(JSON.parse(jqXHR.responseText).response.result);
		            	fulfill(JSON.parse(jqXHR.responseText));    
		            }
		      		else {
		      			reject('error');
		    		}
		        },
		        error: function (xhr,status,error){
	      			reject(JSON.parse(xhr.responseText));
		        }
			});
		});
	},
	GET:function (url, data){
		return new RSVP.Promise(function(fulfill, reject) {
			$.ajax({
		        url: url,
		        type:'get',
		        data: data,
		        success: function (data, textStatus, jqXHR) {
		        	
		            if( textStatus == "success") {
		            	console.log("service in");
		            	console.log(JSON.parse(jqXHR.responseText).response.result);
		            	fulfill(JSON.parse(jqXHR.responseText));    
		            }
		      		else {
		      			reject('error');
		    		}
		        },
		        error: function (xhr,status,error){
	      			reject(JSON.parse(xhr.responseText));
		        }
			});
		});
	}
}