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
        <div className="login-form">
            <div className="filter-form">
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width:"80px"}}><label>Email-ID</label></td>
                                <td><input name="username" type="email" onChange={this._onChange}/></td>
                                <div>
                                    <span>{this.state.invalidEmail}</span>
                                </div>
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
                    window.location.href = "/adminlogin";
                })
                .catch(function(error){
                    console.log("======error",error);
                    currentThis.setState({
                        loginError: error.response.message,
                        invalidEmail:""
                    });
                });  
            }
            else if(!filter.test(this.state.username)){
                currentThis.setState({
                    invalidEmail: "insert valid Email",
                    loginError:""
                });
            }
            else if(this.state.password == ""){
                currentThis.setState({
                    loginError: "password can not be blank",
                    invalidEmail:""
                });
            } 
            else{
                currentThis.setState({
                    loginError: "something goes wrong",
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
