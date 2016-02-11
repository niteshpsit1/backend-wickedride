var App = React.createClass({
  getInitialState: function (){
    return {
      token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
      userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {},
      isLogin:localStorage.getItem("wikedrideSuperAdminIsLogin") ? true : false,
      username:"",
      password:"",
      loginError:"",
      adminName:localStorage.getItem("wikedrideSuperAdminName") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminName")).adminName : ""
    }
  },
  componentWillMount: function(){
    if(this.state.token && this.state.token !==""){
      window.location.href = "/home";
    }
  },
  render() {
    return (
     <div className="wrapper login-page">
        <div className="login-form">
            <div className="filter-form">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width:"80px"}}><label>Email-ID</label></td>
                                <td><input name="username" type="email" onChange={this._onChange}/></td>
                            </tr>
                            <tr>
                                <td style={{width:"80px"}}><label>Password</label></td>
                                <td> <input name="password" type="password" onChange={this._onChange} /></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div className="button-block">
                                        <button type="button" name="login" onClick={this._onClick}>Login</button>
                                    </div>
                                </td>
                            </tr> 
                            <div>
                                <span>{this.state.loginError}</span>
                            </div>
                        </tbody>
                    </table>
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
  _onClick: function(event){
        var currentThis = this;
        
      if(event.target.name == "login"){
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
                    window.location.href = "/home"
                })
                .catch(function(error){
                    console.log("======error",error);
                    currentThis.setState({
                        loginError: error.response.message
                    });
                });  
            }
            else if(this.state.username == "" || this.state.password == ""){
                currentThis.setState({
                    loginError: "username and password can not be blank"
                });
            }
            else if(!filter.test(this.state.username)){
                currentThis.setState({
                    loginError: "insert valid username"
                });
            } 
            else{
                currentThis.setState({
                    loginError: "something goes wrong"
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
        else {
        this.setState({
          homeState: $(event.target).attr("name") == 'homeState' ? true : false,
          userManagementState: $(event.target).attr("name") == 'userManagementState' ? true : false,
          clubManagementState: $(event.target).attr("name") == 'clubManagementState' ? true : false,
          settingState: $(event.target).attr("name") == 'settingState' ? true : false,
          termAndConditions: $(event.target).attr("name") == 'termAndConditions' ? true : false,
          aboutUs: $(event.target).attr("name") == 'aboutUs' ? true : false
        })
        }
    }
})
