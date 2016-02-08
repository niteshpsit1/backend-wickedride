var UserList =	React.createClass({

	getInitialState: function(){
		return ({
			member: this.props.member,
			showModal: false
			
		});
	},

	removeUser: function() {

	},

	handleShowModal: function(document){
        this.setState({showModal: true});
        
    },

	handleHideModal: function(status){
        this.setState({showModal: false});
    },
	
	render: function() {
		console.log(this.props.user);
		return (
			<tr onClick={this.handleShowModal} key={this.props.user.userID}>
				<td><p>{this.props.user.userName}</p></td>
				<td><p>{this.props.user.email}</p></td>
				<td><p>{this.props.user.number}</p></td>
				<td><p className="ride"></p><p>{this.props.user.noOfClubJoined}</p></td>
				<td><a href="#" className="remove" onClick={this.removeUser}></a> <a href="#" className="trophies"></a></td>
				{this.state.showModal ? <MemberDetailModal handleHideModal={this.handleHideModal} token={this.props.token} userID={this.props.user.userID}/> : null}
			</tr>
		)
	}
});