var App = React.createClass({
  getInitialState: function (){
    return {
      token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
      userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {},
      isLogin:localStorage.getItem("wikedrideSuperAdminIsLogin") ? true : false,
      username:"",
      password:"",
      loginError:"",
      invalidEmail:"",
      adminName:localStorage.getItem("wikedrideSuperAdminName") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminName")).adminName : ""
    }
  },
  render() {
    return (
     <div className="wrapper login-page">
        <div className="logoOuter">
            <img src="images/logo.png" alt="Wicked Ride"/>
        </div>
        <div className="login-form">
            <div className="filter-form">
                <form onSubmit={this._onClick}>
                    <div className="form-row">
                        <label>Email-ID</label>
                        <input name="username" type="email" onChange={this._onChange}/>
                            <div className="errorMess">
                                <span>{this.state.invalidEmail}</span>
                            </div>
                    </div>
                    <div className="form-row">
                        <label>Password</label>
                        <input name="password" type="password" onChange={this._onChange} />
                        <div className="errorMess">
                            <span>{this.state.loginError}</span>
                        </div>
                    </div>
                    <div className="button-block">
                        <button type="submit" className="siteButton" name="login" onClick={this._onClick}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
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
  /*_onChange: function(event){
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
    },*/
  _onClick: function(event){
        event.preventDefault();
        var currentThis = this;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(event.target.name == "login"){
            var requestData = {};
            requestData.username = this.state.username;
            requestData.password = this.state.password;
            if( this.state.username != "" && this.state.password != "" && filter.test(this.state.username)){
                services.superAdminLogin(config.url.adminLogin, requestData)
                .then(function(data){
                    localStorage.setItem('wikedrideSuperAdminIsLogin', JSON.stringify({
                        token:data.response.token,
                        userCredentials:{username:data.response.user.fullname,emailId:data.response.user.emailid}
                    }));
                    localStorage.setItem('wikedrideSuperAdminName', JSON.stringify({
                        adminName:data.response.user.fullname
                    }));
                    window.location.href = "/adminlogin";
                })
                .catch(function(error){
                    currentThis.setState({
                        loginError: error.response.message,
                        invalidEmail:""
                    });
                });  
            }
            else if(this.state.username == "" && this.state.password == ""){
                currentThis.setState({
                    invalidEmail: "Email can not be blank",
                    loginError:"Password can not be blank"
                });
            }
            else if(!filter.test(this.state.username) && this.state.password == ""){
                currentThis.setState({
                    invalidEmail: "Insert valid Email",
                    loginError:"Password can not be blank"
                });
            }
            else if(!filter.test(this.state.username)){
                currentThis.setState({
                    invalidEmail: "Insert valid Email",
                    loginError:""
                });
            }
            else if(this.state.password == ""){
                currentThis.setState({
                    loginError: "Password can not be blank",
                    invalidEmail:""
                });
            } 
            else{
                currentThis.setState({
                    loginError: "Something goes wrong",
                    invalidEmail:""
                });
            }
        }
        else if($(event.target).attr("name") == "logout"){

            localStorage.removeItem("wikedrideSuperAdminIsLogin");
            localStorage.removeItem("wikedrideSuperAdminName");
            currentThis.setState({
                loginError: "",
                isLogin:false,
                userCredentials:{}
            });
        }
    }
})
