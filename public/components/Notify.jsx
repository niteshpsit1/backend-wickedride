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
			newAdminName:""

			
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

	deleteClub: function() {
        
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

	approveRequest: function() {
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
			
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	},

	rightsMessage:function(msg,name) {
        this.setState({adminMsg:msg,newAdminName:name});
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
							                        
								                        return <LiMembers name={member.userName} newAdminID={member.userID}  oldAdminID={currentThis.state.oldAdmin} token={currentThis.props.token} clubID={currentThis.props.tag} rightsMessage={currentThis.rightsMessage}/>
							                        })}
                                            </ul>
                                        </div>
									    <button onClick={this.approveRequest}>Approve</button>
									    <button onClick={this.deleteClub}>Reject</button>
									    
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