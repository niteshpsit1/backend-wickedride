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
			showApproveMsg: false

			
		}
	},
	componentWillMount: function () {
		
		
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
			
			console.log("hurreyyyyyyyyyyDEEEEEEEEEEEEE",data.response);
			if(result.length) {
				self.setState({
				transferred:true
				
			});
			}
			
			
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
			console.log("getClubMemberssssssssssss1111",data);
			console.log("MembersListinggggggggggg^^^^^^^^^^^",self.props.request);
			result=data.response.result;
			if(result.length) {
				self.setState({
				members:data.response.result,
				
			});
			}
			console.log("getClubMemberssssssssssss22222",self.state.members);
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
        

	},

	transferRights: function(userID) {
        console.log("rights9999999999999999999999999999",userID);
        var self= this,
        result = [];
		var requestData = {
			token: this.props.token,
			oldAdminID : this.state.oldAdmin,
			newAdminID : this.state.newAdmin,
			clubID: this.props.tag

			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		services.POST(config.url.makeNewAdmin, requestData)
		.then(function(data){
			
			console.log("hurreyyyyyyyyyy",data.response);
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
			
			console.log("hurreyyyyyyyyyyDEEEEEEEEEEEEE",data.response);
			if(result.length) {
				self.setState({
				transferred:true,
				showApproveMsg : true
				
			});
			}
			
			
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	},

	render: function (){
		var currentThis = this;
		if(this.state.showApproveMsg==true) {

		return (
			<div>
                {this.state.show &&
				    <div className="messages-block">
					    <div className="user-pic">
						    <img src={this.props.request.image}/>
					    </div>
					    <div className="messages">
						    <h4><span><a href="">{this.props.request.name}</a> </span>requested by {this.props.request.requestedBy.fullname} is successfully deleted.</h4>
						    
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
							    <li className="time">11:00 AM</li>
							    <li className="date">20th Nov 2015</li>
							    <li >
								    <div className="button-block">
								        <div className="dropdown">
                                            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" onClick={this.membersList}>Change Admin
                                                <span className="caret"></span>
                                            </button>
                                            <ul className="dropdown-menu">
                                                {this.state.members.map(function(member){
							                        console.log("&&&&&&&&&&&&&&",member.userID);
								                        return <LiMembers name={member.userName} newAdminID={member.userID}  oldAdminID={currentThis.state.oldAdmin} token={currentThis.props.token} clubID={currentThis.props.tag}/>
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