var PasswordSetting = React.createClass({
	getInitialState: function(){
		return {
			confirmPassword:"",
			password:"",
			oldPassword:"",
			newPasswordAndConfirmPasswordNotMatched:false
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
					{	this.state.newPasswordAndConfirmPasswordNotMatched &&
						<div>new password and confirm password must be same</div>}
					<div className="button-block">
						<button type="button" onClick={this._onClick}>Change Password</button>

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
			/*services.POST(config.url.changePassword,requestData)
			.then(function(data){
				currentThis.setState({
					userList:data.response.result
				});
			})*/	
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