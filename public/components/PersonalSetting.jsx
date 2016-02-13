var PersonalSetting = React.createClass({
	getInitialState: function(){
		return {
			userName:this.props.userCredentials.username,
			editProfile:false,
			invalidName:""
		}
	},
	render: function(){
		return (
			<div className="PI-block">
				<div className="page-title">
					<h1>Personal Information</h1>
					<div className="filter-block edit">
						<a href="#" onClick={this._onEdit}>Edit</a>
					</div>
				</div>
			
				{   !this.state.editProfile &&
					<form>
						<div className="f1"><label>Name</label><p>{this.state.userName}</p></div>
						<div className="f2"><label>Email</label><p>{this.props.userCredentials.emailId}</p></div>
					</form>
				}
				{	this.state.editProfile &&
					<form>
						<div className="f1"><label>Name</label><input type="text" name="userName" className="form-control" onChange={this._onChange} defaultValue={this.state.userName}/></div>
						<div><span>{this.state.invalidName}</span></div>
						<div className="f2"><label>Email</label><p>{this.props.userCredentials.emailId}</p></div>
						
						<div className="button-block">
							<button type="button" onClick={this._onClick}>Submit</button>
						</div>
					</form>
				}
				
			</div>
		);
	},
	_onEdit: function(){
		this.setState({
			editProfile: !this.state.editProfile
		});
	},
	_onClick: function(){
		var currentThis = this;
		if( this.state.userName != "" ){
			var requestData = {};
			requestData.token = this.props.token;
			requestData.name = this.state.userName;
			services.POST(config.url.updateProfile,requestData)
			.then(function(data){
				if(data.response.flag){
					currentThis.setState({
						editProfile: !currentThis.state.editProfile,
						invalidName:""
					});
					localStorage.setItem('wikedrideSuperAdminName', JSON.stringify({
                        adminName:currentThis.state.userName
                    }));
				}
			})
			.catch(function(error){
				console.log("================",error);
				currentThis.setState({
					invalidName: "Last Name can't be blank",
				});
			});
		}
		else{
			currentThis.setState({
				invalidName: "Name can't be blank",
			});
		}	
	},
	_onChange: function(){
		
		if(event.target.name == "userName"){
			this.setState({
				userName:event.target.value
			})
		}
	}
}); 