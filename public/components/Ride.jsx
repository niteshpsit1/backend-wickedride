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
    	
        this.setState({showRideMembersModal: false});
    },
    handleHideRideDescriptionModal: function(){
        this.setState({showRideDescriptionModal: false});
    },
	
	render: function () {
		var self = this;
		var dd = new Date(this.state.ride.date);
		var date = dd.getFullYear() + '/' + (dd.getMonth() + 1) + '/' + dd.getDate()  
        var hours = dd.getHours();
        var minutes = dd.getMinutes();
        var time = hours + ':' + minutes;
        var dot = false;
        var noDot = true;
        if(this.state.ride.description.length > 10) {
        	dot = true;
        	noDot = false;
        }
                
		return (
			<tr>
				<td onClick={this.handleShowRideMembersModal}><span className="ride pointerCss"></span><p className="pointerCss">{this.state.ride.rideName}</p></td>
				{ dot && <td onClick={this.handleShowRideDescriptionModal}>
				    <p className="pointerCss spanSpace">{this.state.ride.description}...</p>
				</td>}
				{ noDot && <td onClick={this.handleShowRideDescriptionModal}>
				    <p className="pointerCss">{this.state.ride.description}</p>
				</td>}
				<td><p>{date}</p></td>
				<td><p>{time}</p></td>
				<td className="centerElement"><p>{this.state.ride.member.length}</p></td>
				{this.state.showRideMembersModal ? <RideMembersModal handleHideRideMembersModal={this.handleHideRideMembersModal} token={this.props.token} rideID={this.state.ride.rideID}/> : null}
				{this.state.showRideDescriptionModal ? <RideDescriptionModal handleHideRideDescriptionModal={this.handleHideRideDescriptionModal} rideName={this.state.ride.rideName} time={this.state.ride.time} date={this.state.ride.date} description={this.state.ride.description}/> : null}
			</tr>
			
			
		);
	}
});
