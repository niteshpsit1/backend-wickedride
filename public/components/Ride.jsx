var Ride = React.createClass({
	getInitialState: function(){
		return ({
			ride: this.props.ride,
			showRideMembersModal: false,
			showRideDescriptionModal: false
			
		});
	},

	handleShowRideMembersModal: function(){
        this.setState({showRideMembersModal: true});
        
    },
    handleShowRideDescriptionModal: function(){
        this.setState({showRideDescriptionModal: true});
        
    },
    
    handleHideRideMembersModal: function(){
    	console.log("KKKKKKKKKKKKKKKK",this.state.showRideMembersModal);
        this.setState({showRideMembersModal: false});
    },
    handleHideRideDescriptionModal: function(){
        this.setState({showRideDescriptionModal: false});
    },
	
	render: function () {
		var self = this;
		return (
			<tr>
				<td onClick={this.handleShowRideMembersModal}><p>{this.state.ride.rideName}</p></td>
				<td onClick={this.handleShowRideDescriptionModal}><p>{this.state.ride.description}</p></td>
				<td><p>{this.state.ride.date}</p></td>
				<td><p>{this.state.ride.time}</p></td>
				<td><p>{this.state.ride.member}</p></td>
				{this.state.showRideMembersModal ? <RideMembersModal handleHideRideMembersModal={this.handleHideRideMembersModal} token={this.props.token} rideID={this.state.ride.rideID}/> : null}
				{this.state.showRideDescriptionModal ? <RideDescriptionModal handleHideRideDescriptionModal={this.handleHideRideDescriptionModal} rideName={this.state.ride.rideName} time={this.state.ride.time} date={this.state.ride.date} description={this.state.ride.description}/> : null}
			</tr>
			
			
		);
	}
});
