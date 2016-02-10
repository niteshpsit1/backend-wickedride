var Member = React.createClass({
	getInitialState: function(){
		return ({
			member: this.props.member,
			showModal: false,
			showMember: true
			
		});
	},

	removeUser: function() {
		/*e.preventDefault;*/
		/*var Alert = ReactBootstrap.Alert;*/
		var r = confirm("Are you sure want to delete member?");
		if(r==true) {
		var self= this,
        result = {};
		var requestData = {
			token: this.props.token,
			clubID:this.props.clubID,
			userID: this.state.member.userID
			//pageSize:config.pagination.pageSize,
			//createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		
		services.POST(config.url.removeMember, requestData)
		.then(function(data){
			console.log("++++++++++++++++++++++",data);
		
				self.setState({showMember:false});
		})
	    .catch(function(error){
			console.log("====catch",error);	
		});
	} else{
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	}

	},


	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },
    
    handleHideModal: function(status){
        this.setState({showModal: false});
    },
	
	render: function () {
	        var self= this;
		    return (
		    	<tbody>
			    {self.state.showMember &&
			    <tr>
			        <td><p>{this.state.member.userName}</p></td>
				    <td><p>{this.state.member.designation}</p></td>
				    <td><p>{this.state.member.awards}</p></td>
				    <td onClick={this.handleShowModal}><span className="ride"></span><p>{this.state.member.clubJoined.length}</p></td>
				    <td><a href="#" className="remove" onClick={this.removeUser.bind(this)}></a></td> 
				    {this.state.showModal ? <MembersListingModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.state.member.userID}/> : null}
			    </tr>}
			    </tbody>
			    
			    
		    )
	    
	
	}
});
