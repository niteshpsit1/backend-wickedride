/*var userCredentials = {
	username: "smith.gaur.100@gmail.com",
	password: "hrhk@super"
};*/
var Layout =  React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
            userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {},
            isLogin:localStorage.getItem("wikedrideSuperAdminIsLogin") ? true : false,
            adminName:localStorage.getItem("wikedrideSuperAdminName") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminName")).adminName : ""
		}
	},
    render: function() {
        return (
            <div>
                <div>
                    <header>
                        <div className="logo-wrapper">
                            <a href="#">
                                <img src="images/wicked-ride-logo.png"/>
                            </a>
                        </div>
                        <div className="admin-details">
                            <p>Admin Name <span>{this.state.adminName || this.state.userCredentials.username}</span></p>
                            <p className="account-img"><img src="images/bg_imgs/user-icon1.jpg"/></p>
                            <a onClick={this._onClick} name="logout" href="#" className="log-out"></a>         
                        </div>
                    </header>
                    <div className="wrapper">
                        <aside>
                            <ul className="navigation clearfix">
                                <li className="active"><a onClick={this._onClick} href="#"><div name="homeState">Home</div></a></li>
                                <li><a onClick={this._onClick} href="#"><div name="userManagementState">User Management</div></a></li>
                                <li><a onClick={this._onClick} href="#"><div name="clubManagementState">Club Management</div></a></li>
                                <li><a onClick={this._onClick} href="#"><div name="aboutUs">About Us</div></a></li>
                                <li><a onClick={this._onClick} href="#"><div name="termAndConditions">Term & Conditions</div></a></li>
                                <li><a onClick={this._onClick} href="#"><div name="settingState">Settings</div></a></li>
                            </ul>
                        </aside>
                        {this.props.children}
                    </div>
                </div>
            </div>    
        );
    },
    componentDidMount: function(){
    	 	
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
        if($(event.target).attr("name") == 'termAndConditions'){
            History.pushState(null,"/termAndConditions");
        }
        else if ($(event.target).attr("name") == 'userManagementState') {
             History.pushState(null,"/users");
        }
        else if ($(event.target).attr("name") == 'clubManagementState') {
             History.pushState(null,"/clubs");
        }
        else if ($(event.target).attr("name") == 'settingState') {
             History.pushState(null,"/setting");
        }
        else if ($(event.target).attr("name") == 'aboutUs') {
             History.pushState(null,"/aboutus");
        }

        if($(event.target).attr("name") == "logout"){
            localStorage.removeItem("wikedrideSuperAdminIsLogin");
            localStorage.removeItem("wikedrideSuperAdminName");
            currentThis.setState({
                userCredentials:{}
            });
            window.location.href = "/";
        }
    }
});