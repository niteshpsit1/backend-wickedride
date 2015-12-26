var PasswordSetting = React.createClass({
	getInitialState: function(){
		return {
			confirnPassword:"",
			password:"",
			oldPassword:""
		}
	},
	render: function(){
		return (
			<div>
			<div className="form-group">
				<label>Old Password</label>
				<input type="password" name="oldPassword" className="form-control" onChange={this._onChange}/>
			</div>
			<div className="form-group">
				<label>New Password</label>
				<input type="password" name="password" className="form-control" onChange={this._onChange}/>
			</div>
			<div className="form-group">
				<label>Confirm Password</label>
				<input type="password" name="confirnPassword" className="form-control" onChange={this._onChange}/>
			</div>
			<div><button type="button" class="btn btn-info" onClick={this._onClick}>CHANGE</button></div>
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
		else if(event.target.name == "confirnPassword"){
			this.setState({
				confirnPassword:event.target.value
			})
		}
	},
	_onClick: function(){
		
	}
}); 