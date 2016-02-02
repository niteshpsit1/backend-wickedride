var SettingComponent = React.createClass({
	render: function(){
		return (
			<div className="main-content">
				<div className="page-title">
					<h1>General Settings</h1>
				</div>
				<div className="content setting-content">
					<PasswordSetting token={this.props.token} userCredentials={this.props.userCredentials}/>
					<PersonalSetting token={this.props.token} userCredentials={this.props.userCredentials} personalSetting={this.props.personalSetting}/>
				</div>
			</div>
		);
	}
});