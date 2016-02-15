var PasswordSetting = React.createClass({
	getInitialState: function(){
		return {
			confirmPassword:"",
			password:"",
			oldPassword:"",
			errorMessage:"",
			successMessaage:"",
			passwordError:"",
			oldPasswordError:"",
			confirmPasswordError:""
		}
	},
	render: function(){
		return (
			<div className="pwd-block">
				<div className="page-title">
					<h1>Password Settings</h1>
				</div>
				<form>
					<div className="f1"><label>Old Password</label><input type="password" name="oldPassword" className="form-control" onChange={this._onChange}/><div className="errorMess"><span>{this.state.oldPasswordError}</span></div></div>
					<div className="f2"><label>New Password</label><input type="password" name="password" className="form-control" onChange={this._onChange}/><div className="errorMess"><span>{this.state.passwordError}</span></div></div>
					<div className="f3"><label>Confirm Password</label><input type="password" name="confirmPassword" className="form-control" onChange={this._onChange}/><div className="errorMess"><span>{this.state.confirmPasswordError}</span></div></div>
					{	this.state.errorMessage &&
						<div className="errorMess"><span>{this.state.errorMessage}</span></div>}
					{	this.state.successMessaage &&
						<div className="errorMess"><span>{this.state.successMessaage}</span></div>}
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
		if(this.state.oldPassword == ""){
			currentThis.setState({
				oldPasswordError:"Old Password can't be blank",
				passwordError:"",
				confirmPasswordError:"",
				errorMessage:""
			});
		}else if(this.state.password == ""){
			currentThis.setState({
				oldPasswordError:"",
				passwordError:"Password can't be blank",
				confirmPasswordError:"",
				errorMessage:""
			});
		}else if(this.state.confirmPassword == ""){
			currentThis.setState({
				oldPasswordError:"",
				passwordError:"",
				confirmPasswordError:"Confirm Password  can't be blank",
				errorMessage:""
			});
		}else if(this.state.confirmPassword != this.state.password){
			currentThis.setState({
				oldPasswordError:"",
				passwordError:"",
				confirmPasswordError:"",
				errorMessage:"Password And Confirm password Not Match"
			});
		}else{
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
						oldPasswordError:"",
						passwordError:"",
						confirmPasswordError:"",
						errorMessage:"",
						successMessaage:data.response.message
					})
					setTimeout(function() {
						currentThis.setState({
							oldPasswordError:"",
							passwordError:"",
							confirmPasswordError:"",
							errorMessage:"",
							successMessaage:""
						});
					},5000);
				}
				else{
					currentThis.setState({
						oldPasswordError:"",
						passwordError:"",
						confirmPasswordError:"",
						errorMessage:"something goes wrong",
						successMessaage:"",
					});
				}
			})
			.catch(function(error){
				currentThis.setState({
					oldPasswordError:"",
					passwordError:"",
					confirmPasswordError:"",
					errorMessage:error.response.message,
					successMessaage:""
				})
			});
		}
		setTimeout(function() {
			currentThis.setState({
				oldPasswordError:"",
				passwordError:"",
				confirmPasswordError:"",
				errorMessage:"",
				successMessaage:""
			});
		},5000);
	}
}); 