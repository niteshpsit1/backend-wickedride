var SettingComponent = React.createClass({
	render: function(){
		return (
			<div>
				<div><h6>Password Setting</h6></div>
				<div>
					<PasswordSetting token={this.props.token}/>
				</div>
				<div><h6>Personal Information</h6></div>
				<div>
					<PersonalSetting token={this.props.token}/>
				</div>
			</div>
		);
	}
});