var SettingComponent = React.createClass({
	getInitialState: function(){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
			userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {}
		}
	},

	fromParent: function(adminName) {
	        this.props.doSomething(adminName);
	},

	render: function(){
		return (
			<div className="main settings-page">
				<div className="main-content">
					<div className="page-title">
						<h1>General Settings</h1>
					</div>
					<div className="content setting-content">
						<PasswordSetting token={this.state.token} userCredentials={this.state.userCredentials}/>
						<PersonalSetting token={this.state.token} userCredentials={this.state.userCredentials}  fromParent={this.fromParent}/>
					</div>
				</div>
			</div>
		);
	}
});