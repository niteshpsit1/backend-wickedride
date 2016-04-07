var Notify = React.createClass({
	getInitialState: function(){
		return {
			
			request:{},
			show : true,
			members : [],
			id : this.props.request.id,
			oldAdmin : this.props.request.requestedBy._id,
			newAdmin : {},
			transferred: false,
			showApproveMsg: false,
			rejectMessage:false,
			msg : "",
			newAdminName:"",
			showAlert : false,
			action : "",
			alertMessage : "",
			newAdminID : "",
			changeAdminDisable : false,
			changeAdminAble : true,
			showAlert : false

	
		}
	},
	componentWillMount: function () {
		var dd = new Date(this.props.request.date);
		var date = dd.getFullYear() + '/' + (dd.getMonth() + 1) + '/' + dd.getDate()  
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var time = hours + ':' + minutes;
        this.setState({date:date,time:time});
		
	},

	deleteClubApi: function() {
        
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			clubID: this.props.tag,
			response : "rejected"
		};
		services.POST(config.url.handleClubDeleteRequest, requestData)
		.then(function(data){			
				self.setState({showApproveMsg:true,msg:"rejected"});
		})
	    .catch(function(error){
		});

		setTimeout(function(){
			self.setState({showApproveMsg : false, show : false}); 
		}, 8000);
	},

	membersList: function() {
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			clubID: this.props.tag
			
		};
		services.GET(config.url.getClubMembers, requestData)
		.then(function(data){
			result=data.response.result;
			if(result.length==1 && result[0].designation=="Admin") {
				self.setState({changeAdminDisable : true, changeAdminAble: false, showAlert: true, action : "noMember", alertMessage: "No any member available for changing admin."});
			}else if(result.length) {
				self.setState({
				members:data.response.result,
				
			});
			}
		})
	    .catch(function(error){
			
		});
        

	},

	transferRights: function(userID) {
        
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			oldAdminID : this.state.oldAdmin,
			newAdminID : this.state.newAdmin,
			clubID: this.props.tag,
			date : "",
			time : ""
        };
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			if(result.length) {
				self.setState({
				show:false
				
			});
			}
		})
	    .catch(function(error){
		});
        
	},

	handleShowAlertModal: function(action,value) {
		this.setState({newAdminID : value});
		if(action=="changeAdmin") {
		    this.setState({showAlert : true, action : "changeAdmin", alertMessage : "Are you sure you want to change the admin of the club??"});
        }else if(event.target.name=="approved") {
		    this.setState({showAlert : true, action : "approved", alertMessage : "Are you sure you want to delete the club?"});
	    }else if(event.target.name=="rejected") {
	    	this.setState({showAlert : true, action : "rejected", alertMessage : "Are you sure you want to reject delete club request?"});
	    }
        
	},

	approveRequestApi : function() {
        var self= this,
        
        result = [];
		var requestData = {
			token: this.props.token,
			clubID: this.props.tag,
			response : "accepted"
		};
		services.POST(config.url.handleClubDeleteRequest, requestData)
		.then(function(data){
						
			self.setState({transferred:true,showApproveMsg : true,msg : "approved"});
		})
	    .catch(function(error){
		});
		setTimeout(function() {
			self.setState({showApproveMsg : false, show : false}); 
		}, 5000);
	},
    
    changeAdminApi: function() {
       
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			oldAdminID : this.state.oldAdmin,
			newAdminID : this.state.newAdminID,
			clubID: this.props.tag
		};
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			if(result) {
				self.setState({transferred:true});
				self.props.rightsMessage(true,self.props.name);
			}
		})
	    .catch(function(error){
		});
        
	},

	rightsMessage:function(msg,name) {
        this.setState({adminMsg:msg,newAdminName:name});
        setTimeout(function() { 
			self.setState({adminMsg : false, show : false}); 
		}, 5000);
	},

	handleHideAlertModal: function(value){
		
        this.setState({showAlert: false});
        if(value==="changeAdmin") {
            this.changeAdminApi();
        }else if(value==="approved") {
        	this.approveRequestApi();
        }else if(value==="rejected") {
        	this.deleteClubApi();
        }
    },

	render: function (){
		var currentThis = this;
		if(this.state.showApproveMsg) {
       
		return (
			<div>
                {<div className="messages-block">
                    <div className="messages messSection">
						<h4 className="approve-msg">
						    <span>
						        <b>{this.props.request.name}</b>
						    </span><span>requested by {this.props.request.requestedBy.fullname} is {this.state.msg}.</span>

						</h4>
					</div>
                </div>
			    }
			</div>
		)
	} else if(this.state.adminMsg){
        
        return (
			<div>
                {<div className="messages-block">
                    <div className="messages messSection">
						<h4 className="approve-msg">
						    <span>
						        <b>Admin of club {this.props.request.name}</b>
						    </span>&nbsp;&nbsp;<span>requested by {this.props.request.requestedBy.fullname} changed to {this.state.newAdminName}.</span>

						</h4>
					</div>
                </div>
			    }
			</div>
		)

	} else {

		return (
			<div>
                {this.state.show &&
				    <div className="messages-block">
					    <div className="user-pic">
						    <img src={this.props.request.image}/>
					    </div>
					    <div className="messages">
						    <h4><span>
						        <b>{this.props.request.name}</b>&nbsp;
						        </span>requested by {this.props.request.requestedBy.fullname}
						    </h4>
						    <ul className="notifications-details clearfix">
							    <li className="time">{this.state.time}</li>
							    <li className="date">{this.state.date}</li>
							    {this.state.message &&
							    <span>Transferred rights successfully</span>}
							    <li >
								    <div className="button-block">
								        {this.state.changeAdminAble &&
								            <div className="dropdown">
                                                <button className="btn dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" onClick={this.membersList}>Change Admin
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {this.state.members.map(function(member){
							                                if(member.designation=="Admin") {
							                            	    return false
							                                }   
								                            return <LiMembers key={member.userID} name={member.userName} newAdminID={member.userID}  oldAdminID={currentThis.state.oldAdmin} token={currentThis.props.token} clubID={currentThis.props.tag} rightsMessage={currentThis.rightsMessage} handleShowAlertModal={currentThis.handleShowAlertModal} action={currentThis.state.action} message={currentThis.state.alertMessage}/>
							                            })}
                                                </ul>
                                            </div>
                                        }
                                        {this.state.changeAdminDisable &&
                                        <button name="changeAdmin" className="changeAdminClass" onClick={this.membersList}>Change Admin</button>
                                        }
									    <button className="approve-btn" onClick={this.handleShowAlertModal} name="approved">Approve</button>
									    <button className="reject-btn" onClick={this.handleShowAlertModal} name="rejected">Reject</button>
									    {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.alertMessage}/> : null}
									    
								    </div>
							    </li>
						    </ul>
					    </div>
				    </div>
			    }
			</div>

		)
    } 
	}

	});