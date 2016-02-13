var PasswordSetting = React.createClass({
	getInitialState: function(){
		return {
			confirmPassword:"",
			password:"",
			oldPassword:"",
			errorMessage:"",
			successMessaage:""
		}
	},
	render: function(){
		return (
			<div className="pwd-block">
				<div className="page-title">
					<h1>Password Settings</h1>
				</div>
				<form>
					<div className="f1"><label>Old Password</label><input type="password" name="oldPassword" className="form-control" onChange={this._onChange}/></div>
					<div className="f2"><label>New Password</label><input type="password" name="password" className="form-control" onChange={this._onChange}/></div>
					<div className="f3"><label>Confirm Password</label><input type="password" name="confirmPassword" className="form-control" onChange={this._onChange}/></div>
					{	this.state.errorMessage &&
						<div>{this.state.errorMessage}</div>}
					{	this.state.successMessaage &&
						<div>{this.state.successMessaage}</div>}
					<div className="f4">
						<div className="button-block">
							<button type="button" onClick={this._onClick}>Change Password</button>

						</div>
					</div>
				</form>
			</div>
		);
	},
	_onChange: function (event){
		if(event.target.name == "password"){
			this.setState({
				password:event.target.value
			})
		}
		else if(event.target.name == "oldPassword"){
			this.setState({
				oldPassword:event.target.value
			})
		}
		else if(event.target.name == "confirmPassword"){
			this.setState({
				confirmPassword:event.target.value
			})
		}
	},
	_onClick: function(){
		var currentThis = this;
		if( this.state.password != ""  && this.state.newPassword != ""  && this.state.confirmPassword != ""  && this.state.confirmPassword == this.state.password ){
			var requestData = {};
			requestData.oldPassword = this.state.oldPassword;
			requestData.newPassword = this.state.password;
			requestData.confirmPassword = this.state.confirmPassword
			requestData.token = this.props.token;
			services.POST(config.url.changePassword,requestData)
			.then(function(data){
				if(data && data.code == 200)
				{
					currentThis.setState({
						successMessaage:data.response.message,
						errorMessage:""
					})
					setTimeout(function() {
						currentThis.setState({
							successMessaage:""
						});
					},5000);
				}
				else{
					currentThis.setState({
						errorMessage:"something goes wrong"
					});
				}
			})
			.catch(function(error){
				currentThis.setState({
					errorMessage:error.response.message
				})
			});	
		}
		else if(this.state.password == ""  || this.state.newPassword == ""  || this.state.confirmPassword == ""){
			alert("fields can not be  blank");
		}
	    else if(this.state.confirmPassword != this.state.password){
			currentThis.setState({
				newPasswordAndConfirmPasswordNotMatched:true
			});
		} 
	}
}); 