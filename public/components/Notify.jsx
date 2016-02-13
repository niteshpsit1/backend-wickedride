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
			newAdminID : ""
	
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

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.handleClubDeleteRequest, requestData)
		.then(function(data){
			
			console.log("successfully deleted club",data.response);
			
				self.setState({showApproveMsg:true,msg:"rejected"});
			
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
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
			if(result.length) {
				self.setState({
				members:data.response.result,
				
			});
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
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

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			console.log("successfully transferred rights",data.response);
			if(result.length) {
				self.setState({
				show:false
				
			});
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        
	},

	handleShowAlertModal: function(action,value) {
		console.log("parameterrrrrr",action, value);
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

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.handleClubDeleteRequest, requestData)
		.then(function(data){
			
			console.log("successfully approved request",data.response);
			
			self.setState({transferred:true,showApproveMsg : true,msg : "approved"});
			/*setTimeout(self.setState({showApproveMsg : false}),5000);*/

			
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	},
    
    changeAdminApi: function() {
        /*console.log("changeAdminApi",this.props.token,);*/
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			oldAdminID : this.state.oldAdmin,
			newAdminID : this.state.newAdminID,
			clubID: this.props.tag

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		console.log("changeAdminApi",requestData);
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			console.log("Rights transferred successfully",data.response);
			if(result) {
				self.setState({transferred:true});
				self.props.rightsMessage(true,self.props.name);
				/*self.props.handleHideAlertModal();*/
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        
	},

	rightsMessage:function(msg,name) {
        this.setState({adminMsg:msg,newAdminName:name});
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
                    <div className="messages">
						<h4 className="approve-msg">
						    <span>
						        <a href="">{this.props.request.name}</a>
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
                    <div className="messages">
						<h4 className="approve-msg">
						    <span>
						        <a href="">Admin of club {this.props.request.name}</a>
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
						    <h4><span><a href="">{this.props.request.name}</a> </span>requested by {this.props.request.requestedBy.fullname}</h4>
						    <ul className="notifications-details clearfix">
							    <li className="time">{this.state.time}</li>
							    <li className="date">{this.state.date}</li>
							    {this.state.message &&
							    <span>Transferred rights successfully</span>}
							    <li >
								    <div className="button-block">
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
									    <button onClick={this.handleShowAlertModal} name="approved">Approve</button>
									    <button onClick={this.handleShowAlertModal} name="rejected">Reject</button>
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