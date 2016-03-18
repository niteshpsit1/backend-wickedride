var UserList =	React.createClass({

	getInitialState: function(){
		return ({
			
			showModal: false,
			tokenID : this.props.token,
			userID : this.props.user.userID,
			showAlert : false,
            showUser : true
			
		});
	},

	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },

	handleHideModal: function(status){
        this.setState({showModal: false});
    },

    removeUser: function() {

    	var self = this;
    	self.setState({showAlert: true, message : 'Are you sure you want to delete user?', action : "userDelete"});
    },

    removeUserApi: function() {
    	var self = this;
    	
    	var requestData = {
    		token : this.state.tokenID,
    		userID : this.state.userID
    	};
        
    	services.POST(config.url.deleteUser, requestData)
		.then(function(data){
            self.setState({showAlert : true, message : "User has been deleted successfully.", action : "confirmation"});
            self.props.filterLength();
		})
		.catch(function(error){
			
			if(error.response.message) {
				
				self.setState({showAlert : true, message : error.response.message, action : "onlyOne"})
			}
		});	
    },

    handleHideAlertModal: function(value){
    	
    	if(value=="userDelete") {

    		this.setState({showAlert: false});
        	this.removeUserApi();
        	
        }else if(value=="deleteUser"){
        	this.setState({showAlert: false});
        }else if(value=="cancelled"){
        	var extra = "'s";
        	var name = this.props.user.userName;
        	var fullname = name.concat(extra);
        	
        	var val = {
        		name : "clubs",
        		userID : this.state.userID,
        		name : fullname
        	};
        	
        	this.setState({showAlert: false});
        	this.fromParent(true);
        	History.pushState(val,"/home/clubs");

        }else if(value=="confirmation") {
            this.setState({showAlert: false, showUser : false});
        }
    },

    fromParent : function(value) {
    	var self = this;
    	self.props.fromParent(value);
    },
	
	render: function() {
		if(this.state.showUser) {
            
            return (
                <tr key={this.props.user.userID}>
                    <td><p>{this.props.user.userName}</p></td>
                    <td><p>{this.props.user.email}</p></td>
                    <td><p>{this.props.user.number}</p></td>
                    <td onClick={this.handleShowModal} className="clubJointd">
                        <p><a href="#" className="ride p-center"></a></p>
                        <p className="rideNo-center spanSpace">{this.props.user.noOfClubJoined} clubs</p>
                    </td>
                    <td>
                        <a href="javascript:void(0)" className="removeUser" onClick={this.removeUser}></a>
                    </td>
                    {this.state.showModal ? <MemberDetailModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.props.user.userID} user={this.props.user}/> : null}
                    {this.state.showAlert ? <AlertModal handleHideAlertModal={this.handleHideAlertModal} action={this.state.action} message={this.state.message}/> : null}
                </tr>
            )
        }else return null
    }
	
});