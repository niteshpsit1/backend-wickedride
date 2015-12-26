var userCredentials = {
	username: "smith.gaur.100@gmail.com",
	password: "hrhk@super"
};

var Layout =  React.createClass({
	getInitialState: function (){
		return {
			token: "ok",
            userCredentials:{},
			homeState:true,
			userManagementState:false,
			clubManagementState:false,
			settingState:false,
			termAndConditions:false,
			aboutUs:false
		}
	},
    render: function() {
        return (
        	<div>
        		<h2>Super Admin {this.state.token}</h2>
                <div className="row">
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="homeState">Home</div></a>
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="userManagementState">User Management</div></a>
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="clubManagementState">Club Management</div></a>
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="termAndConditions">TermAndConditions</div></a>
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="aboutUs">AboutUs</div></a>
        		<a onClick={this._onClick} href="#"><div className="well col-md-2" name="settingState">setting</div></a>
                </div>
                {this.state.homeState && 
                <div className='bg-info'>
                <h2>Messages</h2> 
                <MessagesFromGroupAdmin token={this.state.token} />
            	</div>}

                {this.state.userManagementState && 
                <div className='bg-info'>
                <h2>User Management</h2>
                <UserManagement token={this.state.token} />
            	</div>}

                {this.state.clubManagementState &&
                <div className='bg-info'> 
                <h2>Club Management</h2>
                <ClubManagement token={this.state.token}  />
            	</div>}

                {this.state.settingState &&
                <div className='bg-info'> 
                <h2>General Setting</h2>
                <SettingComponent token={this.state.token} userCredentials={this.state.userCredentials}/>
            	</div>}

            	{this.state.termAndConditions &&
                <div className='bg-info'> 
                <h2>Term and Condition</h2>
                <TermAndConditions token={this.state.token} />
            	</div>}

            	{this.state.aboutUs &&
                <div className='bg-info'> 
                <h2>About Us</h2>
                <AboutUs token={this.state.token} />
            	</div>}
            </div>
        );
    },
    componentDidMount: function(){
    	currentthis = this;
		services.superAdminLogin(config.url.adminLogin, userCredentials)
		.then(function(data){
			currentthis.setState({
				token: data.response.token,
                userCredentials:{username:data.response.user.fullname,emailId:data.response.user.emailid}
			});
		})
		.catch(function(error){
			console.log(error);
		});    	
    },
    _onClick: function(event){
    	
		this.setState({
			homeState: $(event.target).attr("name") == 'homeState' ? true : false,
			userManagementState: $(event.target).attr("name") == 'userManagementState' ? true : false,
			clubManagementState: $(event.target).attr("name") == 'clubManagementState' ? true : false,
			settingState: $(event.target).attr("name") == 'settingState' ? true : false,
			termAndConditions: $(event.target).attr("name") == 'termAndConditions' ? true : false,
			aboutUs: $(event.target).attr("name") == 'aboutUs' ? true : false
		})
    }
});