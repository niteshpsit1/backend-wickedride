var AboutUs = React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			aboutUsMessage:'',
			edit:false,
			email : null,
			phone : null,
			emailError : false,
			phoneError : false,
			emailErrorMessage : "Invalid email",
			phoneErrorMessage : "Invalid Contact, it must be numeric",
			blankOne : false,
			blankTwo : false,
			emailBlank : "Email cannot be left blank",
			phoneBlank : "Contact number cannot be left blank"
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.state.token
		};
		services.POST(config.url.getAboutUs, requestData)
		.then(function(data){
			setTimeout(function() {
				currentThis.setState({
					aboutUsMessage:data.response.htmlText
				})	
			}, 0);
			setTimeout(function() {
				$('#aboutUsMessage').html((currentThis.state.aboutUsMessage).replace(/^\s+|\s+$/g, ''));
			}, 0);
		})
		.catch(function(error){
				
		});	
	},

	_onchange: function(event){
		var self = this;
		var email = null;
		var phone = null;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var ph = /^[0-9\+]{1,}[0-9\-]{3,15}$/;
		if(event.target.name == "email"){
			email = event.target.value;
			if(email==null || email == "") {
				this.setState({blankOne : true});
				setTimeout(function(){
						self.setState({blankOne : false}); 
					}, 3000);
			}else if(!re.test(email)){
				this.setState({emailError : true});
					setTimeout(function(){
						self.setState({emailError : false}); 
					}, 3000);
			}

			this.setState({
				email: event.target.value
			});

			
		}
		else if(event.target.name == "phone"){
			phone = event.target.value;

			if(!ph.test(phone)){
				this.setState({phoneError : true});
					setTimeout(function(){
						self.setState({phoneError : false}); 
					}, 5000);
			}
			this.setState({
				phone: event.target.value
			});
			
		}
		
	},

	render: function(){
		return (
			<div className="main about-us-page common-table">
				<div  className="main-content">
					<div className="page-title">
						<h1>About Us</h1>
						<div className="filter-block edit">
							<a href="#" name="edit" onClick={this._onClick}>Edit</a>
						</div>
					</div>
					{	!this.state.edit	&&
						<div className="content">
							<div className="abt-text-block">
								<p className="abt-text">
									<div id="aboutUsMessage"></div>
								</p>
							</div>
						</div>}

					{	this.state.edit	&&
						
						<div className="content">
						
							<table>
							    <tbody>
								    <tr>
									    <td><label>Email</label></td>
									    <td><input type="email" name="email" id="email" onBlur={this._onchange} />&nbsp;&nbsp;
									    {this.state.emailError && 
									   <div className="errorMess">{this.state.emailErrorMessage}</div>}
									   {this.state.blankOne && 
									   <div className="errorMess">{this.state.emailBlank}</div>}
									   </td>
									    <td><label>Phone no.</label></td>
									    <td><input type="text" name="phone" id="phone" onBlur={this._onchange} />&nbsp;&nbsp;
									    {this.state.phoneError && 
									   <div className="errorMess">{this.state.phoneErrorMessage}</div>}
									   {this.state.blankTwo && 
									   <div className="errorMess">{this.state.phoneBlank }</div>}
									   </td>
									</tr>
								</tbody>
							</table>

							<div className="abt-text-block">
								<p className="abt-text">
									<div>
									<textarea rows="10"  cols="15" name="aboutUsMessage"  defaultValue={this.state.aboutUsMessage}></textarea>
									<div className="orangeBtn">
									    <button type="button" name="change" className="btn"  onClick={this._onClick}>Save</button>
									</div>
									</div>
								</p>
							</div>
							
						</div>}
				</div>
			</div>
		);
	},
	
	_onClick: function(event){
		
		var currentThis = this;
		currentThis.setState({emailError : false, phoneError : false});
		if($(event.target).attr("name") == "edit"){
			setTimeout(function() {
				currentThis.setState({
					edit:true
				})	
			}, 0);
			setTimeout(function() {
				CKEDITOR.replace( 'aboutUsMessage' );
			}, 0);	
		}
		else if($(event.target).attr("name") == "change"){

			if(currentThis.state.email==null || currentThis.state.email=="" && currentThis.state.phone==null || currentThis.state.phone=="") {
				currentThis.setState({blankOne: true, blankTwo : true});
				setTimeout(function(){
						currentThis.setState({blankOne: false, blankTwo : false}); 
					}, 3000);
			}else if(currentThis.state.email==null || currentThis.state.email=="" ){
				currentThis.setState({blankOne: true});
				setTimeout(function(){
						currentThis.setState({blankOne: false}); 
					}, 3000);
			}else if(currentThis.state.phone==null || currentThis.state.phone==""){
				currentThis.setState({blankTwo: true});
				setTimeout(function(){
						currentThis.setState({ blankTwo : false}); 
					}, 3000);
			}
			else {
			var requestData = {};
			requestData.token = this.state.token;
			requestData.htmlText = CKEDITOR.instances.aboutUsMessage.getData();
			requestData.email = this.state.email;
			requestData.phone = this.state.phone;
			services.POST(config.url.postAboutUs, requestData)
			.then(function(data){
				
				if(data.response.flag){
					setTimeout(function() {
						currentThis.setState({
							aboutUsMessage:CKEDITOR.instances.aboutUsMessage.getData(),
							edit:false
						})	
					}, 0);
					setTimeout(function() {
						$('#aboutUsMessage').html((currentThis.state.aboutUsMessage).replace(/^\s+|\s+$/g, ''));
					}, 0);
				}
			})
			.catch(function(error){
				
				/*if(error.response.message=="Invalid Email") {
					
					currentThis.setState({emailError : true});
					setTimeout(function(){
						currentThis.setState({emailError : false}); 
					}, 5000);
				}else if(error.response.message=="Invalid Contact, it must be numeric") {
					currentThis.setState({phoneError : true});
					setTimeout(function(){
						currentThis.setState({phoneError : false}); 
					}, 5000);
				}*/
			})
		}
	}
}
});