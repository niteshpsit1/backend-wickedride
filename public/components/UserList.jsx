var UserList =	React.createClass({

	getInitialState: function(){
		return ({
			
			showModal: false
			
		});
	},

	
	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },

	handleHideModal: function(status){
        this.setState({showModal: false});
    },
	
	render: function() {
		
		return (
			<tr key={this.props.user.userID}>
				<td><p>{this.props.user.userName}</p></td>
				<td><p>{this.props.user.email}</p></td>
				<td><p>{this.props.user.number}</p></td>
				<td onClick={this.handleShowModal}>
				    <p><a href="#" className="ride p-center"></a></p>
				    <p className="rideNo-center">{this.props.user.noOfClubJoined}</p>
				</td>
				{this.state.showModal ? <MemberDetailModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.props.user.userID} user={this.props.user}/> : null}
			</tr>
		)
	}
});