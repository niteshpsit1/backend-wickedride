var Member = React.createClass({
	getInitialState: function(){
		return ({
			member: this.props.member,
			showModal: false,
			showMember: true,
			checked : null,
			action: null,
			message : null,
			showAlert : false,
			role : this.props.member.role
			
		});
	},

	removeUser: function() {
		this.setState({showAlert: true, action: "deleteUser", message: "Are you sure you want to delete this member?"});
	},

	removeUserApi: function() {
		var self= this,
        result = {};
		var requestData = {
			token: this.props.token,
			clubID:this.props.clubID,
			userID: this.state.member.userID
		};
		
		services.POST(config.url.removeMember, requestData)
		.then(function(data){
			
		
				self.setState({showMember:false});
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	},


	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },
    
    handleHideModal: function(status){
        this.setState({showModal: false});
    },

    changeRole: function(){
        
        var x= $("#"+this.state.member.userID).is(":checked");
        
        if(x) {
        	var self= this,
            result = [];
		    var requestData = {
			    token: this.props.token,
			    userID: this.state.member.userID,
			    clubID: this.props.clubID,
			    role: "Admin"
		    };
		    services.POST(config.url.changeRole, requestData)
		    .then(function(data){
			    
			    if(result.length) {
				    self.setState({
				    members:data.response.result,
				    membersAvailable:true
			    });
			    }
			    
		    })
	        .catch(function(error){
			    console.log("====catch",error.response.message);
			    	
		    });
        }else {
        	var self= this,
            result = [];
		    var requestData = {
			    token: this.props.token,
			    userID: this.state.member.userID,
			    clubID: this.props.clubID,
			    role: "Member"
		    };
		    services.POST(config.url.changeRole, requestData)
		    .then(function(data){
			    if(result.length) {
				    self.setState({
				    members:data.response.result,
				    membersAvailable:true
			    });
			    }
			    
		    })
	        .catch(function(error){
			    console.log("====catch",error.response.message);
			    if(error.response.message=="This member is the only admin of this club, make another admin first.") {
                    self.setState({showAlert: true, message: "This member is the only admin of this club, make another admin first.", action: "makeAdminAlert"});
			    }	
		    });
        }
    },

    handleHideAlertModal: function(value) {
    	if(value=="deleteUser") {
    		this.removeUserApi();
    	}else if(value=="makeAdminAlert"){
            this.setState({showAlert: false});
            $("#"+this.state.member.userID).prop('checked', true);
        }else if(value=="cancelled") {
        	this.setState({showAlert: false});
        }
    },
	
	render: function () {
	        var self= this;
	        var admin = null;
            if(this.state.role=="Admin") {
            	/*$("#"+this.state.member.userID).prop('checked', true);*/
                admin = true;
            }
		    return (
		    	<tbody>
			    {self.state.showMember &&
			        <tr>
			            <td><p>{this.state.member.userName}</p></td>
				        <td><p>{this.state.member.designation}</p></td>
				        <td onClick={this.handleShowModal}>
				            <a href="#">
				                <span className="ride"></span>
				                <p>{this.state.member.clubJoined.length}</p>
				            </a>
				        </td>
				        <td>
				            <a href="#">
				                Admin <input type="checkbox"  id={this.state.member.userID} onClick={this.changeRole} defaultChecked={admin}/>
				            </a>
				        </td>
				        <td>
				            <a href="#" className="remove" onClick={this.removeUser}></a>
				        </td> 
				        {this.state.showModal ? <MembersListingModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.state.member.userID}/> : null}
			        </tr>}
			        {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}
			    </tbody>
			    
			    
		    )
	    
	
	}
});
