var Layout =  React.createClass({
    
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
            userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {},
            isLogin:localStorage.getItem("wikedrideSuperAdminIsLogin") ? true : false,
            adminName:localStorage.getItem("wikedrideSuperAdminName") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminName")).adminName : "",
            homeClass: "active",
            userClass: "",
            clubClass: "",
            settingClass: "",
            termClass: "",
            aboutClass: "",
            showAlert: false,
            action: "logout",
            message: "Are you sure you want to logout?"

		}
	},

    doSomething: function(value) {
        this.setState({adminName: value});
    },

    showAlertModal: function() {
        this.setState({showAlert: true});
    },

    handleHideAlertModal: function(value){
        
        this.setState({showAlert: false});
        if(value==="logout") {
            this.logoutOnclick();
        }
    },

    render: function() {
        var self = this;
        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, { doSomething: self.doSomething });
        
        });

        return (
            <div>
                <header>
                    <div className="logo-wrapper">
                        
                            <img src="/images/wicked-ride-logo.png"/>
                        
                    </div>
                    <div className="admin-details">
                        <p>Admin Name  : <span>{this.state.adminName || this.state.userCredentials.username}</span></p>
                        <p className="account-img"><img src="/images/bg_imgs/user-icon1.jpg"/></p>
                        <a onClick={this.showAlertModal} name="logout" href="#" className="log-out"></a>
                        {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}
       
                    </div>
                </header>
                <div className="wrapper">
                    <aside className="sidebar">
                        <ul className="navigation clearfix">
                            <li className={this.state.homeClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="homeState">Home</div></a></li>
                            <li className={this.state.userClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="userManagementState">User Management</div></a></li>
                            <li className={this.state.clubClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="clubManagementState">Club Management</div></a></li>
                            <li className={this.state.aboutClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="aboutUs">About Us</div></a></li>
                            <li className={this.state.termClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="termAndConditions">Term & Conditions</div></a></li>
                            <li className={this.state.settingClass}><a onClick={this._onClick} href="javascript:void(0)"><div name="settingState">Settings</div></a></li>
                        </ul>
                    </aside>
                    {childrenWithProps}
                    
                </div>
            </div>    
        );
    },
    componentDidMount: function(){
    	 	History.pushState(null,"/home/notification");
    },
    _onChange: function(event){
        var currentThis = this
        if(event.target.name == "username"){
            currentThis.setState({
                username: (event.target.value).trim()
            });
        }
        else if(event.target.name == "password"){
            currentThis.setState({
                password: (event.target.value).trim()
            });
        }
    },
    _personalSetting: function(newName){
        this.setState({
            adminName: newName
        });   
    },
    _onClick: function(event){
        var currentThis = this;

        this.setState({
          homeClass: $(event.target).attr("name") == 'homeState' ? "active" : "",
          userClass: $(event.target).attr("name") == 'userManagementState' ? "active" : "",
          clubClass: $(event.target).attr("name") == 'clubManagementState' ? "active" : "",
          settingClass: $(event.target).attr("name") == 'settingState' ? "active" : "",
          termClass: $(event.target).attr("name") == 'termAndConditions' ? "active" : "",
          aboutClass: $(event.target).attr("name") == 'aboutUs' ? "active" : ""
        });

        if($(event.target).attr("name") == 'termAndConditions'){
            History.pushState(null,"/home/termAndConditions");
        }
        else if ($(event.target).attr("name") == 'homeState') {
             History.pushState(null,"/home/notification");
        }
        else if ($(event.target).attr("name") == 'userManagementState') {
            this.setState({activeClass : "active"});
             History.pushState(null,"/home/users");
        }
        else if ($(event.target).attr("name") == 'clubManagementState') {
             History.pushState(null,"/home/clubs");
        }
        else if ($(event.target).attr("name") == 'settingState') {
             History.pushState(null,"/home/setting");
        }
        else if ($(event.target).attr("name") == 'aboutUs') {
             History.pushState(null,"/home/aboutus");
        }
    },

    logoutOnclick : function() {
       
            this.setState({showAlert: true});
            localStorage.removeItem("wikedrideSuperAdminIsLogin");
            localStorage.removeItem("wikedrideSuperAdminName");
            this.setState({
                userCredentials:{}
            });
            window.location.href = "/adminlogout";
         
    },

        
});