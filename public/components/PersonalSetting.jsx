var PersonalSetting = React.createClass({
	getInitialState: function(){
		return {
			email:"",
			userName:"",
		}
	},
	render: function(){
		return (
			<div>
			<div className="form-group">
				<label>Name:</label>
				<input type="text" name="userName" className="form-control" onChange={this._onChange}/>
			</div>
			<div className="form-group">
				<label>Email:</label>
				<input type="text" name="email" className="form-control" onChange={this._onChange}/>
			</div>
			<div><button type="button" class="btn btn-info" onClick={this._onClick}>CHANGE</button></div>
			</div>
		);
	},
	_onClick: function(){
		console.log(this.state.userName);
		console.log(this.state.email);
	},
	_onChange: function(){
		if(event.target.name == "userName"){
			this.setState({
				userName:event.target.value
			})
		}
		else if(event.target.name == "email"){
			this.setState({
				email:event.target.value
			})
		}
	}
}); 